const dotenv = require("dotenv")
const pg = require("pg")
dotenv.config();

// Heroku Connection
module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "../migrations"
    }
  },
  test: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "../migrations"
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "../migrations"
    }
  },
};

// module.exports = {
//   development: {
//     username: process.env.POSTGRES_USERNAME,
//     password: process.env.POSTGRES_PASSWORD,
//     database: process.env.POSTGRES_DATABASE,
//     host: process.env.POSTGRES_HOST,
//     dialect: "postgres",
//     dialectModule: pg,
//   },
//   test: {
//     username: process.env.POSTGRES_USERNAME,
//     password: process.env.POSTGRES_PASSWORD,
//     database: process.env.POSTGRES_DATABASE,
//     host: process.env.POSTGRES_HOST,
//     dialect: "postgres",
//     dialectModule: pg,
//   },
//   production: {
//     username: process.env.POSTGRES_USERNAME,
//     password: process.env.POSTGRES_PASSWORD,
//     database: process.env.POSTGRES_DATABASE,
//     host: process.env.POSTGRES_HOST,
//     dialect: "postgres",
//     dialectModule: pg,
//   },
// };
