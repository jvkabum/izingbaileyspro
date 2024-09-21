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
exports.exportContacts = exports.upload = exports.syncContacts = exports.updateContactWallet = exports.updateContactTags = exports.remove = exports.update = exports.show = exports.store = exports.index = void 0;
const Yup = __importStar(require("yup"));
const lodash_1 = require("lodash");
const xlsx_1 = __importDefault(require("xlsx"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const ListContactsService_1 = __importDefault(require("../services/ContactServices/ListContactsService"));
const CreateContactService_1 = __importDefault(require("../services/ContactServices/CreateContactService"));
const ShowContactService_1 = __importDefault(require("../services/ContactServices/ShowContactService"));
const UpdateContactService_1 = __importDefault(require("../services/ContactServices/UpdateContactService"));
const DeleteContactService_1 = __importDefault(require("../services/ContactServices/DeleteContactService"));
const UpdateContactTagsService_1 = __importDefault(require("../services/ContactServices/UpdateContactTagsService"));
const CheckIsValidContact_1 = __importDefault(require("../services/WbotServices/CheckIsValidContact"));
const GetProfilePicUrl_1 = __importDefault(require("../services/WbotServices/GetProfilePicUrl"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const UpdateContactWalletsService_1 = __importDefault(require("../services/ContactServices/UpdateContactWalletsService"));
const SyncContactsWhatsappInstanceService_1 = __importDefault(require("../services/WbotServices/SyncContactsWhatsappInstanceService"));
const Whatsapp_1 = __importDefault(require("../models/Whatsapp"));
const ImportFileContactsService_1 = require("../services/WbotServices/ImportFileContactsService");
const Contact_1 = __importDefault(require("../models/Contact"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenantId, id: userId, profile } = req.user;
    const { searchParam, pageNumber } = req.query;
    const { contacts, count, hasMore } = yield (0, ListContactsService_1.default)({
        searchParam,
        pageNumber,
        tenantId,
        profile,
        userId
    });
    return res.json({ contacts, count, hasMore });
});
exports.index = index;
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenantId } = req.user;
    const newContact = req.body;
    newContact.number = newContact.number.replace("-", "").replace(" ", "");
    const schema = Yup.object().shape({
        name: Yup.string().required(),
        number: Yup.string()
            .required()
            .matches(/^\d+$/, "Invalid number format. Only numbers is allowed.")
    });
    try {
        yield schema.validate(newContact);
    }
    catch (err) {
        throw new AppError_1.default(err.message);
    }
    const waNumber = yield (0, CheckIsValidContact_1.default)(newContact.number, tenantId);
    const profilePicUrl = yield (0, GetProfilePicUrl_1.default)(newContact.number, tenantId);
    const contact = yield (0, CreateContactService_1.default)(Object.assign(Object.assign({}, newContact), { number: waNumber.user, profilePicUrl,
        tenantId }));
    return res.status(200).json(contact);
});
exports.store = store;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contactId } = req.params;
    const { tenantId } = req.user;
    const contact = yield (0, ShowContactService_1.default)({ id: contactId, tenantId });
    return res.status(200).json(contact);
});
exports.show = show;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contactData = req.body;
    const { tenantId } = req.user;
    const schema = Yup.object().shape({
        name: Yup.string(),
        number: Yup.string().matches(/^\d+$/, "Invalid number format. Only numbers is allowed.")
    });
    try {
        yield schema.validate(contactData);
    }
    catch (err) {
        throw new AppError_1.default(err.message);
    }
    const waNumber = yield (0, CheckIsValidContact_1.default)(contactData.number, tenantId);
    contactData.number = waNumber.user;
    const { contactId } = req.params;
    const contact = yield (0, UpdateContactService_1.default)({
        contactData,
        contactId,
        tenantId
    });
    return res.status(200).json(contact);
});
exports.update = update;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contactId } = req.params;
    const { tenantId } = req.user;
    yield (0, DeleteContactService_1.default)({ id: contactId, tenantId });
    return res.status(200).json({ message: "Contact deleted" });
});
exports.remove = remove;
const updateContactTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tags } = req.body;
    const { contactId } = req.params;
    const { tenantId } = req.user;
    const contact = yield (0, UpdateContactTagsService_1.default)({
        tags,
        contactId,
        tenantId
    });
    return res.status(200).json(contact);
});
exports.updateContactTags = updateContactTags;
const updateContactWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { wallets } = req.body;
    const { contactId } = req.params;
    const { tenantId } = req.user;
    const contact = yield (0, UpdateContactWalletsService_1.default)({
        wallets,
        contactId,
        tenantId
    });
    return res.status(200).json(contact);
});
exports.updateContactWallet = updateContactWallet;
const syncContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenantId } = req.user;
    const sessoes = yield Whatsapp_1.default.findAll({
        where: {
            tenantId,
            status: "CONNECTED",
            type: "whatsapp"
        }
    });
    if (!sessoes.length) {
        throw new AppError_1.default("Não existem sessões ativas para sincronização dos contatos.");
    }
    yield Promise.all(sessoes.map((s) => __awaiter(void 0, void 0, void 0, function* () {
        if (s.id) {
            if (s.id) {
                yield (0, SyncContactsWhatsappInstanceService_1.default)(s.id, +tenantId);
            }
        }
    })));
    return res
        .status(200)
        .json({ message: "Contatos estão sendo sincronizados." });
});
exports.syncContacts = syncContacts;
const upload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const file = (0, lodash_1.head)(files);
    const { tenantId } = req.user;
    let { tags, wallets } = req.body;
    if (tags) {
        tags = tags.split(",");
    }
    if (wallets) {
        wallets = wallets.split();
    }
    const response = yield (0, ImportFileContactsService_1.ImportFileContactsService)(+tenantId, file, tags, wallets);
    // const io = getIO();
    // io.emit(`company-${companyId}-contact`, {
    //   action: "reload",
    //   records: response
    // });
    return res.status(200).json(response);
});
exports.upload = upload;
const exportContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenantId } = req.user;
    const contacts = yield Contact_1.default.findAll({
        where: { tenantId },
        attributes: ["id", "name", "number", "email"],
        order: [["name", "ASC"]],
        raw: true
    });
    // Cria um novo workbook e worksheet
    const workbook = xlsx_1.default.utils.book_new();
    const worksheet = xlsx_1.default.utils.json_to_sheet(contacts);
    // Adiciona o worksheet ao workbook
    xlsx_1.default.utils.book_append_sheet(workbook, worksheet, "Contatos");
    // Gera o arquivo Excel no formato .xlsx
    const excelBuffer = xlsx_1.default.write(workbook, {
        bookType: "xlsx",
        type: "buffer"
    });
    // Define o nome do arquivo
    const fileName = `${(0, uuid_1.v4)()}_contatos.xlsx`;
    const filePath = path_1.default.join(__dirname, "..", "..", "public", "downloads");
    const file = path_1.default.join(filePath, fileName);
    // Cria os diretórios de downloads se eles não existirem
    if (!fs_1.default.existsSync(filePath)) {
        fs_1.default.mkdirSync(filePath, { recursive: true });
    }
    // Salva o arquivo no diretório de downloads
    fs_1.default.writeFile(file, excelBuffer, err => {
        if (err) {
            console.error("Erro ao salvar arquivo:", err);
            return res.status(500).send("Erro ao exportar contatos");
        }
        const { BACKEND_URL } = process.env;
        const downloadLink = `${BACKEND_URL}:${process.env.PROXY_PORT}/public/downloads/${fileName}`;
        res.send({ downloadLink });
    });
});
exports.exportContacts = exportContacts;
//# sourceMappingURL=ContactController.js.map