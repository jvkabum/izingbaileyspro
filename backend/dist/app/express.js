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
require("reflect-metadata");
require("express-async-errors");
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const logger_1 = require("../utils/logger");
function express(app) {
    return __awaiter(this, void 0, void 0, function* () {
        const origin = [process.env.FRONTEND_URL || "https://app.izing.io"];
        app.use((0, cors_1.default)({
            origin,
            credentials: true
        }));
        if (process.env.NODE_ENV !== "dev") {
            app.use((0, helmet_1.default)());
            // Sets all of the defaults, but overrides script-src
            app.use(helmet_1.default.contentSecurityPolicy({
                directives: {
                    "default-src": ["'self'"],
                    "base-uri": ["'self'"],
                    "block-all-mixed-content": [],
                    "font-src": ["'self'", "https:", "data:"],
                    "img-src": ["'self'", "data:"],
                    "object-src": ["'none'"],
                    "script-src-attr": ["'none'"],
                    "style-src": ["'self'", "https:", "'unsafe-inline'"],
                    "upgrade-insecure-requests": [],
                    // ...helmet.contentSecurityPolicy.getDefaultDirectives(),
                    scriptSrc: [
                        "'self'",
                        `*${process.env.FRONTEND_URL || "localhost: 3101"}`
                        // "localhost"
                    ],
                    frameAncestors: [
                        "'self'",
                        `* ${process.env.FRONTEND_URL || "localhost: 3101"}`
                    ]
                }
            }));
            app.use((0, helmet_1.default)({
                crossOriginResourcePolicy: { policy: "cross-origin" },
                crossOriginEmbedderPolicy: { policy: "credentialless" }
            }));
        }
        console.info("cors domain ======>>>>", process.env.FRONTEND_URL);
        app.use((0, cookie_parser_1.default)());
        app.use((0, express_1.json)({ limit: "50MB" }));
        app.use((0, express_1.urlencoded)({ extended: true, limit: "50MB", parameterLimit: 200000 }));
        logger_1.logger.info("express already in server!");
    });
}
exports.default = express;
//# sourceMappingURL=express.js.map