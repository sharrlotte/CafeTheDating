var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var users_service_exports = {};
__export(users_service_exports, {
  default: () => users_service_default
});
module.exports = __toCommonJS(users_service_exports);
var import_database = require("./database.service");
var import_enums = require("@/constants/enums");
var import_environment = require("@/config/environment.config");
var import_RefreshToken = __toESM(require("@/models/schemas/RefreshToken.schema"));
var import_mongodb = require("mongodb");
var import_Errors = require("@/models/errors/Errors.schema");
var import_http_status_codes = require("http-status-codes");
var import_message = require("@/constants/message");
var import_lodash = __toESM(require("lodash"));
var import_jwt = require("@/utils/jwt");
var import_jwt2 = require("@/utils/jwt");
class UserService {
  async validateRefreshToken(refresh_token) {
    const token = await import_database.databaseService.refreshTokens.findOne({ token: refresh_token });
    return Boolean(token);
  }
  signAccessToken(_id, email, role) {
    let { access_token_exp, jwt_algorithm, secret_key } = import_environment.env.jwt;
    return (0, import_jwt.signToken)({
      payload: {
        _id,
        email,
        role,
        token_type: import_enums.TokenType.AccessToken
      },
      privateKey: secret_key,
      options: {
        expiresIn: access_token_exp,
        algorithm: jwt_algorithm
      }
    });
  }
  signRefreshToken(_id, email, role) {
    let { refresh_token_exp, jwt_algorithm, refresh_token_key } = import_environment.env.jwt;
    return (0, import_jwt.signToken)({
      payload: {
        _id,
        email,
        role,
        token_type: import_enums.TokenType.RefreshToken
      },
      privateKey: refresh_token_key,
      options: {
        expiresIn: refresh_token_exp,
        algorithm: jwt_algorithm
      }
    });
  }
  // Create access_token and refresh_token
  signAccessAndRefreshToken(user_id, email, role) {
    return Promise.all([this.signAccessToken(user_id, email, role), this.signRefreshToken(user_id, email, role)]);
  }
  async refreshToken(payload) {
    const { refresh_token } = payload;
    const { refresh_token_key } = import_environment.env.jwt;
    const { _id, role, email } = await (0, import_jwt2.verifyToken)({
      token: refresh_token,
      secretOrPublicKey: refresh_token_key
    });
    const deleteRefreshToken = import_database.databaseService.refreshTokens.deleteOne({ user_id: _id });
    const signToken2 = this.signAccessAndRefreshToken(_id, email, role);
    const [tokens] = await Promise.all([signToken2, deleteRefreshToken]);
    const [newAccessToken, newRefreshToken] = tokens;
    await import_database.databaseService.refreshTokens.insertOne(
      new import_RefreshToken.default({
        token: refresh_token,
        user_id: new import_mongodb.ObjectId(_id)
      })
    );
    const result = { access_token: newAccessToken, refresh_token: newRefreshToken };
    return result;
  }
  async getAllUser(payload) {
    const pageIndex = Number(payload.pageIndex);
    const pageSize = Number(payload.pageSize);
    const query = String(payload.query ?? " ");
    const role = String(payload.role);
    const users = await import_database.databaseService.users.find({ username: { $regex: query }, role }).limit(pageSize).skip((pageIndex - 1) * pageSize).toArray();
    const totalPage = Math.ceil(await import_database.databaseService.users.countDocuments({ username: { $regex: query }, role }) / pageSize);
    const filteredUsers = import_lodash.default.map(users, (v) => import_lodash.default.omit(v, ["password", "created_at", "updated_at", "email", "phone", "forgot_password_token", "verify", "_destroy", "password_change_at"]));
    const result = {
      items: filteredUsers,
      pageIndex,
      pageSize,
      totalRow: filteredUsers.length,
      totalPage
    };
    return result;
  }
  async getUserByID(id) {
    const user = await import_database.databaseService.users.findOne({ _id: id });
    if (!user) {
      throw new import_Errors.ErrorWithStatus({
        statusCode: import_http_status_codes.StatusCodes.NOT_FOUND,
        message: import_message.VALIDATION_MESSAGES.USER.COMMONS.USER_WITH_ID_IS_NOT_EXIST
      });
    }
    return import_lodash.default.omit(user, ["updated_at", "created_at"]);
  }
  async changeRole(id, role) {
    return await import_database.databaseService.users.updateOne(
      { _id: new import_mongodb.ObjectId(id) },
      {
        $set: {
          role
        }
      },
      { upsert: false }
    );
  }
}
const userServices = new UserService();
var users_service_default = userServices;
//# sourceMappingURL=users.service.js.map
