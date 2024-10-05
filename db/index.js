const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db/users.sqlite",
});

const initializeDB = async () => {
  await sequelize.sync({ force: false });
};

module.exports = { initializeDB, sequelize };