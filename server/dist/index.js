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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT || 8080;
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.json({
        thing: true
    });
});
// CREATE A WORKSPACE(params : name)
app.post('/workspaces/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    // invalid data
    if (!name)
        res.status(400);
    try {
        yield prisma.workspace.create({
            data: {
                name,
            }
        });
        res.json({
            success: true
        });
    }
    catch (error) {
        // console.log(error);
        res.status(400).json({
            success: false
        });
    }
}));
// GET ALL WORKSPACES
app.get('/workspaces/getall', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const workspaces = yield prisma.workspace.findMany();
    res.json({
        workspaces
    });
}));
// CREATE A TODO IN A WORKSPACE(params: wid + payload)
app.post('/todo/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { wid, name, startDate, endDate, status } = req.body;
    try {
        yield prisma.todo.create({
            data: {
                wid,
                name,
                startDate,
                endDate,
                status,
            }
        });
        res.json({
            success: true
        });
    }
    catch (error) {
        res.status(400).json({
            success: false
        });
    }
}));
// GET ALL TODOS FOR A SPECIFIC WORKSPACE
app.get('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.headers;
    if (!id) {
        res.status(400).send('bad request');
    }
    try {
        const data = yield prisma.workspace.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                todos: true
            }
        });
        res.json({
            todos: data === null || data === void 0 ? void 0 : data.todos
        });
    }
    catch (error) {
        res.status(400).json({
            success: false
        });
    }
}));
app.listen(PORT, () => {
    console.log(`listening at:\nhttp://localhost:${PORT}`);
});
