"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminController = __importStar(require("../controllers/AdminController"));
const isAuthAdmin_1 = __importDefault(require("../middleware/isAuthAdmin"));
const adminRoutes = express_1.default.Router();
adminRoutes.get("/admin/users", isAuthAdmin_1.default, AdminController.indexUsers);
adminRoutes.put("/admin/users/:userId", isAuthAdmin_1.default, AdminController.updateUser);
adminRoutes.get("/admin/tenants", isAuthAdmin_1.default, AdminController.indexTenants);
adminRoutes.put("/admin/tenantsUpdate/:tenantId", isAuthAdmin_1.default, AdminController.updateTenant);
adminRoutes.post("/admin/tenants", isAuthAdmin_1.default, AdminController.createTenant);
adminRoutes.delete("/admin/tenants/:tenantId", isAuthAdmin_1.default, AdminController.deleteTenant);
adminRoutes.get("/admin/chatflow/:tenantId", isAuthAdmin_1.default, AdminController.indexChatFlow);
adminRoutes.put("/admin/settings/:tenantId", isAuthAdmin_1.default, AdminController.updateSettings);
adminRoutes.get("/admin/channels", isAuthAdmin_1.default, AdminController.indexChannels);
adminRoutes.post("/admin/channels", isAuthAdmin_1.default, AdminController.storeChannel);
adminRoutes.post("/admin/userTenants", isAuthAdmin_1.default, AdminController.storeUser);
exports.default = adminRoutes;
//# sourceMappingURL=adminRoutes.js.map