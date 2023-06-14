const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

module.exports = {
  authLogin: async (req, res, next) => {
    let errors = {};

    let email = req.body?.email;
    let password = req.body?.password;

    let checkPassword = null;
    let user = null;

    if (email != "" && password != "") {
      user = await User.findOne({ email });
      if (user) {
        checkPassword = await bcrypt.compare(password, user.password);
      }
      if (checkPassword) {
        user = JSON.parse(JSON.stringify(user));
        delete user.password;
        delete user.__v;
        let token = jwt.sign({ user }, process.env.SECRET_TOKEN);
        let data = {
          message: "Berhasil masuk",
          data: user,
          token,
        };
        res.json(data);
        return;
      }
    }
    email == ""
      ? (errors["email"] = { code: "required", error: "email harus diisi" })
      : !email.includes("@") && !email.includes(".")
      ? (errors["email"] = { code: "invalid", error: "email tidak valid" })
      : !user
      ? (errors["email"] = { code: "invalid", error: "email belum terdaftar" })
      : (errors["email"] = null);

    password == ""
      ? (errors["password"] = {
          code: "required",
          error: "password harus diisi",
        })
      : !checkPassword
      ? (errors["password"] = {
          code: "invalid",
          error: "password salah",
        })
      : (errors["password"] = null);

    res.status(400);
    return res.json(errors);
  },
  authSignup: async (req, res, next) => {
    let errors = {};

    let email = req.body.email;
    let password = req.body.password;
    let fullName = req.body.fullName;
    let role = req.body.role;

    let user = null;

    if (email != "" && password != "" && role != "" && fullName != "") {
      user = await User.findOne({ email });
    }

    fullName == ""
      ? (errors["fullName"] = {
          code: "required",
          error: "Nama lengkap harus diisi",
        })
      : delete errors["fullNama"];

    role == ""
      ? (errors["role"] = {
          code: "required",
          error: "Role harus diisi",
        })
      : delete errors["role"];

    if (email == "") {
      errors["email"] = { code: "required", error: "Email harus diisi" };
    } else if (!validateEmail(email)) {
      errors["email"] = { code: "invalid", error: "Email tidak valid" };
    } else if (!email.includes(".")) {
      errors["email"] = { code: "invalid", error: "Email tidak valid" };
    } else if (user) {
      errors["email"] = { code: "invalid", error: "Email sudah terdaftar" };
    } else {
      delete errors["email"];
    }

    password == ""
      ? (errors["password"] = {
          code: "required",
          error: "Password harus diisi",
        })
      : password.length < 6
      ? (errors["password"] = {
          code: "password-weak",
          error: "Password minimal 6 karakter",
        })
      : delete errors["password"];

    if (!errors.email && !errors.password && !errors.fullNama && !errors.role) {
      try {
        password = await bcrypt.hash(password, 10);
        user = new User({
          fullName,
          email,
          password,
          role,
        });

        let userStore = await user.save();
        userStore = JSON.parse(JSON.stringify(userStore));

        delete userStore.password;
        delete userStore.__v;

        let token = jwt.sign({ user }, process.env.SECRET_TOKEN);
        let data = {
          message: "Berhasil mendaftar",
          data: userStore,
          token,
        };
        delete data.data.password;
        res.status(200);
        res.json(data);
        return;
      } catch (error) {
        res.status(400);
        res.json(error);
        return;
      }
    }
    res.status(400);
    res.json(errors);
    return;
  },
};
