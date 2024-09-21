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
exports.remove = exports.updateConfigs = exports.update = exports.show = exports.store = exports.index = void 0;
const socket_1 = require("../libs/socket");
const CheckSettings_1 = __importDefault(require("../helpers/CheckSettings"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const CreateUserService_1 = __importDefault(require("../services/UserServices/CreateUserService"));
const ListUsersService_1 = __importDefault(require("../services/UserServices/ListUsersService"));
const UpdateUserService_1 = __importDefault(require("../services/UserServices/UpdateUserService"));
const ShowUserService_1 = __importDefault(require("../services/UserServices/ShowUserService"));
const DeleteUserService_1 = __importDefault(require("../services/UserServices/DeleteUserService"));
const UpdateUserConfigsService_1 = __importDefault(require("../services/UserServices/UpdateUserConfigsService"));
const Tenant_1 = __importDefault(require("../models/Tenant"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenantId } = req.user;
    const { searchParam, pageNumber } = req.query;
    const { users, count, hasMore } = yield (0, ListUsersService_1.default)({
        searchParam,
        pageNumber,
        tenantId
    });
    return res.json({ users, count, hasMore });
});
exports.index = index;
const getTenantMaxUsers = (tenantId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tenant = yield Tenant_1.default.findOne({ where: { id: tenantId } });
        if (!tenant) {
            throw new AppError_1.default("Tenant not found", 404);
        }
        return tenant.maxUsers;
    }
    catch (error) {
        throw new AppError_1.default("Error fetching maxUsers", 500);
    }
});
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenantId } = req.user;
    const { email, password, name, profile } = req.body;
    const { users } = yield (0, ListUsersService_1.default)({ tenantId });
    if (users.length >= Number(process.env.USER_LIMIT)) {
        throw new AppError_1.default("ERR_USER_LIMIT_USER_CREATION", 400);
    }
    const maxUsers = yield getTenantMaxUsers(String(tenantId));
    if (users.length >= maxUsers) {
        throw new AppError_1.default("ERR_USER_LIMIT_USER_CREATION", 400);
    }
    else if (req.url === "/signup" &&
        (yield (0, CheckSettings_1.default)("userCreation")) === "disabled") {
        throw new AppError_1.default("ERR_USER_CREATION_DISABLED", 403);
    }
    else if (req.url !== "/signup" && req.user.profile !== "admin") {
        throw new AppError_1.default("ERR_NO_PERMISSION", 403);
    }
    const user = yield (0, CreateUserService_1.default)({
        email,
        password,
        name,
        profile,
        tenantId
    });
    const io = (0, socket_1.getIO)();
    io.emit(`${tenantId}:user`, {
        action: "create",
        user
    });
    return res.status(200).json(user);
});
exports.store = store;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { tenantId } = req.user;
    const user = yield (0, ShowUserService_1.default)(userId, tenantId);
    return res.status(200).json(user);
});
exports.show = show;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if (req.user.profile !== "admin") {
    //   throw new AppError("ERR_NO_PERMISSION", 403);
    // }
    const { userId } = req.params;
    const userData = req.body;
    const { tenantId } = req.user;
    const user = yield (0, UpdateUserService_1.default)({ userData, userId, tenantId });
    const io = (0, socket_1.getIO)();
    io.emit(`${tenantId}:user`, {
        action: "update",
        user
    });
    return res.status(200).json(user);
});
exports.update = update;
const updateConfigs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if (req.user.profile !== "admin") {
    //   throw new AppError("ERR_NO_PERMISSION", 403);
    // }
    const { userId } = req.params;
    const userConfigs = req.body;
    const { tenantId } = req.user;
    yield (0, UpdateUserConfigsService_1.default)({ userConfigs, userId, tenantId });
    return res.status(200).json();
});
exports.updateConfigs = updateConfigs;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { tenantId } = req.user;
    const userIdRequest = req.user.id;
    if (req.user.profile !== "admin") {
        throw new AppError_1.default("ERR_NO_PERMISSION", 403);
    }
    yield (0, DeleteUserService_1.default)(userId, tenantId, userIdRequest);
    const io = (0, socket_1.getIO)();
    io.emit(`${tenantId}:user`, {
        action: "delete",
        userId
    });
    return res.status(200).json({ message: "User deleted" });
});
exports.remove = remove;
//# sourceMappingURL=UserController.js.map