import mongoose from "mongoose";

const expert = new mongoose.Schema(
  {
    role:{
      type: String,
      default: "expert"
    },
    avatar: {
      type: Object,
      default: null,
    },
    introvideo: {
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
    password: {
      type: String,
      required: [true, "password is required"],
    },
    emailConfirmed: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      default: "",
    },
    education: {
      type: Array,
      default: [],
    },
    experience: {
      type: Array,
      default: [],
    },
    certificates: {
      type: Array,
      default: [],
    },
    gender: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    location: {
      type: String,
      default: "",
    },
    focusarea: {
      type: Array,
    },
    havecertifications: {
      type: Boolean,
    },
    timeNotice: {
      type: String,
    },
    timezone: {
      type: Date,
    },
    calenderSlots: {
      type: Array,
    },
    pricing: {
      starterPrice: {
        type: Number,
        default: 0,
      },
      recommendedPrice: {
        type: Number,
        default: 0,
      },
      bestPrice: {
        type: Number,
        default: 0,
      },
    },
    trialSessions: {
      type: Boolean,
      default: false,
    },
    visibilityLevel: {
      type: String,
    },
    payments: {
      fullname: {
        type: String,
      },
      paymentStream: {
        type: String
      },
      IBAN: {
        type: String
      },
      SWIFTBIC: {
        type: String
      }
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Exxpert", expert);
