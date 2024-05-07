"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const bookRoutes_1 = __importDefault(require("./src/routes/bookRoutes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 3000;
// const MONGO_URI:any = process.env.MONGO_URI ; 
const MONGO_URI = "mongodb+srv://jmadhavi156:joshi123@cluster0.qrvji3e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose_1.default.connect(MONGO_URI)
    .then(() => {
    console.log('db connected');
})
    .catch((err) => {
    console.error('Failed to connect to the database:', err);
});
app.use('book', bookRoutes_1.default);
app.listen(port, () => {
    console.log(`server started on port : ${port}`);
});
