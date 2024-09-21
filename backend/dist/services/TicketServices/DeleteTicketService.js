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
const AppError_1 = __importDefault(require("../../errors/AppError"));
const ShowTicketService_1 = __importDefault(require("./ShowTicketService"));
const CreateLogTicketService_1 = __importDefault(require("./CreateLogTicketService"));
const DeleteTicketService = ({ id, tenantId, userId }) => __awaiter(void 0, void 0, void 0, function* () {
    const ticket = yield (0, ShowTicketService_1.default)({ id, tenantId });
    if (!ticket) {
        throw new AppError_1.default("ERR_NO_TICKET_FOUND", 404);
    }
    // await ticket.destroy();
    yield (0, CreateLogTicketService_1.default)({
        userId,
        ticketId: ticket.id,
        type: "delete"
    });
    return ticket;
});
exports.default = DeleteTicketService;
//# sourceMappingURL=DeleteTicketService.js.map