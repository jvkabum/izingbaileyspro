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
exports.edit = exports.forward = exports.remove = exports.store = exports.index = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
const DeleteMessageSystem_1 = __importDefault(require("../helpers/DeleteMessageSystem"));
// import GetTicketWbot from "../helpers/GetTicketWbot";
const SetTicketMessagesAsRead_1 = __importDefault(require("../helpers/SetTicketMessagesAsRead"));
const CreateForwardMessageService_1 = __importDefault(require("../services/MessageServices/CreateForwardMessageService"));
// import CreateMessageOffilineService from "../services/MessageServices/CreateMessageOfflineService";
const CreateMessageSystemService_1 = __importDefault(require("../services/MessageServices/CreateMessageSystemService"));
const ListMessagesService_1 = __importDefault(require("../services/MessageServices/ListMessagesService"));
const ShowTicketService_1 = __importDefault(require("../services/TicketServices/ShowTicketService"));
// import SendWhatsAppMedia from "../services/WbotServices/SendWhatsAppMedia";
// import SendWhatsAppMessage from "../services/WbotServices/SendWhatsAppMessage";
const EditWhatsAppMessage_1 = __importDefault(require("../services/WbotServices/EditWhatsAppMessage"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ticketId } = req.params;
    const { pageNumber } = req.query;
    const { tenantId } = req.user;
    const { count, messages, messagesOffLine, ticket, hasMore } = yield (0, ListMessagesService_1.default)({
        pageNumber,
        ticketId,
        tenantId
    });
    try {
        (0, SetTicketMessagesAsRead_1.default)(ticket);
    }
    catch (error) {
        console.log("SetTicketMessagesAsRead", error);
    }
    return res.json({ count, messages, messagesOffLine, ticket, hasMore });
});
exports.index = index;
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ticketId } = req.params;
    const { tenantId, id: userId } = req.user;
    const messageData = req.body;
    const medias = req.files;
    const ticket = yield (0, ShowTicketService_1.default)({ id: ticketId, tenantId });
    try {
        (0, SetTicketMessagesAsRead_1.default)(ticket);
    }
    catch (error) {
        console.log("SetTicketMessagesAsRead", error);
    }
    yield (0, CreateMessageSystemService_1.default)({
        msg: messageData,
        tenantId,
        medias,
        ticket,
        userId,
        scheduleDate: messageData.scheduleDate,
        sendType: messageData.sendType || "chat",
        status: "pending",
        idFront: messageData.idFront
    });
    return res.send();
});
exports.store = store;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { messageId } = req.params;
    const { tenantId } = req.user;
    try {
        yield (0, DeleteMessageSystem_1.default)(req.body.id, messageId, tenantId);
    }
    catch (error) {
        console.error("ERR_DELETE_SYSTEM_MSG", error.message);
        throw new AppError_1.default("ERR_DELETE_SYSTEM_MSG");
    }
    return res.send();
});
exports.remove = remove;
const forward = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { user } = req;
    for (const message of data.messages) {
        yield (0, CreateForwardMessageService_1.default)({
            userId: user.id,
            tenantId: user.tenantId,
            message,
            contact: data.contact,
            ticketIdOrigin: message.ticketId
        });
    }
    return res.send();
});
exports.forward = forward;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { messageId } = req.params;
    const { tenantId } = req.user;
    const { body } = req.body;
    try {
        yield (0, EditWhatsAppMessage_1.default)(req.body.id, messageId, tenantId, body);
    }
    catch (error) {
        if (error instanceof AppError_1.default && error.message === "ERR_EDITING_WAPP_MSG") {
            return res.status(400).json({ error: error.message });
        }
        throw error;
    }
    return res.send();
});
exports.edit = edit;
//# sourceMappingURL=MessageController.js.map