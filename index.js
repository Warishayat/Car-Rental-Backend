const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const body_parser = require("body-parser");
const ConnectDB = require("./Config/database");
const auth_router = require("./Routes/auth_route");
const contact_router = require("./Routes/contact_route");
const car_router = require("./Routes/car_route");
const booking_router = require("./Routes/booking_route");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./Config/Swagger");
const limiter = require("./Middleware/rateLimiter");
require("./Config/redis");

const app = express();
app.use(express.json());
app.use(limiter);
app.use(express.urlencoded({ extended: true }));
const port = process.env.port || 8000;
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

ConnectDB();

app.get("/", (req, res) => {
  res.send("App is working up");
});

app.use("/auth/", auth_router);
app.use("/admin/", contact_router);
app.use("/car/", car_router);
app.use("/book/", booking_router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(port, () => {
  console.log(`App is working on the PORT ${port}`);
});
