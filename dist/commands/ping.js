"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ping {
    constructor() {
        this.classname = "ping";
    }
    help() {
        return ("This command tells you the ping");
    }
    theCommand(command) {
        return command === this.classname;
    }
    async runCommand(args, message, client) {
        const m = await message.channel.send("🚀 pong");
        message.channel.send(m);
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);
    }
}
exports.default = ping;
