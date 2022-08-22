const mongoose = require("mongoose");

const db = {
  user: "",
  password: "",
  dbName: process.env.DB_NAME || "takeHomeExer",
  dbAuth: "",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 27017
};

const dbUrl = `mongodb://${db.host}:${db.port}/${db.dbName}`;

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const mongooseConnection = () => {
  mongoose.connect(dbUrl, mongooseOptions);

  mongoose.connection.on("connected", function () {
    console.log("Mongoose default connection is open to ", dbUrl);
  });

  mongoose.connection.on("error", function (err) {
    console.error("Mongoose default connection has occured " + err + " error");
  });

  mongoose.connection.on("disconnected", function () {
    console.log("Mongoose default connection is disconnected");
  });

  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log(
        "Mongoose default connection is disconnected due to application termination"
      );
      process.exit(0);
    });
  });
};

module.exports = mongooseConnection();
