import * as express from "express";
import * as createError from "http-errors";
import * as path from "path";
import * as bodyParser from "body-parser";
import { AddressInfo } from "net";
import setupServices from "./setupServices";
// import { NextFunction } from "express";

const app = express();

app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

const { multipartMiddleware, interRoutes } = setupServices();

app.get("/", (req, res) => res.send("Hello from Express"));

app.post("/api/product", (req, res) => {
  console.log(`Received new product
               ${req.body.title} ${req.body.price}`);

  res.json({ message: `Server responded: added ${req.body.title}` });
});

// InteractionAPI
app.post("/api/sendcontact", multipartMiddleware, interRoutes.sendContact);

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
  res.json({
    message: err.message,
    error: err,
  });
});

const server = app.listen(8000, () => {
  const { address, port } = server.address() as AddressInfo;
  console.log("Listening on %s %s", address, port);
});
