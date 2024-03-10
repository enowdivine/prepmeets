import "dotenv/config";
import * as pg from "pg";
import { Sequelize } from "sequelize";

// const sequelize = new Sequelize(
//   process.env.POSTGRES_DATABASE as string,
//   process.env.POSTGRES_USERNAME as string,
//   process.env.POSTGRES_PASSWORD,
//   {
//     host: process.env.POSTGRES_HOST,
//     dialect: "postgres",
//     dialectModule: pg,
//   }
// );

const sequelize = new Sequelize({
  dialect: "postgres",
  storage: process.env.DATABASE_URL,
});

export default sequelize;
