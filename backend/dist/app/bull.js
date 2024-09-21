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
const bull_board_1 = require("bull-board");
const Queue_1 = __importDefault(require("../libs/Queue"));
function bullMQ(app) {
    return __awaiter(this, void 0, void 0, function* () {
        console.info("bullMQ started");
        yield Queue_1.default.process();
        // await Queue.add("VerifyScheduleMessages", {});
        yield Queue_1.default.add("VerifyTicketsChatBotInactives", {});
        yield Queue_1.default.add("SendMessageSchenduled", {});
        if (process.env.NODE_ENV !== "production") {
            (0, bull_board_1.setQueues)(Queue_1.default.queues.map((q) => new bull_board_1.BullAdapter(q.bull)));
            app.use("/admin/queues", bull_board_1.router);
        }
    });
}
exports.default = bullMQ;
//# sourceMappingURL=bull.js.map