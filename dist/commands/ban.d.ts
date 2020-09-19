import * as Discord from "discord.js";
export default class ban {
    classname: string;
    help(): string;
    theCommand(command: string): boolean;
    runCommand(args: string[], message: Discord.Message, client: Discord.Client): Promise<Discord.Message | undefined>;
}
