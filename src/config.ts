require("dotenv").config();

export let Config = {
    "token" : process.env.TOKEN,
    "prefix" : ".",
    "commands": [
        "ping",
        "say",
    ]
}