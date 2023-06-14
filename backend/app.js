const express = require("express");

const app = express();
const mongoose = require("mongoose");
const { user, jurnal, absensi, auth } = require("./routes");
const dotenv = require("dotenv").config();

// const cors = require("cors");

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DB_HOST, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((error) => {
    console.log(error);
  });

mongoose.connection.on("error", (err) => {
  console.log(err);
  mongoose
    .connect(process.env.DB_HOST, {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("mongodb connected");
    })
    .catch((error) => {
      console.log(error);
    });
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/auth", auth);
app.use("/jurnal", jurnal);
app.use("/absensi", absensi);
app.use("/users", user);

const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT} ....`);
});
