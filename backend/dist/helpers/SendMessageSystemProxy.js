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
const InstaBot_1 = require("../libs/InstaBot");
const tbot_1 = require("../libs/tbot");
const InstagramSendMessagesSystem_1 = __importDefault(require("../services/InstagramBotServices/InstagramSendMessagesSystem"));
const TelegramSendMessagesSystem_1 = __importDefault(require("../services/TbotServices/TelegramSendMessagesSystem"));
const SendWhatsAppMedia_1 = __importDefault(require("../services/WbotServices/SendWhatsAppMedia"));
const SendWhatsAppMessage_1 = __importDefault(require("../services/WbotServices/SendWhatsAppMessage"));
const SendMessageSystemProxy = ({ ticket, messageData, media, userId }) => __awaiter(void 0, void 0, void 0, function* () {
    let message;
    if (messageData.mediaName) {
        switch (ticket.channel) {
            case "instagram":
                message = yield (0, InstagramSendMessagesSystem_1.default)((0, InstaBot_1.getInstaBot)(ticket.whatsappId), ticket, Object.assign(Object.assign({}, messageData), { media }));
                break;
            case "telegram":
                message = yield (0, TelegramSendMessagesSystem_1.default)((0, tbot_1.getTbot)(ticket.whatsappId), ticket, Object.assign(Object.assign({}, messageData), { media }));
                break;
            default:
                message = yield (0, SendWhatsAppMedia_1.default)({ media, ticket, userId });
                break;
        }
    }
    if (!media) {
        switch (ticket.channel) {
            case "instagram":
                message = yield (0, InstagramSendMessagesSystem_1.default)((0, InstaBot_1.getInstaBot)(ticket.whatsappId), ticket, messageData);
                break;
            case "telegram":
                message = yield (0, TelegramSendMessagesSystem_1.default)((0, tbot_1.getTbot)(ticket.whatsappId), ticket, messageData);
                break;
            default:
                message = yield (0, SendWhatsAppMessage_1.default)({
                    body: messageData.body,
                    ticket,
                    quotedMsg: messageData === null || messageData === void 0 ? void 0 : messageData.quotedMsg
                });
                break;
        }
    }
    return message;
});
exports.default = SendMessageSystemProxy;
//# sourceMappingURL=SendMessageSystemProxy.js.map