import * as Discord from "discord.js";
//import {CommandStruct} from "../commandinterface";

export default class ban{
    classname = "ban";

    help(){
        return("To use the command do `.ban [user mention/id]");
    }
    theCommand(command: string){
        return command === this.classname;
    }
    async runCommand(args: string[], message: Discord.Message, client: Discord.Client){
        if(!message.member?.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"])){
            return message.reply("This command can only be used by members who have Kick and Ban premissions.");
            //return;
        }

        let banUser = message.mentions.members?.first();

        if(!banUser){
            return message.reply("Please mention a valid member. If you need help do `.help ban`");
        }

        else if (!banUser.bannable){
            return message.reply("Can't ban this user. Either they have higher premissions, or I don't have ban and kick premissions.");
        }

        else{
            let reason = args.slice(1).join(" ")
            if (!reason) {
                reason = "No reason provided";
            }
            
    
            await banUser.ban({reason})
            .catch(async error => await message.reply(`Sorry ${message.author}, I can't ban ${banUser} because of ${error}`));
            await message.reply(`${banUser} has been banned by ${message.author.tag} because: ${reason}`);
        }

    }

}