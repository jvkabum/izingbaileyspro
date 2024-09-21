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
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../database"));
const ListContactsService = ({ searchParam = "", pageNumber = "1", tenantId, profile, userId }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const limit = 40;
    const offset = limit * (+pageNumber - 1);
    const where = `
    "Contact"."tenantId" = ${tenantId}
    and (LOWER("Contact"."name") like '%${searchParam.toLowerCase().trim()}%'
        or "Contact"."number" like '%${searchParam.toLowerCase().trim()}%')
    and (('${profile}' = 'admin') or (("cw"."walletId" = ${userId}) or ("cw"."walletId" is null)))
  `;
    const queryCount = `
    select count(*)
    from "Contacts" as "Contact"
    left join "ContactWallets" cw on cw."contactId" = "Contact".id
    where ${where}
  `;
    const query = `
    select
      distinct
      "Contact"."id",
      "Contact"."name",
      "Contact"."number",
      "Contact"."email",
      "Contact"."profilePicUrl",
      "Contact"."pushname",
      "Contact"."telegramId",
      "Contact"."messengerId",
      "Contact"."instagramPK",
      "Contact"."isUser",
      "Contact"."isWAContact",
      "Contact"."isGroup",
      "Contact"."tenantId",
      "Contact"."createdAt",
      "Contact"."updatedAt",
      "cw"."walletId",
      "u"."name" as "wallet"
    from
      "Contacts" as "Contact"
    left join "ContactWallets" cw on cw."contactId" = "Contact".id
    left join "Users" u on cw."walletId" = u."id"
    where ${where}
    order by "Contact"."name" asc
    limit ${limit} offset ${offset}
  `;
    const contacts = yield database_1.default.query(query, {
        type: sequelize_1.QueryTypes.SELECT
    });
    const data = yield database_1.default.query(queryCount, {
        type: sequelize_1.QueryTypes.SELECT
    });
    const count = (data && ((_a = data[0]) === null || _a === void 0 ? void 0 : _a.count)) || 0;
    const hasMore = count > offset + contacts.length;
    return {
        contacts,
        count,
        hasMore
    };
});
exports.default = ListContactsService;
//# sourceMappingURL=ListContactsService.js.map