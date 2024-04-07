import { Request, Response } from "express";
const db = require("../../models/index");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import _ from "lodash";
import { uuid } from "uuidv4";

class SessionController {
  async create(req: Request, res: Response) {
    try {
      const roomId = uuid();
      const booking = {
        expertId: req.body.expertId,
        clientId: req.body.clientId,
        roomId,
        sessionType: req.body.sessionType,
        sessionDate: req.body.sessionDate,
        duration: req.body.duration,
        paymentType: req.body.paymentType,
        paymentAmount: req.body.paymentAmount,
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
            message: "an error occured",
            error: err,
          });
        });
    } catch (error) {
      console.error("booking failed", error);
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

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

        return res.status(200).json({
          sessions: sessions.rows,
          totalPages: totalPages,
          currentPage: page,
        });
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

        return res.status(200).json({
          sessions: sessions.rows,
          totalPages: totalPages,
          currentPage: page,
        });
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

        return res.status(200).json({
          sessions: sessions.rows,
          totalPages: totalPages,
          currentPage: page,
        });
      } else {
        return res.status(404).json({
          message: "no sesson found",
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
