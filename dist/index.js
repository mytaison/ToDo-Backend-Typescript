"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// General way
// const express = require("express");
// using Typescript
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// Configuration
dotenv_1.default.config();
// Instantiate Express App
const app = (0, express_1.default)();
// Define Server Port
const port = process.env.PORT;
// Create a Default Route
app.get("/", (req, res) => {
    console.log(req);
    res.status(200).send("To-Do API Server built with Express & TypeScript");
});
// Start listening to the requests on the defined port
app.listen(port);
