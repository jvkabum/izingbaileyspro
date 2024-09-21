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
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const promises_1 = require("fs/promises");
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const path_1 = require("path");
const sharp_1 = __importDefault(require("sharp"));
const SetTicketMessagesAsRead_1 = __importDefault(require("../../helpers/SetTicketMessagesAsRead"));
const logger_1 = require("../../utils/logger");
const InstagramSendMessagesSystem = (instaBot, ticket, message) => __awaiter(void 0, void 0, void 0, function* () {
    let sendedMessage;
    const chatId = ticket.contact.instagramPK;
    const threadEntity = yield instaBot.entity.directThread([chatId]);
    try {
        if (!["chat", "text"].includes(message.mediaType) && message.mediaName) {
            const customPath = (0, path_1.join)(__dirname, "..", "..", "..", "public");
            const mediaPath = (0, path_1.join)(customPath, message.mediaName);
            const file = yield (0, promises_1.readFile)(mediaPath);
            if (message.mediaType === "audio" || message.mediaType === "ptt") {
                const splitName = message.mediaName.split(".");
                const newAudioPath = (0, path_1.join)(customPath, `${splitName[0]}.mp4`);
                yield new Promise((resolve, reject) => {
                    (0, fluent_ffmpeg_1.default)(mediaPath)
                        .toFormat("mp4")
                        .on("error", error => reject(error))
                        .on("end", () => resolve(true))
                        .saveToFile(newAudioPath);
                });
                const voice = yield (0, promises_1.readFile)(newAudioPath);
                sendedMessage = yield threadEntity.broadcastVoice({
                    file: voice
                });
            }
            if (message.mediaType === "image") {
                const photo = yield (0, sharp_1.default)(file).jpeg().toBuffer();
                sendedMessage = yield threadEntity.broadcastPhoto({
                    file: photo
                });
            }
            if (message.mediaType === "video") {
                sendedMessage = yield threadEntity.broadcastVideo({
                    video: file
                });
            }
            logger_1.logger.info("sendMessage media");
        }
        if (["chat", "text"].includes(message.mediaType) && !message.mediaName) {
            sendedMessage = yield threadEntity.broadcastText(message.body);
            logger_1.logger.info("sendMessage text");
        }
        if (!(sendedMessage === null || sendedMessage === void 0 ? void 0 : sendedMessage.item_id)) {
            throw new Error("Formato não suportado");
        }
        // enviar old_id para substituir no front a mensagem corretamente
        const messageToUpdate = Object.assign(Object.assign(Object.assign({}, message), sendedMessage), { id: message.id, timestamp: message.timestamp, messageId: sendedMessage.item_id, status: "sended", ack: 2 });
        logger_1.logger.info("Message Update ok");
        yield (0, SetTicketMessagesAsRead_1.default)(ticket);
        return messageToUpdate;
    }
    catch (error) {
        const idMessage = message.id;
        logger_1.logger.error(`Error send message (id: ${idMessage}):: ${error}`);
        throw error;
    }
});
exports.default = InstagramSendMessagesSystem;
//# sourceMappingURL=InstagramSendMessagesSystem.js.map