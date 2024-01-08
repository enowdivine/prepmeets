import { Request, Response } from "express";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

class StripeController {
  async getPublishableKey(req: Request, res: Response) {
    try {
      res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      });
    } catch (error) {
      console.error("error sending publishable key", error);
    }
  }

  async initiatePayment(req: Request, res: Response) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "usd",
        statement_descriptor_suffix: "Stripe Payment",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(400).json({
        message: "error",
        error: error,
      });
    }
  }
}

export default StripeController;
