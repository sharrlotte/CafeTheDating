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
var database_service_exports = {};
__export(database_service_exports, {
  databaseService: () => databaseService
});
module.exports = __toCommonJS(database_service_exports);
var import_mongodb = require("mongodb");
var import_environment = require("@/config/environment.config");
class DatabaseServices {
  client;
  db;
  constructor() {
    this.client = new import_mongodb.MongoClient(import_environment.env.database.main.url, {
      serverApi: {
        version: import_mongodb.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    });
    this.db = this.client.db(import_environment.env.database.main.name);
  }
  async connect() {
    try {
      await this.db.command({ ping: 1 });
      console.log("Connected to database");
    } catch (error) {
      console.log(`\u26D4\uFE0F Unable to Connect MongoDB: ${error}`);
    }
  }
  async disconnect() {
    try {
      await this.client.close();
    } catch (error) {
      console.log(`\u26D4\uFE0F Unable to Connect MongoDB: ${error}`);
    }
  }
  // Get collection user
  get users() {
    return this.db.collection(import_environment.env.database.main.collection.users);
  }
  // Get collection user
  get refreshTokens() {
    return this.db.collection(import_environment.env.database.main.collection.refresh_tokens);
  }
  get products() {
    return this.db.collection(import_environment.env.database.main.collection.product);
  }
  get stars() {
    return this.db.collection(import_environment.env.database.main.collection.star);
  }
  get likes() {
    return this.db.collection(import_environment.env.database.main.collection.like);
  }
  get orders() {
    return this.db.collection(import_environment.env.database.main.collection.order);
  }
}
const databaseService = new DatabaseServices();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  databaseService
});
