const { User } = require("../../models/model");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const music = require("./music");

const generateJwt = (id, email, role, img, user) => {
  return jwt.sign({ id, email, role, img, user }, "code", { expiresIn: "24h" });
};

const user = {
  getOneUser: async ({ input }) => {
    const { email, password } = input;
    if (!email || !password) {
      return { message: "Данные некорректны" };
    }
    const userLogin = await User.findOne({ where: { email } });
    if (!userLogin) {
      return { message: "Неверный логин" };
    }
    const hashPassword = await bcrypt.compareSync(
      input.password,
      userLogin.password
    );
    console.log(hashPassword);
    if (hashPassword) {
      const token = generateJwt(
        userLogin.id,
        userLogin.email,
        userLogin.role,
        userLogin.user,
        userLogin.user,
      );
      return { token: token };
    }
    return { message: "Неверный пароль" };
  },

  addUser: async ({ input }) => {
    const { user, email, password } = input;
    const find = await User.findOne({
      where: { [Op.or]: [{ user: user }, { email: email }] },
    });
    if (find) {
      return { message: "Пользователь уже существует" };
    }
    const hashPassword = await bcrypt.hash(password, 5);

    const userAdd = await User.create({
      user,
      email,
      password: hashPassword,
      role: "USER",
    });
    const token = generateJwt(
      userAdd.id,
      userAdd.email,
      userAdd.role,
      userAdd.user
    );
    return { token, id: user.id, message: null };
  },

  ...music,
};

module.exports = user;
