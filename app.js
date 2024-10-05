const express = require("express");

require("dotenv").config();

const app = express();
const indexRoute = require("./routes/index");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");

const { initializeDB } = require("./db/index");
const limiter = require("./middleware/rateLimiter");

app.use(limiter);
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/", indexRoute);

initializeDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
