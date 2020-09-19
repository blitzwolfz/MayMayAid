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

        if(message.mentions.users.first()?.id === "569374429218603019"){
            return message.reply("stfu and Yeet your vegetabales")
        }


        if (say.match(/@(everyone|here)/)){
            for(let e = 0; e < 10; e++){
                message.reply(`you can't do mass ping`)
            }

            return;
        }

        try{
            await message.delete().catch();
        } catch {
            
        }
        
        
        await message.channel.send(say);        
    }

}