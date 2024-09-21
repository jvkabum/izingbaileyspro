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
exports.ImportFileContactsService = void 0;
/* eslint-disable no-await-in-loop */
const lodash_1 = require("lodash");
const xlsx_1 = __importDefault(require("xlsx"));
const Contact_1 = __importDefault(require("../../models/Contact"));
// import CheckContactNumber from "../WbotServices/CheckNumber";
function ImportFileContactsService(tenantId, file, tags, wallets) {
    return __awaiter(this, void 0, void 0, function* () {
        const workbook = xlsx_1.default.readFile(file === null || file === void 0 ? void 0 : file.path);
        const worksheet = (0, lodash_1.head)(Object.values(workbook.Sheets));
        const rows = xlsx_1.default.utils.sheet_to_json(worksheet, { header: 0 });
        const contacts = [];
        rows.forEach(row => {
            let name = "";
            let number = "";
            let email = "";
            if ((0, lodash_1.has)(row, "nome") || (0, lodash_1.has)(row, "Nome")) {
                name = row.nome || row.Nome;
            }
            if ((0, lodash_1.has)(row, "numero") ||
                (0, lodash_1.has)(row, "número") ||
                (0, lodash_1.has)(row, "Numero") ||
                (0, lodash_1.has)(row, "Número")) {
                number = row.numero || row["número"] || row.Numero || row["Número"];
                number = `${number}`.replace(/\D/g, "");
            }
            if ((0, lodash_1.has)(row, "email") ||
                (0, lodash_1.has)(row, "e-mail") ||
                (0, lodash_1.has)(row, "Email") ||
                (0, lodash_1.has)(row, "E-mail")) {
                email = row.email || row["e-mail"] || row.Email || row["E-mail"];
            }
            name = name || number;
            if (name && number && number.length >= 10) {
                contacts.push({ name, number, email, tenantId });
            }
        });
        const contactList = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const contact of contacts) {
            try {
                // eslint-disable-next-line no-await-in-loop
                // const waNumber = await CheckIsValidContact(
                //   `${contact.number}`,
                //   `${contact.tenantId}`
                // );
                // eslint-disable-next-line no-await-in-loop
                const [newContact, created] = yield Contact_1.default.findOrCreate({
                    where: {
                        number: contact.number,
                        tenantId: contact.tenantId
                    },
                    defaults: contact
                });
                const setContact = newContact;
                if (created) {
                    contactList.push(newContact);
                }
                if (tags === null || tags === void 0 ? void 0 : tags.length) {
                    yield setContact.setTags(tags, { through: { tenantId } });
                }
                if (wallets === null || wallets === void 0 ? void 0 : wallets.length) {
                    yield setContact.setWallets(wallets, { through: { tenantId } });
                }
            }
            catch (error) {
                console.error(`Número não é uma conta válida ${contact.number}`);
            }
        }
        return contactList;
    });
}
exports.ImportFileContactsService = ImportFileContactsService;
//# sourceMappingURL=ImportFileContactsService.js.map