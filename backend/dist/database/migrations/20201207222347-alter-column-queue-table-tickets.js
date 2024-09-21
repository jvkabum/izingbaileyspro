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
        yield queryInterface.removeColumn("Tickets", "queue");
        yield queryInterface.addColumn("Tickets", "queue", {
            type: sequelize_1.DataTypes.INTEGER,
            references: { model: "Queues", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "restrict",
            defaultValue: null,
            allowNull: true
        });
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.removeColumn("Tickets", "queue");
        yield queryInterface.addColumn("Tickets", "queue", {
            type: sequelize_1.DataTypes.INTEGER,
            // references: { model: "ServiceQueue", key: "id" },
            // onUpdate: "CASCADE",
            // onDelete: "CASCADE",
            defaultValue: null,
            allowNull: true
        });
    })
};
//# sourceMappingURL=20201207222347-alter-column-queue-table-tickets.js.map