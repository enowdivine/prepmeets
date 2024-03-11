const dotenv = require("dotenv")
const pg = require("pg")
dotenv.config();

const url = require('url').parse(process.env.DATABASE_URL);
module.exports = {
  development: {
    database: url.pathname.split('/')[1],
    username: url.auth.split(':')[0],
    password: url.auth.split(':')[1],
    host: url.hostname,
    port: url.port,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
  test: {
    database: url.pathname.split('/')[1],
    username: url.auth.split(':')[0],
    password: url.auth.split(':')[1],
    host: url.hostname,
    port: url.port,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
  production: {
    database: url.pathname.split('/')[1],
    username: url.auth.split(':')[0],
    password: url.auth.split(':')[1],
    host: url.hostname,
    port: url.port,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
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
