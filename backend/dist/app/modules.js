"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const moment_1 = __importDefault(require("moment"));
const express_1 = __importDefault(require("express"));
const Sentry = __importStar(require("@sentry/node"));
const routes_1 = __importDefault(require("../routes"));
const upload_1 = __importDefault(require("../config/upload"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const logger_1 = require("../utils/logger");
function modules(app) {
    return __awaiter(this, void 0, void 0, function* () {
        const { version } = JSON.parse((0, fs_1.readFileSync)("./package.json").toString());
        const started = new Date();
        const { env } = process;
        Sentry.init({
            dsn: process.env.SENTRY_DSN,
            serverName: env.BACKEND_URL,
            release: version
        });
        app.get("/health", (req, res) => __awaiter(this, void 0, void 0, function* () {
            let checkConnection;
            try {
                checkConnection = "Servidor disponível!";
            }
            catch (e) {
                checkConnection = `Servidor indisponível! ${e}`;
            }
            res.json({
                started: (0, moment_1.default)(started).format("DD/MM/YYYY HH:mm:ss"),
                currentVersion: version,
                uptime: (Date.now() - Number(started)) / 1000,
                statusService: checkConnection
            });
        }));
        app.use(Sentry.Handlers.requestHandler());
        app.use("/public", express_1.default.static(upload_1.default.directory));
        app.use(routes_1.default);
        app.use(Sentry.Handlers.errorHandler());
        // error handle
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        app.use((err, req, res, _) => __awaiter(this, void 0, void 0, function* () {
            if (err instanceof AppError_1.default) {
                if (err.statusCode === 403) {
                    logger_1.logger.warn(err);
                }
                else {
                    logger_1.logger.error(err);
                }
                return res.status(err.statusCode).json({ error: err.message });
            }
            logger_1.logger.error(err);
            return res.status(500).json({ error: `Internal server error: ${err}` });
        }));
        logger_1.logger.info("modules routes already in server!");
    });
}
exports.default = modules;
//# sourceMappingURL=modules.js.map