const debug = require("debug")("2-layers:server");
const { EACCES } = require("constants");
const http = require("http");
const app = require("../app");
const {
  logError,
  isOperationalError
} = require("../middleware/error/errorHandler");

/**
 * Normalize port into a number, string or falce
 */
const normalizePort = (value) => {
  const port = parseInt(value, 10);

  if (isNaN(port)) {
    return value;
  }

  // Port is a number
  if (port >= 0) {
    return port;
  }
};

const port = normalizePort(process.env.PORT || 3000);

/**
 * Listening to http errors
 */
const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${bind}` : `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      logError(error);
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      logError(error);
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    case "uncaughtException":
      logError(error);
      if (!isOperationalError(error)) {
        process.exit(1);
      }
      break;
    default:
      throw error;
      break;
  }
};

const server = http.createServer(app);

/**
 * Event onListening
 */
const onListening = () => {
  const address = server.address();
  const bind =
    typeof address === "string" ? `pipe ${address}` : `port ${address.port}`;

  console.log(`Listening on ${bind}`);
};

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
