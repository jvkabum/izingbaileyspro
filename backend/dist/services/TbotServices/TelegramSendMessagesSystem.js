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
const path_1 = require("path");
const SetTicketMessagesAsRead_1 = __importDefault(require("../../helpers/SetTicketMessagesAsRead"));
const logger_1 = require("../../utils/logger");
const TelegramSendMessagesSystem = (tbot, ticket, message) => __awaiter(void 0, void 0, void 0, function* () {
    let sendedMessage;
    const chatId = ticket.contact.telegramId;
    const extraInfo = {};
    if (message.quotedMsg) {
        extraInfo.reply_to_message_id = message.quotedMsg.messageId;
    }
    try {
        if (!["chat", "text"].includes(message.mediaType) && message.mediaName) {
            const customPath = (0, path_1.join)(__dirname, "..", "..", "..", "public");
            const mediaPath = (0, path_1.join)(customPath, message.mediaName);
            if (message.mediaType === "audio" || message.mediaType === "ptt") {
                sendedMessage = yield tbot.telegram.sendVoice(chatId, {
                    source: mediaPath
                }, extraInfo);
            }
            else if (message.mediaType === "image") {
                sendedMessage = yield tbot.telegram.sendPhoto(chatId, {
                    source: mediaPath
                }, extraInfo);
            }
            else if (message.mediaType === "video") {
                sendedMessage = yield tbot.telegram.sendVideo(chatId, {
                    source: mediaPath
                }, extraInfo);
            }
            else {
                sendedMessage = yield tbot.telegram.sendDocument(chatId, {
                    source: mediaPath
                }, extraInfo);
            }
            logger_1.logger.info("sendMessage media");
        }
        else {
            sendedMessage = yield tbot.telegram.sendMessage(chatId, message.body, extraInfo);
            logger_1.logger.info("sendMessage text");
        }
        // enviar old_id para substituir no front a mensagem corretamente
        const messageToUpdate = Object.assign(Object.assign(Object.assign({}, message), sendedMessage), { id: message.id, timestamp: sendedMessage.date * 1000, messageId: sendedMessage.message_id, status: "sended", ack: 2 });
        logger_1.logger.info("Message Update ok");
        yield (0, SetTicketMessagesAsRead_1.default)(ticket);
        return messageToUpdate;
    }
    catch (error) {
        const idMessage = message.id;
        logger_1.logger.error(`Error send message (id: ${idMessage}):: ${error}`);
    }
});
exports.default = TelegramSendMessagesSystem;
//# sourceMappingURL=TelegramSendMessagesSystem.js.map