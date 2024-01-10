var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_express = __toESM(require("express"));
var import_environment = require("./config/environment.config");
var import_http = require("http");
var import_helmet = __toESM(require("helmet"));
var import_compression = __toESM(require("compression"));
var import_cors = __toESM(require("cors"));
var import_morgan = __toESM(require("morgan"));
var import_body_parser = __toESM(require("body-parser"));
var import_cookie_parser = __toESM(require("cookie-parser"));
var import_routes = __toESM(require("./routes"));
var import_rateLimiter = require("./middlewares/rateLimiter.middleware");
var import_database = require("./services/database.service");
var import_errors = require("./middlewares/errors.middleware");
var import_async_exit_hook = __toESM(require("async-exit-hook"));
var import_message = require("./constants/message");
const app = (0, import_express.default)();
const httpServer = (0, import_http.createServer)(app);
app.use(
  (0, import_helmet.default)({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["*"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com/css", "https://use.fontawesome.com/releases/v5.12.0/css/all.css"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: []
      }
    }
  })
);
app.use((0, import_compression.default)());
app.use((0, import_cors.default)());
app.use((0, import_morgan.default)("dev"));
app.disable("x-powered-by");
app.use(import_express.default.json());
app.use(import_express.default.urlencoded({ limit: "50mb", extended: true }));
app.use(import_body_parser.default.urlencoded({ extended: false, limit: "50mb" }));
app.use(import_body_parser.default.json({ limit: "50mb" }));
app.use((0, import_cookie_parser.default)());
app.use(import_express.default.static("."));
if (import_environment.env.node_env === "production") {
  app.use("/api", import_rateLimiter.rateLimiterMiddleware);
}
app.use("/api/v1", import_routes.default);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.disable("etag");
import_database.databaseService.connect();
app.use(import_errors.defaultErrorHandler);
httpServer.listen(import_environment.env.server.port, import_environment.env.server.host, () => {
  console.log(`\u{1F680} Server Running On Port ${import_environment.env.server.port}`);
});
(0, import_async_exit_hook.default)(() => {
  import_database.databaseService.disconnect();
  console.log(import_message.DATABASE_MESSAGE.DB_MAIN.DISCONNECT);
});
//# sourceMappingURL=main.js.map
