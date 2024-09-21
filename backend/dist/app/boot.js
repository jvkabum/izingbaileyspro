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
const database_1 = __importDefault(require("./database"));
const modules_1 = __importDefault(require("./modules"));
const express_1 = __importDefault(require("./express"));
const bull_1 = __importDefault(require("./bull"));
const awaitPostgresConnection_1 = __importDefault(require("./awaitPostgresConnection"));
function bootstrap(app) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, awaitPostgresConnection_1.default)();
        yield (0, express_1.default)(app);
        yield (0, database_1.default)(app);
        yield (0, modules_1.default)(app);
        yield (0, bull_1.default)(app); // precisar subir na instancia dos bots
    });
}
exports.default = bootstrap;
//# sourceMappingURL=boot.js.map