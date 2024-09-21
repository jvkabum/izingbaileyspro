"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return Promise.all([
            queryInterface.addColumn("Messages", "edited", {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
                defaultValue: null
            })
        ]);
    },
    down: (queryInterface) => {
        return Promise.all([queryInterface.removeColumn("Messages", "edited")]);
    }
};
//# sourceMappingURL=20240519000001-add-colum-edited-table-messages.js.map