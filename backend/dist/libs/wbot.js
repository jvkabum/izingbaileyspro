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
exports.getWbot = exports.initWbot = exports.removeWbot = exports.apagarPastaSessao = void 0;
/* eslint-disable camelcase */
const baileys_1 = require("@whiskeysockets/baileys");
const path_1 = __importDefault(require("path"));
const promises_1 = require("fs/promises");
const socket_1 = require("./socket");
const logger_1 = require("../utils/logger");
const SyncUnreadMessagesWbot_1 = __importDefault(require("../services/WbotServices/SyncUnreadMessagesWbot"));
const Queue_1 = __importDefault(require("./Queue"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const minimalArgs = require('./minimalArgs');
const sessions = [];
const checking = {};
const apagarPastaSessao = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const pathRoot = path_1.default.resolve(__dirname, "..", "..", ".wwebjs_auth");
    const pathSession = `${pathRoot}/session-wbot-${id}`;
    try {
        yield (0, promises_1.rm)(pathSession, { recursive: true, force: true });
    }
    catch (error) {
        logger_1.logger.info(`apagarPastaSessao:: ${pathSession}`);
        logger_1.logger.error(error);
    }
});
exports.apagarPastaSessao = apagarPastaSessao;
const removeWbot = (whatsappId) => {
    try {
        const sessionIndex = sessions.findIndex(s => s.id === whatsappId);
        if (sessionIndex !== -1) {
            sessions[sessionIndex].destroy();
            sessions.splice(sessionIndex, 1);
        }
    }
    catch (err) {
        logger_1.logger.error(`removeWbot | Error: ${err}`);
    }
};
exports.removeWbot = removeWbot;
const args = process.env.CHROME_ARGS
    ? process.env.CHROME_ARGS.split(",")
    : minimalArgs;
args.unshift(`--user-agent=${baileys_1.DefaultOptions.userAgent}`);
const checkMessages = (wbot, tenantId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isConnectStatus = wbot && (yield wbot.getState()) === "CONNECTED";
        // getValue(`wbotStatus-${tenantId}`);
        logger_1.logger.info("wbot:checkMessages:status", wbot.id, tenantId, isConnectStatus);
        if (isConnectStatus) {
            logger_1.logger.info("wbot:connected:checkMessages", wbot, tenantId);
            Queue_1.default.add("SendMessages", { sessionId: wbot.id, tenantId });
        }
    }
    catch (error) {
        const strError = String(error);
        // se a sessão tiver sido fechada, limpar a checagem de mensagens e bot
        if (strError.indexOf("Session closed.") !== -1) {
            logger_1.logger.error(`BOT Whatsapp desconectado. Tenant: ${tenantId}:: BOT ID: ${wbot.id}`);
            clearInterval(wbot.checkMessages);
            (0, exports.removeWbot)(wbot.id);
            return;
        }
        logger_1.logger.error(`ERROR: checkMessages Tenant: ${tenantId}::`, error);
    }
});
const initWbot = (whatsapp) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            const io = (0, socket_1.getIO)();
            const sessionName = whatsapp.name;
            const { tenantId } = whatsapp;
            let sessionCfg;
            if (whatsapp === null || whatsapp === void 0 ? void 0 : whatsapp.session) {
                sessionCfg = JSON.parse(whatsapp.session);
            }
            const wbot = new baileys_1.Client({
                authStrategy: new baileys_1.LocalAuth({ clientId: `wbot-${whatsapp.id}` }),
                takeoverOnConflict: true,
                puppeteer: {
                    // headless: false,
                    executablePath: process.env.CHROME_BIN || undefined,
                    args
                },
                webVersion: process.env.WEB_VERSION || "2.2412.54v2",
                webVersionCache: { type: "local" },
                qrMaxRetries: 5
            });
            wbot.id = whatsapp.id;
            wbot.initialize();
            wbot.on("qr", (qr) => __awaiter(void 0, void 0, void 0, function* () {
                if (whatsapp.status === "CONNECTED")
                    return;
                logger_1.logger.info(`Session QR CODE: ${sessionName}-ID: ${whatsapp.id}-${whatsapp.status}`);
                yield whatsapp.update({ qrcode: qr, status: "qrcode", retries: 0 });
                const sessionIndex = sessions.findIndex(s => s.id === whatsapp.id);
                if (sessionIndex === -1) {
                    wbot.id = whatsapp.id;
                    sessions.push(wbot);
                }
                io.emit(`${tenantId}:whatsappSession`, {
                    action: "update",
                    session: whatsapp
                });
            }));
            wbot.on("authenticated", () => __awaiter(void 0, void 0, void 0, function* () {
                logger_1.logger.info(`Session: ${sessionName} AUTHENTICATED`);
            }));
            wbot.on("auth_failure", (msg) => __awaiter(void 0, void 0, void 0, function* () {
                logger_1.logger.error(`Session: ${sessionName}-AUTHENTICATION FAILURE :: ${msg}`);
                if (whatsapp.retries > 1) {
                    yield whatsapp.update({
                        retries: 0,
                        session: ""
                    });
                }
                const retry = whatsapp.retries;
                yield whatsapp.update({
                    status: "DISCONNECTED",
                    retries: retry + 1
                });
                io.emit(`${tenantId}:whatsappSession`, {
                    action: "update",
                    session: whatsapp
                });
                reject(new Error("Error starting whatsapp session."));
            }));
            wbot.on("ready", () => __awaiter(void 0, void 0, void 0, function* () {
                var _a, _b, _c;
                logger_1.logger.info(`Session: ${sessionName}-READY`);
                const info = wbot === null || wbot === void 0 ? void 0 : wbot.info;
                const wbotVersion = yield wbot.getWWebVersion();
                const wbotBrowser = yield ((_a = wbot.pupBrowser) === null || _a === void 0 ? void 0 : _a.version());
                yield whatsapp.update({
                    status: "CONNECTED",
                    qrcode: "",
                    retries: 0,
                    number: (_c = (_b = wbot === null || wbot === void 0 ? void 0 : wbot.info) === null || _b === void 0 ? void 0 : _b.wid) === null || _c === void 0 ? void 0 : _c.user,
                    phone: Object.assign(Object.assign({}, (info || {})), { wbotVersion,
                        wbotBrowser })
                });
                io.emit(`${tenantId}:whatsappSession`, {
                    action: "update",
                    session: whatsapp
                });
                io.emit(`${tenantId}:whatsappSession`, {
                    action: "readySession",
                    session: whatsapp
                });
                const sessionIndex = sessions.findIndex(s => s.id === whatsapp.id);
                if (sessionIndex === -1) {
                    wbot.id = whatsapp.id;
                    sessions.push(wbot);
                }
                wbot.sendPresenceAvailable();
                (0, SyncUnreadMessagesWbot_1.default)(wbot, tenantId);
                resolve(wbot);
            }));
            wbot.checkMessages = setInterval(checkMessages, +(process.env.CHECK_INTERVAL || 5000), wbot, tenantId);
            // WhatsappConsumer(tenantId);
        }
        catch (err) {
            logger_1.logger.error(`initWbot error | Error: ${err}`);
        }
    });
});
exports.initWbot = initWbot;
const getWbot = (whatsappId) => {
    const sessionIndex = sessions.findIndex(s => s.id === whatsappId);
    if (sessionIndex === -1) {
        throw new AppError_1.default("ERR_WAPP_NOT_INITIALIZED");
    }
    return sessions[sessionIndex];
};
exports.getWbot = getWbot;
//# sourceMappingURL=wbot.js.map