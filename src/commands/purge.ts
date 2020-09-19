import * as Discord from "discord.js";
import {CommandStruct} from "../commandinterface";

export default class purge implements CommandStruct{
    classname = "purge"
    help(){
        return("(Admin only) deletes messages upto specified length `.purge [length]`");
    }
    theCommand(command: string){
        return command === this.classname;
    }
    async runCommand(args: string[], message: Discord.Message, client: Discord.Client){
        //let chnnle = message.channel
        if(!message.member?.hasPermission(["MANAGE_MESSAGES"])){
            message.channel.send(`${message.author.username} you do not have the premissions`)
        }

        let deleteCount = parseInt(args[0], 10) + 1;

        if(!deleteCount || deleteCount < 1 || deleteCount > 100){
            message.channel.send(`${message.author.username} you must choose a number between 1 to 100`)
        }
        if (message.channel.type === "dm"){
            message.channel.send(`${message.author.username} this command is not allowed here`)
        }
        else{
            message.channel.bulkDelete(deleteCount)
            
        }
        
    }

}