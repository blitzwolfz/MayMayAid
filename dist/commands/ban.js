"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ban {
    constructor() {
        this.classname = "ban";
    }
    help() {
        return ("To use the command do `.ban [user mention/id]");
    }
    theCommand(command) {
        return command === this.classname;
    }
    async runCommand(args, message, client) {
        var _a, _b;
        if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"]))) {
            return message.reply("This command can only be used by members who have Kick and Ban premissions.");
        }
        let banUser = (_b = message.mentions.members) === null || _b === void 0 ? void 0 : _b.first();
        if (!banUser) {
            return message.reply("Please mention a valid member. If you need help do `.help ban`");
        }
        else if (!banUser.bannable) {
            return message.reply("Can't ban this user. Either they have higher premissions, or I don't have ban and kick premissions.");
        }
        else {
            let reason = args.slice(1).join(" ");
            if (!reason) {
                reason = "No reason provided";
            }
            await banUser.ban({ reason })
                .catch(async (error) => await message.reply(`Sorry ${message.author}, I can't ban ${banUser} because of ${error}`));
            await message.reply(`${banUser} has been banned by ${message.author.tag} because: ${reason}`);
        }
    }
}
exports.default = ban;
