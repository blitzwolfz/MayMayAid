import * as Discord from "discord.js";
import * as ConfigFile from "./config";
import { CommandStruct } from "./commandinterface";
const client = new Discord.Client();
const prefix = ConfigFile.Config.prefix;
const token = ConfigFile.Config.token;

const express = require('express');
const app = express();
app.use(express.static('public'));
const http = require('http');
//@ts-ignore
var _server = http.createServer(app);


app.get('/', (_request: any, response: any) => {
  response.sendFile(__dirname + "/index.html");
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});


const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

let commands: CommandStruct[] = [];

//dirname in this case is set to ..\src\
//dirname tells you the directory of the commands
loadCommands(`${__dirname}/commands`);

//If everything procceds as normal, this message should appear
client.once("ready", () => {
  console.log("Bot is ready and has logged in");
  console.log("User prefix is ", `${[prefix]}`);
});

//holds the bulk of of our commands
client.on("message", async (message: Discord.Message) => {
  if (message.author.bot) {
    return;
  }

  if(message.mentions.roles.array().includes(message.guild!.roles.cache.find(role => role.name.toLowerCase() == "MayMay Helper".toLowerCase())!)){
    // let emoji = ["<:upvote: 700689655607197746>", 
    // "<:downvote: 700689654906880063>", 
    // "<:yes: 719841750788866060>",
    // "<:pepesquint: 700692817789321269>"]

    let emoji = ["700689655607197746", 
    "700689654906880063", 
    "719841750788866060",
    "700692817789321269"]

    for (let x = 0; x < emoji.length; x++){
      await message.react(emoji[x])
    }
  }

  if (!message.content.startsWith(prefix)) {
    return;
  }

  await handleCommands(message);
  console.log("PENIS!");
});

//might change the argument to a args para.. but for now it stays as is
async function handleCommands(message: Discord.Message) {
  //removes prefix as we don't need that
  let commandNameInput = message.content.toLowerCase().split(" ")[0].replace(prefix, "");
  console.log(commandNameInput)

  //removes command name, as we will use args to run our commands
  let args = message.content.split(" ").splice(1);

  for (const commandsClass of commands) {
    //don't want the bot to crash on the users lmao
    try {
      
      //checks to see if the it is a help request
      if(commandNameInput.toLowerCase() === "help"){
        if(!commandsClass.theCommand(args[0])){
          console.log("2");
          //continue;
        }
        else{
          message.channel.send(commandsClass.help());
          console.log("3");
        }
      }
      
      //checking to see if this is the correct command
      else if (!commandsClass.theCommand(commandNameInput)) {
        //continue the loop until correct command is found
        console.log("1");
        //continue;
      }
      
      else {
          await commandsClass.runCommand(args, message, client);
          console.log("4");
      }
    } catch (error) {
      message.channel.send(`${error} caused the error`);
    }
  }
}

function loadCommands(commandsPath: string) {
  //commandName takes the name of commands found in config.ts
  //commandsClass takes the directory of the commandName
  //command is the command itself
  //commands is a list that holds all the commands

  //If there are no commands in the config file then exit
  if (
    !ConfigFile.Config ||
    (ConfigFile.Config.commands as string[]).length === 0
  ) {
    return;
  }

  //loop through config to find all the commands
  for (const commandName of ConfigFile.Config.commands as string[]) {
    const commandsClass = require(`${commandsPath}/${commandName}`).default;

    const command = new commandsClass() as CommandStruct;

    commands.push(command);
  }
}

client.login(token);
