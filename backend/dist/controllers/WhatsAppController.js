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
exports.remove = exports.update = exports.store = exports.show = exports.index = void 0;
const socket_1 = require("../libs/socket");
const wbot_1 = require("../libs/wbot");
const AppError_1 = __importDefault(require("../errors/AppError"));
const Tenant_1 = __importDefault(require("../models/Tenant"));
const DeleteWhatsAppService_1 = __importDefault(require("../services/WhatsappService/DeleteWhatsAppService"));
const ListWhatsAppsService_1 = __importDefault(require("../services/WhatsappService/ListWhatsAppsService"));
const ShowWhatsAppService_1 = __importDefault(require("../services/WhatsappService/ShowWhatsAppService"));
const UpdateWhatsAppService_1 = __importDefault(require("../services/WhatsappService/UpdateWhatsAppService"));
const CreateWhatsAppService_1 = __importDefault(require("../services/WhatsappService/CreateWhatsAppService"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenantId } = req.user;
    const whatsapps = yield (0, ListWhatsAppsService_1.default)(tenantId);
    return res.status(200).json(whatsapps);
});
exports.index = index;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { whatsappId } = req.params;
    const { tenantId } = req.user;
    const whatsapp = yield (0, ShowWhatsAppService_1.default)({ id: whatsappId, tenantId });
    return res.status(200).json(whatsapp);
});
exports.show = show;
const getTenantmaxConnections = (tenantId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tenant = yield Tenant_1.default.findOne({ where: { id: tenantId } });
        if (!tenant) {
            throw new AppError_1.default("Tenant not found", 404);
        }
        return tenant.maxConnections;
    }
    catch (error) {
        throw new AppError_1.default("Error fetching maxTenants", 500);
    }
});
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { whatsappId } = req.params;
    const whatsappData = req.body;
    const { tenantId } = req.user;
    const whatsapps = yield (0, ListWhatsAppsService_1.default)(tenantId);
    if (whatsapps.length >= Number(process.env.CONNECTIONS_LIMIT)) {
        throw new AppError_1.default("ERR_NO_PERMISSION_CONNECTIONS_LIMIT", 400);
    }
    const maxConnections = yield getTenantmaxConnections(String(tenantId));
    if (whatsapps.length >= maxConnections) {
        throw new AppError_1.default("ERR_NO_PERMISSION_CONNECTIONS_LIMIT", 400);
    }
    const { whatsapp } = yield (0, CreateWhatsAppService_1.default)(Object.assign(Object.assign({}, whatsappData), { whatsappId,
        tenantId }));
    return res.status(200).json(whatsapp);
});
exports.store = store;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { whatsappId } = req.params;
    const whatsappData = req.body;
    const { tenantId } = req.user;
    const { whatsapp } = yield (0, UpdateWhatsAppService_1.default)({
        whatsappData,
        whatsappId,
        tenantId
    });
    return res.status(200).json(whatsapp);
});
exports.update = update;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { whatsappId } = req.params;
    const { tenantId } = req.user;
    yield (0, DeleteWhatsAppService_1.default)(whatsappId, tenantId);
    (0, wbot_1.removeWbot)(+whatsappId);
    const io = (0, socket_1.getIO)();
    io.emit(`${tenantId}:whatsapp`, {
        action: "delete",
        whatsappId: +whatsappId
    });
    return res.status(200).json({ message: "Whatsapp deleted." });
});
exports.remove = remove;
//# sourceMappingURL=WhatsAppController.js.map