"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.addColumn("Campaigns", "delay", {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 20
        });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn("Campaigns", "delay");
    }
};
//# sourceMappingURL=20230711161553-alter_table_campaign_add_delay.js.map