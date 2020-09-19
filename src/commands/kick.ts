/* import * as Discord from "discord.js";
import {CommandStruct} from "../commandinterface";

export default class kick implements CommandStruct{
    classname = "kick"

    help(){
        return("");
    }
    theCommand(command: string){
        return command === this.classname;
    }
    async runCommand(args: string[], message: Discord.Message, client: Discord.Client){
        let mentionedUser = message.mentions.users.first();
        
        //in this case args is used for logging reason, if no args are give, then it's left blank
        let reason = args.slice(1).join(" ") || "No reason provided";
        let kickLog = `${message.author.username}: ${reason}`

        if (!message.member?.hasPermission(["ADMINISTRATOR"])){
            message.channel.send(`${message.author.username} but you don't have premission to do that!`)
        }

        if(!mentionedUser){
            message.channel.send(`${message.author.username}, that user can not be found`)
        }

        message.guild?.member(mentionedUser)?.kick(reason); 
    }

} */