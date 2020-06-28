const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

const indexR = require("./routes/index");
const registerR = require("./routes/register");
const loginR = require("./routes/login");
const mainR = require("./routes/main");
const addPatientR = require("./routes/newPatient");
const patientsR = require("./routes/patients");

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexR);
app.use("/api/register", registerR);
app.use("/api/login", loginR);
app.use("/main", mainR);
app.use("/api/new-patient", addPatientR);
app.use("/api/patients", patientsR);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});
//CONNECT TO MONGODB
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connecting to mongodb!"))
  .catch((err) => console.error("Could not Connect to mongodb", err));

module.exports = app;
