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
const DeleteWhatsAppMessage = (id, messageId, tenantId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!messageId || messageId === "null") {
        yield Message_1.default.update({
            isDeleted: true,
            status: "canceled"
        }, { where: { id } });
        const message = yield Message_1.default.findByPk(id, {
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
            const io = (0, socket_1.getIO)();
            // .to(`tenant:${tenantId}:notification`)
            io.to(`tenant:${tenantId}:${message.ticket.id}`).emit(`tenant:${tenantId}:appMessage`, {
                action: "update",
                message,
                ticket: message.ticket,
                contact: message.ticket.contact
            });
        }
        return;
    }
    const message = yield Message_1.default.findOne({
        where: { messageId },
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
    const { ticket } = message;
    const messageToDelete = yield (0, GetWbotMessage_1.default)(ticket, messageId);
    try {
        if (!messageToDelete) {
            throw new AppError_1.default("ERROR_NOT_FOUND_MESSAGE");
        }
        yield messageToDelete.delete(true);
    }
    catch (err) {
        // StartWhatsAppSessionVerify(ticket.whatsappId, err);
        throw new AppError_1.default("ERR_DELETE_WAPP_MSG");
    }
    yield message.update({ isDeleted: true });
    const io = (0, socket_1.getIO)();
    // .to(`tenant:${tenantId}:notification`)
    io.to(`tenant:${tenantId}:${message.ticket.id}`).emit(`tenant:${tenantId}:appMessage`, {
        action: "update",
        message,
        contact: ticket.contact
    });
});
exports.default = DeleteWhatsAppMessage;
//# sourceMappingURL=DeleteWhatsAppMessage.js.map