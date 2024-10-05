const { User } = require("../models/userModel");
const { Op } = require("sequelize");
const { hash } = require("bcryptjs");

const findUserById = async (id) => {
  try {
    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    const userData = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    return userData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const findUserByIdentifier = async (identifier) => {
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { username: identifier }],
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createUser = async (data) => {
  try {
    const hashedPassword = await hash(data.password, 10);

    const user = await User.create({
      email: data.email,
      username: data.username,
      password: hashedPassword,
      role: "admin",
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  createUser,
  findUserById,
  findUserByIdentifier,
};
