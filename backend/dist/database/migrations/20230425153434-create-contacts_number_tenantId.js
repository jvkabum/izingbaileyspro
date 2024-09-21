"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: (queryInterface) => {
        return Promise.all([
            queryInterface.sequelize.query(`
        CREATE UNIQUE INDEX Contacts_number_tenantId ON "Contacts" (number, "tenantId");
      `),
            // Outras alterações que você precisa executar na migração, se houver
        ]);
    },
    down: (queryInterface) => {
        return Promise.all([
            queryInterface.removeIndex("Contacts", "Contacts_number_tenantId"),
            // Outras alterações de rollback que você precisa executar na migração, se houver
        ]);
    }
};
//# sourceMappingURL=20230425153434-create-contacts_number_tenantId.js.map