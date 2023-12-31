import express, { Express, Request, Response, Application } from "express";
import bodyParser = require("body-parser");
import dbConnect from "./config/db";
import dotenv from "dotenv";
import cors from "cors";
// api imports
import userRoutes from "./routes/users/user.routes";
import experRoutes from "./routes/experts/expert.routes";
// swagger imports
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

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

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(`/api/${process.env.API_VERSION}/client`, userRoutes);
app.use(`/api/${process.env.API_VERSION}/expert`, experRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Prepmeets Server");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
