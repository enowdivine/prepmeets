import { Sequelize, DataTypes, Model } from "sequelize";

export default class Expert extends Model {
  public id?: number;
  public role?: string;
  public avatar?: Record<string, any>;
  public introvideo?: string;

  public firstname?: string;
  public lastname?: string;
  public email?: string;
  public phone?: number;
  public password?: string;
  public emailConfirmed?: boolean;
  public bio?: string;
  public education?: Array<JSON>;
  public experience?: Array<JSON>;
  public certificates?: Array<JSON>;

  public gender?: string;
  public dateOfBirth?: Date;
  public location?: string;
  public focusarea?: Array<JSON>;

  public havecertifications?: boolean;
  public timeNotice?: string;
  public timezone?: Date;
  public calenderSlots?: Array<JSON>;
  public pricing?: Record<string, any>;

  public trialSessions?: boolean;
  public visibilityLevel?: string;
  public payments?: Record<string, any>;
  public rating?: number;

  public accountId?: string;
  public provider?: string;
}

export const ExpertMap = (sequelize: Sequelize) => {
  Expert.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "client",
      },
      avatar: {
        type: DataTypes.JSON,
        defaultValue: null,
      },
      introvideo: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      firstname: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      lastname: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      email: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      phone: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      password: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      emailConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      bio: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      education: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true,
        defaultValue: [],
      },
      experience: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true,
        defaultValue: [],
      },
      certificates: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true,
        defaultValue: [],
      },

      gender: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      location: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      focusarea: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true,
        defaultValue: [],
      },

      havecertifications: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      timeNotice: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      timezone: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      calenderSlots: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true,
        defaultValue: [],
      },
      pricing: {
        type: DataTypes.JSON,
        defaultValue: null,
      },

      trialSessions: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      visibilityLevel: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      payments: {
        type: DataTypes.JSON,
        defaultValue: null,
      },
      rating: {
        type: DataTypes.STRING,
        defaultValue: "",
      },

      accountId: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      provider: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
    },
    {
      sequelize,
      tableName: "experts", // explicitly set the table name
      modelName: "Expert", // explicitly set modelName
    }
  );
  Expert.sync();
};

// pricing: {
//     starterPrice: {
//       type: Number,
//       default: 0,
//     },
//     recommendedPrice: {
//       type: Number,
//       default: 0,
//     },
//     bestPrice: {
//       type: Number,
//       default: 0,
//     },
//   },

//   payments: {
//     fullname: {
//       type: String,
//     },
//     paymentStream: {
//       type: String,
//     },
//     IBAN: {
//       type: String,
//     },
//     SWIFTBIC: {
//       type: String,
//     },
//   },
