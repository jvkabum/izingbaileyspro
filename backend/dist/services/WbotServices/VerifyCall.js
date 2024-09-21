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
const logger_1 = require("../../utils/logger");
const FindOrCreateTicketService_1 = __importDefault(require("../TicketServices/FindOrCreateTicketService"));
const Setting_1 = __importDefault(require("../../models/Setting"));
const VerifyContact_1 = __importDefault(require("./helpers/VerifyContact"));
const CreateMessageSystemService_1 = __importDefault(require("../MessageServices/CreateMessageSystemService"));
const VerifyCall = (call, wbot) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const messageDefault = "As chamadas de voz e vídeo estão desabilitas para esse WhatsApp, favor enviar uma mensagem de texto.";
            let settings;
            try {
                const query = `
          select s."key", s.value, w."tenantId" from "Whatsapps" w
          inner join "Tenants" t on w."tenantId" = t.id
          inner join "Settings" s on t.id = s."tenantId"
          where w.id = '${wbot.id}'
          and s."key" in ('rejectCalls', 'callRejectMessage')
        `;
                settings = yield ((_a = Setting_1.default.sequelize) === null || _a === void 0 ? void 0 : _a.query(query));
                if (settings === null || settings === void 0 ? void 0 : settings.length) {
                    // eslint-disable-next-line prefer-destructuring
                    settings = settings[0];
                }
                const rejectCalls = ((_b = settings.find(s => s.key === "rejectCalls")) === null || _b === void 0 ? void 0 : _b.value) === "enabled" ||
                    false;
                const callRejectMessage = ((_c = settings.find(s => s.key === "callRejectMessage")) === null || _c === void 0 ? void 0 : _c.value) ||
                    messageDefault;
                const tenantId = (_d = settings.find(s => s.key === "rejectCalls")) === null || _d === void 0 ? void 0 : _d.tenantId;
                if (!rejectCalls) {
                    resolve();
                    return;
                }
                yield call.reject();
                if (!call.from)
                    return;
                const callContact = yield wbot.getChatById(call.from);
                // const profilePicUrl = await msgContact.getProfilePicUrl();
                const contact = yield (0, VerifyContact_1.default)(callContact, tenantId);
                const ticket = yield (0, FindOrCreateTicketService_1.default)({
                    contact,
                    whatsappId: wbot.id,
                    unreadMessages: 1,
                    tenantId,
                    channel: "whatsapp"
                });
                // create message for call
                yield (0, CreateMessageSystemService_1.default)({
                    msg: {
                        body: callRejectMessage,
                        fromMe: true,
                        read: true,
                        sendType: "bot"
                    },
                    tenantId: ticket.tenantId,
                    ticket,
                    sendType: "call",
                    status: "pending"
                });
                resolve();
            }
            catch (err) {
                logger_1.logger.error(err);
                reject(err);
            }
        }))();
    });
});
exports.default = VerifyCall;
//# sourceMappingURL=VerifyCall.js.map