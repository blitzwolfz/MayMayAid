import * as Discord from "discord.js";
import {CommandStruct} from "../commandinterface";

export default class say implements CommandStruct{
    classname = "say"
    help(){
        return("Allows you to make the bot say something");
    }
    theCommand(command: string){
        return command === this.classname;
    }
    async runCommand(args: string[], message: Discord.Message, client: Discord.Client){
        let say = args.join(" ");

        try{
            await message.delete().catch();
        } catch {
            
        }
        
        
        await message.channel.send(say);        
    }

}