import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import { AddressInfo } from "net";
import setupServices from "./setupServices";

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

const server = app.listen(8000, "localhost", () => {
  const { address, port } = server.address() as AddressInfo;
  console.log("Listening on %s %s", address, port);
});
