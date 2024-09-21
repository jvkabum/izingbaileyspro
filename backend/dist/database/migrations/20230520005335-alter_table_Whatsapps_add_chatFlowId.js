"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.addColumn("Whatsapps", "chatFlowId", {
            type: sequelize_1.DataTypes.INTEGER,
            references: { model: "ChatFlow", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
            allowNull: true,
            defaultValue: null
        });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn("Whatsapps", "chatFlowId");
    }
};
//# sourceMappingURL=20230520005335-alter_table_Whatsapps_add_chatFlowId.js.map