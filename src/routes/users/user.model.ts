import mongoose from "mongoose";

const user = new mongoose.Schema(
  {
    role:{
      type: String,
      default: "client"
    },
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
    },
    whatINeed: {
      type: String,
      default: ""
    },
    location: {
      type: String,
      default: ""
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
