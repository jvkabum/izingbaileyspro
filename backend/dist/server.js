"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const logger_1 = require("./utils/logger");
(0, app_1.default)().then((app) => {
    app.start();
    logger_1.logger.info("Started system!!");
});
//# sourceMappingURL=server.js.map