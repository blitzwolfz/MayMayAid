"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class purge {
    constructor() {
        this.classname = "purge";
    }
    help() {
        return ("(Admin only) deletes messages upto specified length `.purge [length]`");
    }
    theCommand(command) {
        return command === this.classname;
    }
    async runCommand(args, message, client) {
        var _a;
        if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.hasPermission(["MANAGE_MESSAGES"]))) {
            message.channel.send(`${message.author.username} you do not have the premissions`);
        }
        let deleteCount = parseInt(args[0], 10) + 1;
        if (!deleteCount || deleteCount < 1 || deleteCount > 100) {
            message.channel.send(`${message.author.username} you must choose a number between 1 to 100`);
        }
        if (message.channel.type === "dm") {
            message.channel.send(`${message.author.username} this command is not allowed here`);
        }
        else {
            message.channel.bulkDelete(deleteCount);
        }
    }
}
exports.default = purge;
