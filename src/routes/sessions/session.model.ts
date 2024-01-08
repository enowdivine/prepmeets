import mongoose from "mongoose";

const session = new mongoose.Schema(
  {
    expertId: {
      type: String,
      required: [true, "expertId is required"],
    },
    clientId: {
      type: String,
      required: [true, "clientId is required"],
    },
    sessionType: {
      type: String,
      required: [true, "sessionType is required"],
    },
    paymentType: {
      type: String,
      required: [true, "paymentType is required"],
    },
    paymentAmount: {
      type: String,
      required: [true, "payment amount is required"],
    },
    duration: {
      type: String,
      required: [true, "duration is required"],
    },
    sessionDate: {
      type: Date,
      required: [true, "sessionDate is required"],
    },
    sessionStatus: {
      type: String,
      default: "scheduled",
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
    prepmeetCommission: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Session", session);
