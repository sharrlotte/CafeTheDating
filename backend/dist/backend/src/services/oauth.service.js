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
var oauth_service_exports = {};
__export(oauth_service_exports, {
  default: () => oauth_service_default
});
module.exports = __toCommonJS(oauth_service_exports);
var import_passport = __toESM(require("passport"));
var import_environment = require("@/config/environment.config");
var import_database = require("@/services/database.service");
var import_Users = __toESM(require("@/models/schemas/Users.schema"));
var import_users = __toESM(require("@/services/users.service"));
var import_RefreshToken = __toESM(require("@/models/schemas/RefreshToken.schema"));
var import_passport_google_oauth20 = require("passport-google-oauth20");
var import_mongodb = require("mongodb");
class AuthService {
  init() {
    import_passport.default.use(
      new import_passport_google_oauth20.Strategy(
        {
          clientID: import_environment.env.auth.google.client_id,
          clientSecret: import_environment.env.auth.google.client_secret,
          callbackURL: import_environment.env.auth.google.callback_url,
          passReqToCallback: true
        },
        async function(req, accessToken, refreshToken, profile, done) {
          try {
            let user = await import_database.databaseService.users.findOne({ provider: "google", providerId: profile.id });
            if (!user) {
              const newUser = new import_Users.default({
                avatar: profile._json.picture,
                //@ts-ignore
                email: profile.email,
                username: profile.displayName,
                provider: "google",
                providerId: profile.id
              });
              user = newUser;
              await import_database.databaseService.users.insertOne(newUser);
              req.user = { ...newUser, _id: newUser._id.toString() };
              return done(null, newUser);
            }
            const avatar = profile._json.picture;
            user = { ...user, avatar };
            const refresh_token = await import_users.default.signRefreshToken(user._id.toString(), user.email, user.role);
            await import_database.databaseService.refreshTokens.updateOne(
              { user_id: new import_mongodb.ObjectId(user._id) },
              {
                $set: new import_RefreshToken.default({
                  token: refresh_token,
                  user_id: new import_mongodb.ObjectId(user._id)
                })
              },
              { upsert: true }
            );
            await import_database.databaseService.users.updateOne(
              { _id: user._id },
              {
                $set: user
              }
            );
            req.user = { ...user, _id: user._id.toString() };
            return done(null, user);
          } catch (error) {
            return done(error, null);
          }
        }
      )
    );
  }
  async callback(provider, req, res) {
    const { _id, role, email } = req.user;
    const refresh_token = await import_users.default.signRefreshToken(_id.toString(), email, role);
    await import_database.databaseService.refreshTokens.updateOne(
      { user_id: new import_mongodb.ObjectId(_id) },
      {
        $set: new import_RefreshToken.default({
          token: refresh_token,
          user_id: new import_mongodb.ObjectId(_id)
        })
      },
      { upsert: true }
    );
    res.redirect(`${import_environment.env.url.auth_success}?provider=${provider}&refresh_token=${refresh_token}`);
  }
}
const authService = new AuthService();
authService.init();
var oauth_service_default = authService;
//# sourceMappingURL=oauth.service.js.map
