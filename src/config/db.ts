import { Sequelize } from "sequelize";

const sequelize = new Sequelize("prepmeet", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;
