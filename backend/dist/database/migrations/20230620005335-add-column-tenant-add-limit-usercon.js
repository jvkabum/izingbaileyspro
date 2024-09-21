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
        const tableInfo = yield queryInterface.describeTable("Tenants");
        if (!tableInfo || !tableInfo["maxUsers"]) {
            yield queryInterface.addColumn("Tenants", "maxUsers", {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            });
        }
        if (!tableInfo || !tableInfo["maxConnections"]) {
            yield queryInterface.addColumn("Tenants", "maxConnections", {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            });
        }
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.removeColumn("Tenants", "maxUsers");
        yield queryInterface.removeColumn("Tenants", "maxConnections");
    }),
};
//# sourceMappingURL=20230620005335-add-column-tenant-add-limit-usercon.js.map