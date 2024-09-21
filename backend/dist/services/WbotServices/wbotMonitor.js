"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.startSession = exports.sendMessageAPI = void 0;
const Yup = __importStar(require("yup"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const wbot_1 = require("../libs/wbot");
const sendMessageAPI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenantId, sessionId } = req.APIAuth;
    const { apiId } = req.params;
    const media = req.file;
    // ... (rest of the code)
    const schema = Yup.object().shape({
        apiId: Yup.string().required(),
        sessionId: Yup.number().required(),
        body: Yup.string().required(),
        number: Yup.string().required(),
        mediaUrl: Yup.mixed().when("media", {
            is: null,
            then: Yup.string().url().nullable(),
            otherwise: Yup.object().shape({
                destination: Yup.string().required(),
                encoding: Yup.string().required(),
                fieldname: Yup.string().required(),
                filename: Yup.string().required(),
                mimetype: Yup.string().required(),
                originalname: Yup.string().required(),
                path: Yup.string().required(),
                size: Yup.number().required()
            })
        }),
        externalKey: Yup.string().required(),
        tenantId: Yup.number().required()
    });
    // ... (rest of the code)
});
exports.sendMessageAPI = sendMessageAPI;
const startSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // ... (rest of the code)
    const wbot = (0, wbot_1.getWbot)(APIConfig.sessionId);
    const isConnectStatus = (yield wbot.getState()) === "CONNECTED";
    if (!isConnectStatus) {
        throw new AppError_1.default("ERR_SESSION_NOT_CONNECTED", 403, "Session is not connected.");
    }
    // ... (rest of the code)
});
exports.startSession = startSession;
//# sourceMappingURL=wbotMonitor.js.map