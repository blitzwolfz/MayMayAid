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
        var _a;
        let say = args.join(" ");
        if (((_a = message.mentions.users.first()) === null || _a === void 0 ? void 0 : _a.id) === "569374429218603019") {
            return message.reply("stfu and Yeet your vegetabales");
        }
        if (say.match(/@(everyone|here)/)) {
            for (let e = 0; e < 10; e++) {
                message.reply(`you can't do mass ping`);
            }
            return;
        }
        try {
            await message.delete().catch();
        }
        catch {
        }
        await message.channel.send(say);
    }
}
exports.default = say;
