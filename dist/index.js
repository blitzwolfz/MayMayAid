"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = __importStar(require("discord.js"));
const ConfigFile = __importStar(require("./config"));
const client = new Discord.Client();
const prefix = ConfigFile.Config.prefix;
const token = ConfigFile.Config.token;
const express = require('express');
const app = express();
app.use(express.static('public'));
const http = require('http');
var _server = http.createServer(app);
app.get('/', (_request, response) => {
    response.sendFile(__dirname + "/index.html");
    console.log(Date.now() + " Ping Received");
    response.sendStatus(200);
});
const listener = app.listen(process.env.PORT, () => {
    console.log('Your app is listening on port ' + listener.address().port);
});
let commands = [];
loadCommands(`${__dirname}/commands`);
client.once("ready", () => {
    console.log("Bot is ready and has logged in");
    console.log("User prefix is ", `${[prefix]}`);
});
client.on("message", async (message) => {
    if (message.author.bot) {
        return;
    }
    if (message.mentions.roles.array().includes(message.guild.roles.cache.find(role => role.name.toLowerCase() == "MayMay Helper".toLowerCase()))) {
        let emoji = ["700689655607197746",
            "700689654906880063",
            "719841750788866060",
            "700692817789321269"];
        for (let x = 0; x < emoji.length; x++) {
            await message.react(emoji[x]);
        }
    }
    if (!message.content.startsWith(prefix)) {
        return;
    }
    await handleCommands(message);
    console.log("PENIS!");
});
async function handleCommands(message) {
    let commandNameInput = message.content.toLowerCase().split(" ")[0].replace(prefix, "");
    console.log(commandNameInput);
    let args = message.content.split(" ").splice(1);
    for (const commandsClass of commands) {
        try {
            if (commandNameInput.toLowerCase() === "help") {
                if (!commandsClass.theCommand(args[0])) {
                    console.log("2");
                }
                else {
                    message.channel.send(commandsClass.help());
                    console.log("3");
                }
            }
            else if (!commandsClass.theCommand(commandNameInput)) {
                console.log("1");
            }
            else {
                await commandsClass.runCommand(args, message, client);
                console.log("4");
            }
        }
        catch (error) {
            message.channel.send(`${error} caused the error`);
        }
    }
}
function loadCommands(commandsPath) {
    if (!ConfigFile.Config ||
        ConfigFile.Config.commands.length === 0) {
        return;
    }
    for (const commandName of ConfigFile.Config.commands) {
        const commandsClass = require(`${commandsPath}/${commandName}`).default;
        const command = new commandsClass();
        commands.push(command);
    }
}
client.login(token);
