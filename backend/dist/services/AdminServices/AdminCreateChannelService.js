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
const Yup = __importStar(require("yup"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
const AdminCreateChannelService = ({ name, status = "OPENING", isDefault = false, tenantId, tokenTelegram, instagramUser, instagramKey }) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = Yup.object().shape({
        name: Yup.string()
            .required()
            .min(2)
            .test("Check-name", "This whatsapp name is already used.", (value) => __awaiter(void 0, void 0, void 0, function* () {
            if (value) {
                const whatsappFound = yield Whatsapp_1.default.findOne({
                    where: { name: value }
                });
                return !whatsappFound;
            }
            return true;
        })),
        isDefault: Yup.boolean().required()
    });
    try {
        yield schema.validate({ name, status, isDefault });
    }
    catch (err) {
        throw new AppError_1.default(err.message);
    }
    const whatsappFound = yield Whatsapp_1.default.findOne({ where: { tenantId } });
    if (!whatsappFound) {
        isDefault = !whatsappFound;
    }
    let oldDefaultWhatsapp = null;
    if (isDefault) {
        oldDefaultWhatsapp = yield Whatsapp_1.default.findOne({
            where: { isDefault: true, tenantId }
        });
        if (oldDefaultWhatsapp) {
            yield oldDefaultWhatsapp.update({ isDefault: false });
        }
    }
    const whatsapp = yield Whatsapp_1.default.create({
        name,
        status,
        isDefault,
        tenantId,
        tokenTelegram,
        instagramUser,
        instagramKey
    });
    return { whatsapp, oldDefaultWhatsapp };
});
exports.default = AdminCreateChannelService;
//# sourceMappingURL=AdminCreateChannelService.js.map