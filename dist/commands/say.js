"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class say {
    constructor() {
        this.classname = "say";
    }
    help() {
        return ("Allows you to make the bot say something");
    }
    theCommand(command) {
        return command === this.classname;
    }
    async runCommand(args, message, client) {
        let say = args.join(" ");
        try {
            await message.delete().catch();
        }
        catch {
        }
        await message.channel.send(say);
    }
}
exports.default = say;
