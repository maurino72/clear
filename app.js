const express = require("express");
const helmet = require("helmet");
const routes = require("./routes");
const { logError, returnError } = require("./middleware/error/errorHandler");
const ApiError = require("./middleware/error/BaseError");

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", routes);
app.use(logError);
app.use(returnError);

require("./config/database");

module.exports = app;
