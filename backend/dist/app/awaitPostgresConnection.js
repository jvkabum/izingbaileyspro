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
const child_process_1 = require("child_process");
const util_1 = require("util");
const sequelize_1 = require("sequelize");
const logger_1 = require("../utils/logger");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
// eslint-disable-next-line
const dbConfig = require("../config/database");
// Função para aguardar a conexão com o PostgreSQL
const waitForPostgresConnection = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const sequelize = new sequelize_1.Sequelize(dbConfig);
        while (true) {
            try {
                // eslint-disable-next-line no-await-in-loop
                yield sequelize.authenticate();
                logger_1.logger.info("Conexão com o PostgreSQL estabelecida com sucesso!");
                if (process.env.NODE_ENV === "production") {
                    logger_1.logger.info("Iniciando a execução das migrations...");
                    // eslint-disable-next-line no-await-in-loop
                    const { stdout, stderr } = yield execAsync("npm run copy-templates-files && npx sequelize db:migrate");
                    logger_1.logger.info(`Saída do comando: ${stdout}`);
                    if (stderr) {
                        logger_1.logger.error(`Erro ao executar o comando: ${stderr}`);
                        throw new Error(`Erro ao executar o comando: ${stderr}`);
                    }
                    logger_1.logger.info("Migrations executadas com sucesso!");
                }
                break;
            }
            catch (error) {
                logger_1.logger.info("Falha ao conectar ao PostgreSQL. Tentando novamente em 5 segundos...");
                // eslint-disable-next-line no-await-in-loop
                yield new Promise(resolve => setTimeout(resolve, 5000));
            }
        }
    });
};
exports.default = waitForPostgresConnection;
//# sourceMappingURL=awaitPostgresConnection.js.map