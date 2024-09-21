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
const AppError_1 = __importDefault(require("../../errors/AppError"));
const Tenant_1 = __importDefault(require("../../models/Tenant"));
const ApiConfig_1 = __importDefault(require("../../models/ApiConfig"));
const ApiMessage_1 = __importDefault(require("../../models/ApiMessage"));
const AutoReply_1 = __importDefault(require("../../models/AutoReply"));
const Campaign_1 = __importDefault(require("../../models/Campaign"));
const ChatFlow_1 = __importDefault(require("../../models/ChatFlow"));
const ContactTag_1 = __importDefault(require("../../models/ContactTag"));
const ContactWallet_1 = __importDefault(require("../../models/ContactWallet"));
const Contact_1 = __importDefault(require("../../models/Contact"));
const FastReply_1 = __importDefault(require("../../models/FastReply"));
const Message_1 = __importDefault(require("../../models/Message"));
const Queue_1 = __importDefault(require("../../models/Queue"));
const Setting_1 = __importDefault(require("../../models/Setting"));
const Tag_1 = __importDefault(require("../../models/Tag"));
const Ticket_1 = __importDefault(require("../../models/Ticket"));
const User_1 = __importDefault(require("../../models/User"));
const Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
const AdminDeleteTenantService = ({ tenantId }) => __awaiter(void 0, void 0, void 0, function* () {
    const tenant = yield Tenant_1.default.findOne({
        where: { id: tenantId }
    });
    if (!tenant) {
        throw new AppError_1.default("ERR_NO_TENANT_FOUND", 404);
    }
    // Deletar dados em todas as tabelas
    yield ApiConfig_1.default.destroy({ where: { tenantId } });
    yield ApiMessage_1.default.destroy({ where: { tenantId } });
    yield AutoReply_1.default.destroy({ where: { tenantId } });
    yield Campaign_1.default.destroy({ where: { tenantId } });
    yield ChatFlow_1.default.destroy({ where: { tenantId } });
    yield ContactTag_1.default.destroy({ where: { tenantId } });
    yield ContactWallet_1.default.destroy({ where: { tenantId } });
    yield Contact_1.default.destroy({ where: { tenantId } });
    yield FastReply_1.default.destroy({ where: { tenantId } });
    yield Message_1.default.destroy({ where: { tenantId } });
    yield Queue_1.default.destroy({ where: { tenantId } });
    yield Setting_1.default.destroy({ where: { tenantId } });
    yield Tag_1.default.destroy({ where: { tenantId } });
    yield Ticket_1.default.destroy({ where: { tenantId } });
    yield User_1.default.destroy({ where: { tenantId } });
    yield Whatsapp_1.default.destroy({ where: { tenantId } });
    // Chame o método destroy para todos os outros modelos aqui
    // Finalmente, deletar o inquilino
    yield tenant.destroy();
});
exports.default = AdminDeleteTenantService;
//# sourceMappingURL=AdminDeleteTenantService.js.map