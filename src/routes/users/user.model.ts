import mongoose from "mongoose";

const user = new mongoose.Schema(
  {
    avatar: {
      type: Object,
      default: null,
    },
    firstname: {
      type: String,
      required: [true, "firstname is required"],
    },
    lastname: {
      type: String,
      required: [true, "lastname is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    phone: {
      type: Number,
      required: [true, "phone number is required"],
    },
    location: {
      type: String,
    },
    focusarea: {
      type: Boolean,
      required: [true, "focus area is required"],
    },
    havecertifications: {
      type: Boolean,
      required: [true, "have certification field is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    emailConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", user);
