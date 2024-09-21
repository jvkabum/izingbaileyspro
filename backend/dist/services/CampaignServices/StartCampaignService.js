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
const pupa_1 = require("../../utils/pupa");
const date_fns_1 = require("date-fns");
const date_fns_tz_1 = require("date-fns-tz");
const Campaign_1 = __importDefault(require("../../models/Campaign"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const CampaignContacts_1 = __importDefault(require("../../models/CampaignContacts"));
const Queue_1 = __importDefault(require("../../libs/Queue"));
const cArquivoName = (url) => {
    if (!url)
        return "";
    const split = url.split("/");
    const name = split[split.length - 1];
    return name;
};
const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
const mountMessageData = (campaign, campaignContact, 
// eslint-disable-next-line @typescript-eslint/ban-types
options) => {
    const messageRandom = randomInteger(1, 3);
    let bodyMessage = "";
    if (messageRandom === 1)
        bodyMessage = campaign.message1;
    if (messageRandom === 2)
        bodyMessage = campaign.message2;
    if (messageRandom === 3)
        bodyMessage = campaign.message3;
    // Use a função pupa para substituir partes da mensagem
    bodyMessage = (0, pupa_1.pupa)(bodyMessage || "", {
        // greeting: será considerado conforme data/hora da mensagem internamente na função pupa
        //    protocol: ticket.protocol,
        name: campaignContact.contact.name
    });
    return {
        whatsappId: campaign.sessionId,
        message: bodyMessage,
        number: campaignContact.contact.number,
        mediaUrl: campaign.mediaUrl,
        mediaName: cArquivoName(campaign.mediaUrl),
        messageRandom: `message${messageRandom}`,
        campaignContact,
        options
    };
};
const nextDayHoursValid = (date) => {
    let dateVerify = date;
    const dateNow = new Date();
    const diffDays = (0, date_fns_1.differenceInDays)(dateVerify, new Date());
    if (diffDays < 0) {
        dateVerify = (0, date_fns_1.addDays)(dateVerify, diffDays * -1);
    }
    if (dateVerify.getTime() < dateNow.getTime()) {
        dateVerify = (0, date_fns_1.setMinutes)((0, date_fns_1.setHours)(dateVerify, dateNow.getHours()), dateNow.getMinutes());
    }
    const start = (0, date_fns_1.parse)("08:00", "HH:mm", dateVerify);
    const end = (0, date_fns_1.parse)("20:00", "HH:mm", dateVerify);
    const isValidHour = (0, date_fns_1.isWithinInterval)(dateVerify, { start, end });
    const isDateBefore = (0, date_fns_1.isBefore)(start, dateVerify);
    const isDateAfter = (0, date_fns_1.isAfter)(end, dateVerify);
    if (!isValidHour && isDateBefore) {
        dateVerify = (0, date_fns_1.setMinutes)((0, date_fns_1.setHours)(dateVerify, 8), 30);
    }
    if (!isValidHour && isDateAfter && diffDays === 0) {
        dateVerify = (0, date_fns_1.addDays)((0, date_fns_1.setHours)(dateVerify, 8), 1);
    }
    if (!isValidHour && isDateAfter && diffDays > 0) {
        dateVerify = (0, date_fns_1.setHours)(dateVerify, 8);
    }
    return dateVerify;
};
const calcDelay = (nextDate, delay) => {
    const diffSeconds = (0, date_fns_1.differenceInSeconds)(nextDate, new Date());
    return diffSeconds * 1000 + delay;
};
const StartCampaignService = ({ campaignId, tenantId, options }) => __awaiter(void 0, void 0, void 0, function* () {
    const campaign = yield Campaign_1.default.findOne({
        where: { id: campaignId, tenantId },
        include: ["session"]
    });
    if (!campaign) {
        throw new AppError_1.default("ERROR_CAMPAIGN_NOT_EXISTS", 404);
    }
    const campaignContacts = yield CampaignContacts_1.default.findAll({
        where: { campaignId },
        include: ["contact"]
    });
    if (!campaignContacts) {
        throw new AppError_1.default("ERR_CAMPAIGN_CONTACTS_NOT_EXISTS", 404);
    }
    const timeDelay = campaign.delay ? campaign.delay * 1000 : 20000;
    let dateDelay = (0, date_fns_tz_1.zonedTimeToUtc)(campaign.start, "America/Sao_Paulo");
    const data = campaignContacts.map((campaignContact) => {
        dateDelay = (0, date_fns_1.addSeconds)(dateDelay, timeDelay / 1000);
        return mountMessageData(campaign, campaignContact, Object.assign(Object.assign({}, options), { jobId: `campaginId_${campaign.id}_contact_${campaignContact.contactId}_id_${campaignContact.id}`, delay: calcDelay(dateDelay, timeDelay) }));
    });
    Queue_1.default.add("SendMessageWhatsappCampaign", data);
    yield campaign.update({
        status: "scheduled"
    });
});
exports.default = StartCampaignService;
//# sourceMappingURL=StartCampaignService.js.map