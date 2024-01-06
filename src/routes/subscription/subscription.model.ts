import mongoose from "mongoose";

const subscription = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Subscription", subscription);
