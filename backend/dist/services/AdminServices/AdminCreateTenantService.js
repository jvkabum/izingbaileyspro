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
const Tenant_1 = __importDefault(require("../../models/Tenant"));
const Setting_1 = __importDefault(require("../../models/Setting"));
const AdminCreateTenantService = ({ tenantData }) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = Yup.object().shape({
        status: Yup.string().required(),
        name: Yup.string().min(2).required(),
        maxUsers: Yup.number().integer().min(0).required(),
        maxConnections: Yup.number().integer().min(0).required()
    });
    const { status, name, maxUsers, maxConnections } = tenantData;
    try {
        yield schema.validate({ status, name, maxUsers, maxConnections });
    }
    catch (err) {
        throw new AppError_1.default(err === null || err === void 0 ? void 0 : err.message);
    }
    const tenant = yield Tenant_1.default.create({
        status,
        name,
        maxUsers,
        maxConnections,
        businessHours: [
            { "day": 0, "hr1": "08:00", "hr2": "12:00", "hr3": "14:00", "hr4": "18:00", "type": "O", "label": "Domingo" },
            { "day": 1, "hr1": "08:00", "hr2": "12:00", "hr3": "14:00", "hr4": "18:00", "type": "O", "label": "Segunda-Feira" },
            { "day": 2, "hr1": "08:00", "hr2": "12:00", "hr3": "14:00", "hr4": "18:00", "type": "O", "label": "Terça-Feira" },
            { "day": 3, "hr1": "08:00", "hr2": "12:00", "hr3": "14:00", "hr4": "18:00", "type": "O", "label": "Quarta-Feira" },
            { "day": 4, "hr1": "08:00", "hr2": "12:00", "hr3": "14:00", "hr4": "18:00", "type": "O", "label": "Quinta-Feira" },
            { "day": 5, "hr1": "08:00", "hr2": "12:00", "hr3": "14:00", "hr4": "18:00", "type": "O", "label": "Sexta-Feira" },
            { "day": 6, "hr1": "08:00", "hr2": "12:00", "hr3": "14:00", "hr4": "18:00", "type": "O", "label": "Sábado" }
        ],
        messageBusinessHours: "Olá! Fantástico receber seu contato! No momento estamos ausentes e não poderemos lhe atender, mas vamos priorizar seu atendimento e retornaremos logo mais. Agradecemos muito o contato."
    });
    // Inserir as configurações padrão para o novo inquilino
    const defaultSettings = [
        { key: 'userCreation', value: 'disabled' },
        { key: 'NotViewTicketsQueueUndefined', value: 'disabled' },
        { key: 'NotViewTicketsChatBot', value: 'disabled' },
        { key: 'DirectTicketsToWallets', value: 'disabled' },
        { key: 'NotViewAssignedTickets', value: 'disabled' },
        { key: 'botTicketActive', value: '3' },
        { key: 'ignoreGroupMsg', value: 'enabled' },
        { key: 'rejectCalls', value: 'disabled' },
        { key: 'callRejectMessage', value: 'As chamadas de voz e vídeo estão desabilitas para esse WhatsApp, favor enviar uma mensagem de texto.' }
    ];
    for (const setting of defaultSettings) {
        yield Setting_1.default.create(Object.assign(Object.assign({}, setting), { tenantId: tenant.id }));
    }
    return tenant;
});
exports.default = AdminCreateTenantService;
//# sourceMappingURL=AdminCreateTenantService.js.map