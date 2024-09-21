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
const LogTicket_1 = __importDefault(require("../../models/LogTicket"));
const User_1 = __importDefault(require("../../models/User"));
const Queue_1 = __importDefault(require("../../models/Queue"));
const ShowLogTicketService = ({ ticketId }) => __awaiter(void 0, void 0, void 0, function* () {
    const logs = yield LogTicket_1.default.findAll({
        where: {
            ticketId
        },
        include: [
            {
                model: User_1.default,
                as: "user",
                attributes: ["id", "name"]
            },
            {
                model: Queue_1.default,
                as: "queue",
                attributes: ["id", "queue"]
            }
        ],
        order: [["createdAt", "DESC"]]
    });
    return logs;
});
exports.default = ShowLogTicketService;
//# sourceMappingURL=ShowLogTicketService.js.map