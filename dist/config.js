"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
require("dotenv").config();
exports.Config = {
    "token": process.env.TOKEN,
    "prefix": ".",
    "commands": [
        "ping",
        "say",
    ]
};
