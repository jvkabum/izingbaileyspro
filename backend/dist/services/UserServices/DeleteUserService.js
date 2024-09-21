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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const UpdateDeletedUserOpenTicketsStatus_1 = __importDefault(require("../../helpers/UpdateDeletedUserOpenTicketsStatus"));
const DeleteUserService = (id, tenantId, userIdRequest) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({
        where: { id, tenantId }
    });
    if (!user || tenantId !== user.tenantId) {
        throw new AppError_1.default("ERR_NO_USER_FOUND", 404);
    }
    const userOpenTickets = yield user.$get("tickets", {
        where: { status: "open", tenantId }
    });
    if (userOpenTickets.length > 0) {
        (0, UpdateDeletedUserOpenTicketsStatus_1.default)(userOpenTickets, tenantId, userIdRequest);
    }
    try {
        yield user.destroy();
    }
    catch (error) {
        throw new AppError_1.default("ERROR_USER_MESSAGES_NOT_EXISTS", 404);
    }
});
exports.default = DeleteUserService;
//# sourceMappingURL=DeleteUserService.js.map