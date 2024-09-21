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
const AppError_1 = __importDefault(require("../../errors/AppError"));
const GetWbotMessage_1 = __importDefault(require("../../helpers/GetWbotMessage"));
const Message_1 = __importDefault(require("../../models/Message"));
const Ticket_1 = __importDefault(require("../../models/Ticket"));
const socket_1 = require("../../libs/socket");
const EditWhatsAppMessage = (id, messageId, tenantId, newBody) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id || id === "null") {
        throw new AppError_1.default("ERR_NO_MESSAGE_ID_PROVIDED");
    }
    const message = yield Message_1.default.findOne({
        where: { messageId: messageId },
        include: [
            {
                model: Ticket_1.default,
                as: "ticket",
                include: ["contact"],
                where: { tenantId }
            }
        ]
    });
    if (!message) {
        throw new AppError_1.default("No message found with this ID.");
    }
    // Verificar se já se passaram mais de 10 minutos desde que a mensagem foi enviada
    const messageAgeInMinutes = (new Date().getTime() - new Date(message.createdAt).getTime()) / 60000;
    if (messageAgeInMinutes > 10) {
        throw new AppError_1.default("ERR_EDITING_WAPP_MSG");
    }
    // Verificar se a coluna 'edited' não é NULL
    if (message.edited !== null) {
        throw new AppError_1.default("ERR_EDITING_WAPP_MSG");
    }
    const { ticket } = message;
    const messageToEdit = yield (0, GetWbotMessage_1.default)(ticket, messageId);
    try {
        if (!messageToEdit) {
            throw new AppError_1.default("ERROR_NOT_FOUND_MESSAGE");
        }
        yield messageToEdit.edit(newBody);
    }
    catch (err) {
        throw new AppError_1.default("ERR_EDITING_WAPP_MSG");
    }
    const io = (0, socket_1.getIO)();
    io.to(`tenant:${tenantId}:${message.ticket.id}`).emit(`tenant:${tenantId}:appMessage`, {
        action: "update",
        message,
        contact: ticket.contact
    });
});
exports.default = EditWhatsAppMessage;
//# sourceMappingURL=EditWhatsAppMessage.js.map