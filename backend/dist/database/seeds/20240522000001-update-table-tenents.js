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
module.exports = {
    up: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        // Update the maxConnections and maxUsers columns for the row with id 1 in the Tenants table
        yield queryInterface.sequelize.query(`
      UPDATE "Tenants"
      SET "maxConnections" = 99, "maxUsers" = 99
      WHERE "id" = 1;
    `);
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        // Revert the changes made in the up migration
        // (You can implement the down migration logic here if needed)
    })
};
//# sourceMappingURL=20240522000001-update-table-tenents.js.map