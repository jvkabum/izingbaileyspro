"use strict";
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
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
require("reflect-metadata");
require("express-async-errors");
require("./config-env");
const http_1 = require("http");
const process_1 = require("process");
const express_1 = __importDefault(require("express"));
const http_graceful_shutdown_1 = __importDefault(require("http-graceful-shutdown"));
const boot_1 = __importDefault(require("./boot"));
const socket_1 = require("../libs/socket");
const StartAllWhatsAppsSessions_1 = require("../services/WbotServices/StartAllWhatsAppsSessions");
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function application() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const httpServer = (0, http_1.createServer)(app);
        const port = app.get("port") || process_1.env.PORT || 3100;
        yield (0, boot_1.default)(app);
        function start() {
            return __awaiter(this, void 0, void 0, function* () {
                const host = app.get("host") || "0.0.0.0";
                app.server = httpServer.listen(port, host, () => __awaiter(this, void 0, void 0, function* () {
                    console.info(`Web server listening at: http://${host}:${port}/`);
                }));
                (0, socket_1.initIO)(app.server);
                // needs to start after socket is available
                yield (0, StartAllWhatsAppsSessions_1.StartAllWhatsAppsSessions)();
                (0, http_graceful_shutdown_1.default)(app.server);
            });
        }
        function close() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    httpServer.close(err => {
                        if (err) {
                            reject(err);
                        }
                        resolve();
                    });
                });
            });
        }
        process.on("SIGTERM", close);
        app.start = start;
        app.close = close;
        return app;
    });
}
exports.default = application;
//# sourceMappingURL=index.js.map