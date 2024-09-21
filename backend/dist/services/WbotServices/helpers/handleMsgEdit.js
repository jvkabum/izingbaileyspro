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
const Message_1 = __importDefault(require("../../../models/Message"));
const handleMsgEdit = (msg, newBody) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Buscar a mensagem no banco de dados
        const editedMsg = yield Message_1.default.findOne({ where: { messageId: msg.id.id } });
        if (!editedMsg) {
            return;
        }
        // Atualizar o campo 'edited'
        yield editedMsg.update({ edited: newBody });
        // falta socket emitir pro frontend
    }
    catch (err) {
        console.error(`Erro ao manipular a edição da mensagem com ID ${msg.id.id}. Erro: ${err}`);
    }
});
exports.default = handleMsgEdit;
//# sourceMappingURL=handleMsgEdit.js.map