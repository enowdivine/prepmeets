import express, { Express, Request, Response, Application } from "express";
import bodyParser = require("body-parser");
import dbConnect from "./config/db";
import dotenv from "dotenv";
import cors from "cors";
// api imports
import userRoutes from "./routes/users/user.routes";
import experRoutes from "./routes/experts/expert.routes";
import sessionRoutes from "./routes/sessions/session.routes";
import ratingRoutes from "./routes/ratings/rating.routes";

// swagger imports
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// socket io import
const http = require("http");
const path = require("path");
export const appRoot = path.resolve(__dirname);
import socketLogic from "./socketLogic";

dotenv.config();
dbConnect(); // database connection

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
        url: "http://localhost:5000",
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
socketLogic(io);

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "uploads/client/profileImages"))); // Serve static files (images)
app.use(express.static(path.join(__dirname, "uploads/expert/profileImages"))); // Serve static files (images)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(`/api/${process.env.API_VERSION}/client`, userRoutes);
app.use(`/api/${process.env.API_VERSION}/expert`, experRoutes);
app.use(`/api/${process.env.API_VERSION}/session`, sessionRoutes);
app.use(`/api/${process.env.API_VERSION}/ratings`, ratingRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Prepmeets Server");
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
