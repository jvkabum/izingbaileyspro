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
        try {
            yield queryInterface.addColumn("Whatsapps", "farewellMessage", {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
                defaultValue: null
            });
        }
        catch (error) {
            console.error("Não foi possível adicionar coluna farewellMessage. Verifique se ela está presente no banco. ", error);
        }
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield queryInterface.removeColumn("Whatsapps", "farewellMessage");
        }
        catch (error) {
            console.error("Não foi deletar coluna farewellMessage. Verifique se ela está presente no banco. ", error);
        }
    })
};
//# sourceMappingURL=20230427013742-alter_table_whatsapps_add_farewellMessage.js.map