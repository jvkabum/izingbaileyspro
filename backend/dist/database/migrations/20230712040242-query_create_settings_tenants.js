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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        // Obtém a lista de tenants existentes no banco de dados
        const tenants = yield queryInterface.sequelize.query('SELECT id FROM "Tenants"', { type: sequelize_1.QueryTypes.SELECT });
        const settingId = yield queryInterface.sequelize.query('select max(id) mId from "Settings"', { type: sequelize_1.QueryTypes.SELECT });
        // Loop pelos tenants e insere as novas configurações para cada um
        yield Promise.all(tenants.map((tenant, idx) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = tenant;
            const newSettings = [
                {
                    key: "newTicketTransference",
                    value: "disabled",
                    tenantId: id,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    key: "rejectCalls",
                    value: "disabled",
                    tenantId: id,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    key: "callRejectMessage",
                    value: "As chamadas de voz e vídeo estão desabilitas para esse WhatsApp, favor enviar uma mensagem de texto.",
                    tenantId: id,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ];
            const bulk = newSettings.map((s, i) => {
                return Object.assign(Object.assign({}, s), { id: settingId[0].mid + idx + 1 + i });
            });
            // Insere as novas configurações para o tenant
            yield queryInterface.bulkInsert("Settings", bulk);
        })));
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        // Remove as configurações inseridas para cada tenant
        yield queryInterface.sequelize.query('SELECT id FROM "Tenants"', {
            type: sequelize_1.QueryTypes.SELECT
        });
    })
};
//# sourceMappingURL=20230712040242-query_create_settings_tenants.js.map