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
/* eslint-disable prefer-destructuring */
const fs_1 = __importDefault(require("fs"));
// import { promisify } from "util";
const path_1 = require("path");
const axios_1 = __importDefault(require("axios"));
const mime_1 = __importDefault(require("mime"));
const uuid_1 = require("uuid");
const logger_1 = require("../../utils/logger");
// import MessageOffLine from "../../models/MessageOffLine";
const Ticket_1 = __importDefault(require("../../models/Ticket"));
const Message_1 = __importDefault(require("../../models/Message"));
const socketEmit_1 = __importDefault(require("../../helpers/socketEmit"));
const Queue_1 = __importDefault(require("../../libs/Queue"));
const pupa_1 = require("../../utils/pupa");
const SendMessageSystemProxy_1 = __importDefault(require("../../helpers/SendMessageSystemProxy"));
// const writeFileAsync = promisify(writeFile);
const downloadMedia = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const request = yield axios_1.default.get(msg.mediaUrl, {
            responseType: "stream"
        });
        const cType = request.headers["content-type"];
        const tMine = mime_1.default;
        const fileExt = tMine.extension(cType);
        const mediaName = (0, uuid_1.v4)();
        const dir = (0, path_1.join)(__dirname, "..", "..", "..", "public");
        const fileName = `${mediaName}.${fileExt}`;
        const mediaPath = (0, path_1.join)(dir, fileName);
        const mediaData = {
            originalname: fileName,
            filename: fileName,
            mediaType: fileExt
        };
        yield new Promise((resolve, reject) => {
            request.data
                .pipe(fs_1.default.createWriteStream(mediaPath))
                .on("finish", () => __awaiter(void 0, void 0, void 0, function* () {
                resolve(mediaData);
            }))
                .on("error", (error) => {
                console.error("ERROR DONWLOAD", error);
                fs_1.default.rmdirSync(mediaPath, { recursive: true });
                reject(new Error(error));
            });
        });
        return mediaData;
    }
    catch (error) {
        if (error.response.status === 404) {
            const payload = {
                ack: -1,
                body: msg.body,
                messageId: "",
                number: msg.number,
                externalKey: msg.externalKey,
                error: error.message,
                authToken: msg.apiConfig.authToken,
                type: "hookMessageStatus"
            };
            if ((_a = msg === null || msg === void 0 ? void 0 : msg.apiConfig) === null || _a === void 0 ? void 0 : _a.urlMessageStatus) {
                Queue_1.default.add("WebHooksAPI", {
                    url: msg.apiConfig.urlMessageStatus,
                    type: payload.type,
                    payload
                });
            }
            return {};
        }
        throw new Error(error);
    }
});
const CreateMessageSystemService = ({ msg, tenantId, medias, ticket, userId, scheduleDate, sendType, status, idFront }) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const messageData = {
        ticketId: ticket.id,
        body: Array.isArray(msg.body) ? undefined : msg.body,
        contactId: ticket.contactId,
        fromMe: sendType === "API" ? true : msg === null || msg === void 0 ? void 0 : msg.fromMe,
        read: true,
        mediaType: "chat",
        mediaUrl: undefined,
        mediaName: undefined,
        originalName: undefined,
        timestamp: new Date().getTime(),
        quotedMsgId: (_b = msg === null || msg === void 0 ? void 0 : msg.quotedMsg) === null || _b === void 0 ? void 0 : _b.id,
        quotedMsg: msg === null || msg === void 0 ? void 0 : msg.quotedMsg,
        userId,
        scheduleDate,
        sendType,
        status,
        tenantId,
        idFront
    };
    try {
        // Alter template message
        if (msg.body && !Array.isArray(msg.body)) {
            messageData.body = (0, pupa_1.pupa)(msg.body || "", {
                // greeting: será considerado conforme data/hora da mensagem internamente na função pupa
                protocol: ticket.protocol,
                name: ticket.contact.name
            });
        }
        if (sendType === "API" && msg.mediaUrl) {
            medias = [];
            const mediaData = yield downloadMedia(msg);
            medias.push(mediaData);
        }
        if (sendType === "API" && !msg.mediaUrl && msg.media) {
            medias = [];
            medias.push(msg.media);
        }
        if (medias) {
            yield Promise.all(medias.map((media) => __awaiter(void 0, void 0, void 0, function* () {
                var _d;
                try {
                    if (!media.filename) {
                        const ext = media.mimetype.split("/")[1].split(";")[0];
                        media.filename = `${new Date().getTime()}.${ext}`;
                    }
                }
                catch (err) {
                    logger_1.logger.error(err);
                }
                messageData.mediaType = media.mimetype.split("/")[0];
                messageData.mediaName = media.filename;
                messageData.originalName = media.originalname;
                let message = {};
                if (!messageData.scheduleDate) {
                    /// enviar mensagem > run time
                    message = yield (0, SendMessageSystemProxy_1.default)({
                        ticket,
                        messageData,
                        media,
                        userId
                    });
                    ///
                }
                const msgCreated = yield Message_1.default.create(Object.assign(Object.assign(Object.assign({}, messageData), message), { id: messageData.id, userId, messageId: ((_d = message.id) === null || _d === void 0 ? void 0 : _d.id) || message.messageId || null, body: media.originalname, mediaUrl: media.filename, mediaType: media.mediaType ||
                        media.mimetype.substr(0, media.mimetype.indexOf("/")) }));
                const messageCreated = yield Message_1.default.findByPk(msgCreated.id, {
                    include: [
                        {
                            model: Ticket_1.default,
                            as: "ticket",
                            where: { tenantId },
                            include: ["contact"]
                        },
                        {
                            model: Message_1.default,
                            as: "quotedMsg",
                            include: ["contact"]
                        }
                    ]
                });
                if (!messageCreated) {
                    throw new Error("ERR_CREATING_MESSAGE_SYSTEM");
                }
                yield ticket.update({
                    lastMessage: messageCreated.body,
                    lastMessageAt: new Date().getTime()
                });
                (0, socketEmit_1.default)({
                    tenantId,
                    type: "chat:create",
                    payload: messageCreated
                });
            })));
        }
        else {
            let message = {};
            if (!messageData.scheduleDate) {
                /// enviar mensagem > run time
                message = yield (0, SendMessageSystemProxy_1.default)({
                    ticket,
                    messageData,
                    media: null,
                    userId
                });
                ///
            }
            const msgCreated = yield Message_1.default.create(Object.assign(Object.assign(Object.assign({}, messageData), message), { id: messageData.id, userId, messageId: ((_c = message.id) === null || _c === void 0 ? void 0 : _c.id) || message.messageId || null, mediaType: "chat" }));
            const messageCreated = yield Message_1.default.findByPk(msgCreated.id, {
                include: [
                    {
                        model: Ticket_1.default,
                        as: "ticket",
                        where: { tenantId },
                        include: ["contact"]
                    },
                    {
                        model: Message_1.default,
                        as: "quotedMsg",
                        include: ["contact"]
                    }
                ]
            });
            if (!messageCreated) {
                // throw new AppError("ERR_CREATING_MESSAGE", 501);
                throw new Error("ERR_CREATING_MESSAGE_SYSTEM");
            }
            yield ticket.update({
                lastMessage: messageCreated.body,
                lastMessageAt: new Date().getTime(),
                answered: true
            });
            (0, socketEmit_1.default)({
                tenantId,
                type: "chat:create",
                payload: messageCreated
            });
        }
    }
    catch (error) {
        logger_1.logger.error("CreateMessageSystemService", error);
        throw error;
    }
});
exports.default = CreateMessageSystemService;
//# sourceMappingURL=CreateMessageSystemService.js.map