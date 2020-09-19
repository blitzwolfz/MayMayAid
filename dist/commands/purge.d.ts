import * as Discord from "discord.js";
import { CommandStruct } from "../commandinterface";
export default class purge implements CommandStruct {
    classname: string;
    help(): string;
    theCommand(command: string): boolean;
    runCommand(args: string[], message: Discord.Message, client: Discord.Client): Promise<void>;
}
