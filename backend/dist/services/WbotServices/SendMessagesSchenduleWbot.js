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
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const sequelize_1 = require("sequelize");
const Message_1 = __importDefault(require("../../models/Message"));
const Ticket_1 = __importDefault(require("../../models/Ticket"));
const logger_1 = require("../../utils/logger");
const Contact_1 = __importDefault(require("../../models/Contact"));
const SendMessage_1 = __importDefault(require("./SendMessage"));
const SendMessageSystemProxy_1 = __importDefault(require("../../helpers/SendMessageSystemProxy"));
// import SetTicketMessagesAsRead from "../../helpers/SetTicketMessagesAsRead";
const SendMessagesSchenduleWbot = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const currentDate = new Date(new Date().toLocaleString("en-US", {
        timeZone: process.env.TIMEZONE || "America/Sao_Paulo"
    }));
    const twentyFourHoursAgo = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
    const where = {
        fromMe: true,
        messageId: { [sequelize_1.Op.is]: null },
        status: "pending",
        scheduleDate: {
            [sequelize_1.Op.lte]: currentDate,
            [sequelize_1.Op.gte]: twentyFourHoursAgo
        }
    };
    const messages = yield Message_1.default.findAll({
        where,
        include: [
            {
                model: Contact_1.default,
                as: "contact"
            },
            {
                model: Ticket_1.default,
                as: "ticket",
                where: {
                    status: ["open", "pending"]
                },
                include: ["contact"]
            },
            {
                model: Message_1.default,
                as: "quotedMsg",
                include: ["contact"]
            }
        ],
        order: [["createdAt", "ASC"]]
    });
    for (const message of messages) {
        logger_1.logger.info(`Message Schendule SendMessage: ${message.id} | Tenant: ${message.tenantId} `);
        if (message.ticket.channel !== "whatsapp") {
            try {
                const sent = yield (0, SendMessageSystemProxy_1.default)({
                    ticket: message.ticket,
                    messageData: message.toJSON(),
                    media: null,
                    userId: message.userId
                });
                message.update({
                    messageId: ((_a = sent.id) === null || _a === void 0 ? void 0 : _a.id) || sent.messageId,
                    status: "sended",
                    ack: 2,
                    userId: message.userId
                });
            }
            catch (error) {
                logger_1.logger.error("SendMessagesSchenduleWbot > SendMessageSystemProxy", error);
            }
        }
        else {
            yield (0, SendMessage_1.default)(message).catch(e => {
                logger_1.logger.error("SendMessagesSchenduleWbot > SendMessage", e);
            });
        }
    }
});
exports.default = SendMessagesSchenduleWbot;
//# sourceMappingURL=SendMessagesSchenduleWbot.js.map