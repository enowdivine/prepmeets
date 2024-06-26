import { Request, Response } from "express";
const db = require("../../models/index");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import _ from "lodash";
import Meet from "../../helpers/googleMeet";

class SessionController {
  async create(req: Request, res: Response) {
    try {
      Meet({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        date: req.body.sessionDate,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        summary: req.body.summary,
        location: req.body.location,
        description: req.body.description,
        attendees: [
          { email: req.body.clientEmail },
          { email: req.body.expertEmail },
        ],
        alert: 10,
      })
        .then(async (response) => {
          if (response.status === "success") {
            const slot = db.slot.findOne({
              where: { id: parseInt(req.body.slotId) },
            });
            if (slot) {
              slot.available = true;
              await slot.save();
            } else {
              return res.status(404).json({
                message: "slot not found",
              });
            }
            const booking = {
              expertId: req.body.expertId,
              clientId: req.body.clientId,
              slotId: req.body.slotId,
              sessionType: req.body.sessionType,
              sessionDate: req.body.sessionDate,
              duration: req.body.duration,
              paymentType: req.body.paymentType,
              paymentAmount: req.body.paymentAmount,
              sessionLink: response.link,
            };

            db.Session.create(booking)
              .then(async (booking: any) => {
                const savedSession = booking.toJSON();
                const customer = await stripe.customers.create({
                  metadata: {
                    sessionId: savedSession.id,
                    expertId: savedSession.expertId,
                    clientId: savedSession.clientId,
                    sessionType: savedSession.sessionType,
                    sessionDate: savedSession.sessionDate,
                    duration: savedSession.duration,
                    paymentType: savedSession.paymentType,
                    paymentAmount: savedSession.paymentAmount,
                  },
                });

                const line_items = [
                  {
                    price_data: {
                      currency: "usd",
                      product_data: {
                        name: req.body.sessionType,
                      },
                      unit_amount: req.body.paymentAmount * 100,
                    },
                    quantity: 1,
                  },
                ];

                const session = await stripe.checkout.sessions.create({
                  payment_method_types: ["card"],
                  phone_number_collection: {
                    enabled: true,
                  },
                  line_items,
                  mode: "payment",
                  customer: customer.id,
                  success_url: `${process.env.FRONTEND_URL}/success`,
                  cancel_url: `${process.env.FRONTEND_URL}/cancelled`,
                });

                res.status(201).json({
                  message: "success",
                  url: session.url,
                  savedSession,
                });
              })
              .catch((err: any) => {
                res.status(500).json({
                  message: "error creating session",
                  error: err,
                });
              });
          } else {
            return res.status(500).json({
              message: response.message,
            });
          }
        })
        .catch((err) => {
          return res.status(500).json({
            message: "error creating meeting link",
            error: err,
          });
        });
    } catch (error) {
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

  // async create(req: Request, res: Response) {
  //   try {
  //     //  const meetClient = new SpacesServiceClient({
  //     //    authClient: req.googleAuthClient,
  //     //  });
  //     // const booking = {
  //     //   expertId: req.body.expertId,
  //     //   clientId: req.body.clientId,
  //     //   sessionType: req.body.sessionType,
  //     //   sessionDate: req.body.sessionDate,
  //     //   duration: req.body.duration,
  //     //   paymentType: req.body.paymentType,
  //     //   paymentAmount: req.body.paymentAmount,
  //     // };
  //     // const response = await meetClient.createSpace(booking);
  //   } catch (error) {
  //     return res.status(500).json({
  //       message: "an error occured",
  //       error,
  //     });
  //   }
  // }

  async webhook(req: Request, res: Response) {
    let data: { customer: any };
    let eventType;
    // Check if webhook signing is configured.
    let webhookSecret;
    //webhookSecret = process.env.STRIPE_WEB_HOOK;
    if (webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed:  ${err}`);
        return res.sendStatus(400);
      }
      // Extract the object from the event.
      data = event.data.object;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data.object;
      eventType = req.body.type;
    }
    // Handle the checkout.session.completed event
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer: any) => {
          try {
            const sessionId = customer.metadata.sessionId;
            const paymentStatus = req.body.data.object.payment_status;
            let session = await db.Session.findOne({
              where: { id: sessionId },
            });
            if (session) {
              session.paymentStatus = paymentStatus;
              await session.save().then(async () => {
                return res
                  .status(200)
                  .json({
                    message: "success",
                  })
                  .end();
              });
            } else {
              return res
                .status(404)
                .json({
                  message: "session not found",
                })
                .end();
            }
          } catch (err) {
            return res
              .status(500)
              .json({
                message: "an error occured",
                error: err,
              })
              .end();
          }
        })
        .catch((err: any) => {
          res.status(500).json({
            message: "an error occured",
            error: err,
          });
        });
    }
  }

  async session(req: Request, res: Response) {
    try {
      const session = await db.Session.findOne({
        where: { id: req.params.id },
      });
      if (session) {
        return res.status(200).json(session);
      } else {
        return res.status(404).json({
          message: "session not found",
        });
      }
    } catch (error) {
      console.error("error fetching session", error);
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

  async clientSessions(req: Request, res: Response) {
    try {
      let { page, limit } = req.query as any;

      page = page ? parseInt(page, 10) : 1;
      limit = limit ? parseInt(limit, 10) : 10;

      const offset = (page - 1) * limit;

      const sessions = await db.Session.findAndCountAll({
        where: { clientId: req.params.id },
        limit: limit,
        offset: offset,
      });

      if (sessions.rows.length > 0) {
        const totalPages = Math.ceil(sessions.count / limit);

        // Fetch client and expert data for each session
        const sessionUpdated = await Promise.all(
          sessions.rows.map(async (session: any) => {
            const client = await db.User.findOne({
              where: { id: parseInt(session.clientId) },
            });
            const expert = await db.Expert.findOne({
              where: { id: parseInt(session.expertId) },
            });
            return {
              session,
              client: {
                id: client.id,
                role: client.role,
                avatar: client?.avatar,
                firstname: client.firstname,
                lastname: client.lastname,
                email: client.email,
                phone: client.phone,
                whatINeed: client.whatINeed,
                location: client.location,
                accountId: client.accountId,
                provider: client.provider,
              },
              expert: {
                id: expert.id,
                role: expert.role,
                introvideo: expert.introvideo,
                avatar: expert?.avatar,
                firstname: expert.firstname,
                lastname: expert.lastname,
                phone: expert.phone,
                email: expert.email,
                bio: expert.bio,
                education: expert.education,
                experience: expert.experience,
                certificates: expert.certificates,
                gender: expert.gender,
                dateOfBirth: expert.dateOfBirth,
                location: expert.location,
                focusarea: expert.focusarea,
                havecertifications: expert.havecertifications,
                timeNotice: expert.timeNotice,
                timezone: expert.timezone,
                calenderSlots: expert.calenderSlots,
                pricing: expert.pricing,
                trialSessions: expert.trialSessions,
                visibilityLevel: expert.visibilityLevel,
                payments: expert.payments,
                accountId: expert.accountId,
                provider: expert.provider,
              },
            };
          })
        );

        return res.status(200).json({
          sessions: sessionUpdated,
          totalPages: totalPages,
          currentPage: page,
        });
      } else {
        return res.status(200).json({
          message: "sessions not found",
          sessions: [],
        });
      }
    } catch (error) {
      console.error("error fetching session", error);
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

  async expertSessions(req: Request, res: Response) {
    try {
      let { page, limit } = req.query as any;

      page = page ? parseInt(page, 10) : 1;
      limit = limit ? parseInt(limit, 10) : 10;

      const offset = (page - 1) * limit;

      const sessions = await db.Session.findAndCountAll({
        where: { expertId: req.params.id },
        limit: limit,
        offset: offset,
      });

      if (sessions.rows.length > 0) {
        const totalPages = Math.ceil(sessions.count / limit);

        // Fetch client and expert data for each session
        const sessionUpdated = await Promise.all(
          sessions.rows.map(async (session: any) => {
            const client = await db.User.findOne({
              where: { id: parseInt(session.clientId) },
            });
            const expert = await db.Expert.findOne({
              where: { id: parseInt(session.expertId) },
            });
            return {
              session,
              client: {
                id: client.id,
                role: client.role,
                avatar: client?.avatar,
                firstname: client.firstname,
                lastname: client.lastname,
                email: client.email,
                phone: client.phone,
                whatINeed: client.whatINeed,
                location: client.location,
                accountId: client.accountId,
                provider: client.provider,
              },
              expert: {
                id: expert.id,
                role: expert.role,
                introvideo: expert.introvideo,
                avatar: expert?.avatar,
                firstname: expert.firstname,
                lastname: expert.lastname,
                phone: expert.phone,
                email: expert.email,
                bio: expert.bio,
                education: expert.education,
                experience: expert.experience,
                certificates: expert.certificates,
                gender: expert.gender,
                dateOfBirth: expert.dateOfBirth,
                location: expert.location,
                focusarea: expert.focusarea,
                havecertifications: expert.havecertifications,
                timeNotice: expert.timeNotice,
                timezone: expert.timezone,
                calenderSlots: expert.calenderSlots,
                pricing: expert.pricing,
                trialSessions: expert.trialSessions,
                visibilityLevel: expert.visibilityLevel,
                payments: expert.payments,
                accountId: expert.accountId,
                provider: expert.provider,
              },
            };
          })
        );

        return res.status(200).json({
          sessions: sessionUpdated,
          totalPages: totalPages,
          currentPage: page,
        });
      } else {
        return res.status(200).json({
          message: "sessions not found",
          sessions: [],
        });
      }
    } catch (error) {
      console.error("error fetching session", error);
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

  async sessions(req: Request, res: Response) {
    try {
      let { page, limit } = req.query as any;

      page = page ? parseInt(page, 10) : 1;
      limit = limit ? parseInt(limit, 10) : 10;

      const offset = (page - 1) * limit;

      const sessions = await db.Session.findAndCountAll({
        limit: limit,
        offset: offset,
      });

      if (sessions.rows.length > 0) {
        const totalPages = Math.ceil(sessions.count / limit);

        // Fetch client and expert data for each session
        const sessionUpdated = await Promise.all(
          sessions.rows.map(async (session: any) => {
            const client = await db.User.findOne({
              where: { id: parseInt(session.clientId) },
            });
            const expert = await db.Expert.findOne({
              where: { id: parseInt(session.expertId) },
            });
            return {
              session,
              client: {
                id: client.id,
                role: client.role,
                avatar: client?.avatar,
                firstname: client.firstname,
                lastname: client.lastname,
                email: client.email,
                phone: client.phone,
                whatINeed: client.whatINeed,
                location: client.location,
                accountId: client.accountId,
                provider: client.provider,
              },
              expert: {
                id: expert.id,
                role: expert.role,
                introvideo: expert.introvideo,
                avatar: expert?.avatar,
                firstname: expert.firstname,
                lastname: expert.lastname,
                phone: expert.phone,
                email: expert.email,
                bio: expert.bio,
                education: expert.education,
                experience: expert.experience,
                certificates: expert.certificates,
                gender: expert.gender,
                dateOfBirth: expert.dateOfBirth,
                location: expert.location,
                focusarea: expert.focusarea,
                havecertifications: expert.havecertifications,
                timeNotice: expert.timeNotice,
                timezone: expert.timezone,
                calenderSlots: expert.calenderSlots,
                pricing: expert.pricing,
                trialSessions: expert.trialSessions,
                visibilityLevel: expert.visibilityLevel,
                payments: expert.payments,
                accountId: expert.accountId,
                provider: expert.provider,
              },
            };
          })
        );

        return res.status(200).json({
          sessions: sessionUpdated,
          totalPages: totalPages,
          currentPage: page,
        });
      } else {
        return res.status(200).json({
          message: "sessions not found",
          sessions: [],
        });
      }
    } catch (error) {
      console.error("error fetching sessions", error);
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const session = await db.Session.findOne({
        where: { id: req.params.id },
      });
      if (session) {
        session.sessionStatus = req.body.sessionStatus;
        await session.save().then(async () => {
          return res.status(200).json({
            message: "session status updated",
          });
        });
      } else {
        return res.status(404).json({
          message: "session not found",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }
}

export default SessionController;
