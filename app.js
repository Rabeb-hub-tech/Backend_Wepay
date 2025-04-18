var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const http = require("http");
require("dotenv").config();

const { connectToMongodb } = require("./db/db");

var indexRouter = require("./routes/index");
var osRouter = require("./routes/osRouter");
var confAPIRouter = require("./routes/confAPIRouter");
var serviceAPIRouter = require("./routes/serviceAPIRouter");
var productRouter = require("./routes/productRouter");
var factureRouter = require("./routes/factureRouter");
var userRouter = require("./routes/userRouter");
var clientRouter = require("./routes/clientRouter");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/configuration", confAPIRouter);
app.use("/service",serviceAPIRouter);
app.use("/produit",productRouter);
app.use("/facture",factureRouter);
app.use("/user",userRouter);
app.use("/client", clientRouter);

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
  res.render("error");
});

const server = http.createServer(app);
server.listen(process.env.Port, () => {
  connectToMongodb(), console.log("app is running on port 5001");
});
