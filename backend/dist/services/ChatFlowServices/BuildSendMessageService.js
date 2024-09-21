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
const path_1 = require("path");
const pupa_1 = require("../../utils/pupa");
const logger_1 = require("../../utils/logger");
const Ticket_1 = __importDefault(require("../../models/Ticket"));
const Message_1 = __importDefault(require("../../models/Message"));
const socketEmit_1 = __importDefault(require("../../helpers/socketEmit"));
const SendMessageSystemProxy_1 = __importDefault(require("../../helpers/SendMessageSystemProxy"));
// const writeFileAsync = promisify(writeFile);
const BuildSendMessageService = ({ msg, tenantId, ticket, userId }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const messageData = {
        ticketId: ticket.id,
        body: "",
        contactId: ticket.contactId,
        fromMe: true,
        read: true,
        mediaType: "chat",
        mediaUrl: undefined,
        timestamp: new Date().getTime(),
        quotedMsgId: undefined,
        userId,
        scheduleDate: undefined,
        sendType: "bot",
        status: "pending",
        tenantId
    };
    try {
        if (msg.type === "MediaField" && msg.data.mediaUrl) {
            const urlSplit = msg.data.mediaUrl.split("/");
            const message = Object.assign(Object.assign({}, messageData), { body: msg.data.name, mediaName: urlSplit[urlSplit.length - 1], mediaUrl: urlSplit[urlSplit.length - 1], mediaType: msg.data.type
                    ? (_a = msg.data) === null || _a === void 0 ? void 0 : _a.type.substr(0, msg.data.type.indexOf("/"))
                    : "chat" });
            const customPath = (0, path_1.join)(__dirname, "..", "..", "..", "public");
            const mediaPath = (0, path_1.join)(customPath, message.mediaUrl);
            const media = {
                path: mediaPath,
                filename: message.mediaName
            };
            const messageSent = yield (0, SendMessageSystemProxy_1.default)({
                ticket,
                messageData: message,
                media,
                userId
            });
            const msgCreated = yield Message_1.default.create(Object.assign(Object.assign(Object.assign({}, message), messageSent), { id: messageData.id, messageId: ((_b = messageSent.id) === null || _b === void 0 ? void 0 : _b.id) || messageSent.messageId || null }));
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
        }
        else {
            // Alter template message
            msg.data.message = (0, pupa_1.pupa)(msg.data.message || "", {
                // greeting: será considerado conforme data/hora da mensagem internamente na função pupa
                protocol: ticket.protocol,
                name: ticket.contact.name
            });
            const messageSent = yield (0, SendMessageSystemProxy_1.default)({
                ticket,
                messageData: Object.assign(Object.assign({}, messageData), { body: msg.data.message }),
                media: null,
                userId: null
            });
            const msgCreated = yield Message_1.default.create(Object.assign(Object.assign(Object.assign({}, messageData), messageSent), { id: messageData.id, messageId: ((_c = messageSent.id) === null || _c === void 0 ? void 0 : _c.id) || messageSent.messageId || null, mediaType: "bot" }));
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
        logger_1.logger.error("BuildSendMessageService", error);
    }
});
exports.default = BuildSendMessageService;
//# sourceMappingURL=BuildSendMessageService.js.map