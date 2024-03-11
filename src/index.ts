import express, { Request, Response, Application } from "express";
import bodyParser = require("body-parser");
import dotenv from "dotenv";
import cors from "cors";
// api imports
import onlineSessionLogic from "./onlineSessionLogic";
import userRoutes from "./routes/users/user.routes";
import experRoutes from "./routes/experts/expert.routes";
import sessionRoutes from "./routes/sessions/session.routes";
import ratingRoutes from "./routes/ratings/rating.routes";
import messageRoutes from "./routes/messages/messages.routes";
import conversationRoutes from "./routes/conversations/conversation.routes";
import subscriptionRoutes from "./routes/subscription/subscription.routes";

// database import
import sequelizeDB from "./config/db";

// swagger imports
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// socket io import
const http = require("http");
const path = require("path");
export const appRoot = path.resolve(__dirname);

const port = process.env.PORT || 4000;

dotenv.config();

// swagger options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Prepmeets API",
      version: "1.0.0",
      description: "Prepmeets API Documentation",
    },
    servers: [
      {
        url: `${process.env.SERVER_URL}`,
      },
    ],
  },
  apis: ["./src/routes/**/*.ts"],
};

const specs = swaggerJsDoc(options);
const app: Application = express();
const server = http.createServer(app);
export const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
  },
});
onlineSessionLogic(io);

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  "/uploads/client/profileImage/",
  express.static(__dirname + "/uploads/client/profileImage/")
);
app.use(
  "/uploads/expert/profileImage/",
  express.static(__dirname + "/uploads/expert/profileImage/")
);
app.use(express.static(path.join(__dirname, "uploads/client/profileImages"))); // Serve static files (images)
app.use(express.static(path.join(__dirname, "uploads/expert/profileImages"))); // Serve static files (images)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(`/api/${process.env.API_VERSION}/clients`, userRoutes);
app.use(`/api/${process.env.API_VERSION}/experts`, experRoutes);
app.use(`/api/${process.env.API_VERSION}/sessions`, sessionRoutes);
app.use(`/api/${process.env.API_VERSION}/ratings`, ratingRoutes);
app.use(`/api/${process.env.API_VERSION}/messages`, messageRoutes);
app.use(`/api/${process.env.API_VERSION}/conversations`, conversationRoutes);
app.use(`/api/${process.env.API_VERSION}/subscriptions`, subscriptionRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Prepmeets Server");
});

server.listen(port, async () => {
  console.log(`Server running on ${process.env.SERVER_URL}:${port}`);
  try {
    await sequelizeDB.authenticate();
    console.log("Database connected 🔥 !!");
  } catch (error) {
    console.error("Unable to connect to the database !!!", error);
  }
});
