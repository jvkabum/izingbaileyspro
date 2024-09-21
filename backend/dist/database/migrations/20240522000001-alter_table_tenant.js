"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn("Tenants", "maxConnections", {
                type: Sequelize.INTEGER,
                allowNull: false,
            }),
            queryInterface.changeColumn("Tenants", "maxUsers", {
                type: Sequelize.INTEGER,
                allowNull: false,
            }),
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn("Tenants", "maxConnections", {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
            queryInterface.changeColumn("Tenants", "maxUsers", {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
        ]);
    },
};
//# sourceMappingURL=20240522000001-alter_table_tenant.js.map