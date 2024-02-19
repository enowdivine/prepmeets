// import "dotenv/config";
// import * as pg from "pg";
// import { Sequelize } from "sequelize";

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

// export default sequelize;
import pg from "pg";

const { Pool } = pg;

const sequelize = new Pool({
  connectionString: process.env.POSTGRES_URL as string,
});

export default sequelize;
