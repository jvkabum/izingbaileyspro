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
const date_fns_1 = require("date-fns");
const Message_1 = __importDefault(require("../models/Message"));
const Ticket_1 = __importDefault(require("../models/Ticket"));
const tbot_1 = require("../libs/tbot");
// import { getInstaBot } from "../libs/InstaBot";
const GetWbotMessage_1 = __importDefault(require("./GetWbotMessage"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const socket_1 = require("../libs/socket");
const DeleteMessageSystem = (id, messageId, tenantId) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield Message_1.default.findOne({
        where: { id },
        include: [
            {
                model: Ticket_1.default,
                as: "ticket",
                include: ["contact"],
                where: { tenantId }
            }
        ]
    });
    if (message) {
        const diffHoursDate = (0, date_fns_1.differenceInHours)(new Date(), (0, date_fns_1.parseJSON)(message === null || message === void 0 ? void 0 : message.createdAt));
        if (diffHoursDate > 2) {
            console.log("Error: Cannot delete message after 2 hours");
            throw new AppError_1.default("Cannot delete message after 2 hours of being sent");
        }
    }
    if (!message) {
        throw new AppError_1.default("No message found with this ID.");
    }
    if (message.messageId === null && message.status === "pending") {
        yield message.destroy();
        console.log("Scheduled message deleted from the database.");
        return;
    }
    const { ticket } = message;
    if (ticket.channel === "whatsapp") {
        const messageToDelete = yield (0, GetWbotMessage_1.default)(ticket, messageId);
        if (!messageToDelete) {
            throw new AppError_1.default("ERROR_NOT_FOUND_MESSAGE");
        }
        yield messageToDelete.delete(true);
    }
    if (ticket.channel === "telegram") {
        const telegramBot = yield (0, tbot_1.getTbot)(ticket.whatsappId);
        yield telegramBot.telegram.deleteMessage(ticket.contact.telegramId, +message.messageId);
    }
    if (ticket.channel === "instagram") {
        // Instagram deletion logic here
        return;
    }
    if (ticket.channel === "messenger") {
        return;
    }
    yield message.update({ isDeleted: true });
    console.log("Message marked as deleted");
    const io = (0, socket_1.getIO)();
    io.to(`tenant:${tenantId}:${ticket.id}`).emit(`tenant:${tenantId}:appMessage`, {
        action: "update",
        message,
        ticket,
        contact: ticket.contact
    });
});
exports.default = DeleteMessageSystem;
//# sourceMappingURL=DeleteMessageSystem.js.map