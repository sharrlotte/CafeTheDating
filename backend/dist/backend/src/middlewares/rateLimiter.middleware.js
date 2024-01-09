var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var rateLimiter_middleware_exports = {};
__export(rateLimiter_middleware_exports, {
  rateLimiterMiddleware: () => rateLimiterMiddleware
});
module.exports = __toCommonJS(rateLimiter_middleware_exports);
var import_rate_limiter_flexible = require("rate-limiter-flexible");
var import_response = require("@/config/response.config");
var import_environment = require("@/config/environment.config");
const rateLimiter = new import_rate_limiter_flexible.RateLimiterMemory({
  keyPrefix: "middleware",
  points: +import_environment.env.server.rate_point,
  // 10 requests
  duration: +import_environment.env.server.rate_duration
  // per 1 second
});
const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter.consume(req.ip).then(() => {
    next();
  }).catch(() => {
    import_response.sendResponse.tooManyRequest(res, "Too Many Requests");
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  rateLimiterMiddleware
});
