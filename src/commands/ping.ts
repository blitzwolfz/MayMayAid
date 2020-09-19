import * as Discord from "discord.js";
import {CommandStruct} from "../commandinterface";

//client.ping doesn't exist, if problem is solved later on, attach to the end of the command
//API Latency is ${Math.round(client.ping)}ms

export default class ping implements CommandStruct{
    classname = "ping"
    help(){
        return( "This command tells you the ping");
    }
    theCommand(command: string){
        return command === this.classname;
    }
    async runCommand(args: string[], message: Discord.Message, client: Discord.Client){
        const m = await message.channel.send("🚀 pong");
        message.channel.send(m)
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);
    }

}