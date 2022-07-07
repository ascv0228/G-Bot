const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const { token, database } = require('./config/token.json');

const client = new Client(
    {
        // https://discord.js.org/#/docs/main/stable/class/Intents?scrollTo=s-FLAGS
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES],

        // https://discord.js.org/#/docs/main/stable/typedef/PartialType
        partials: ['USER', 'GUILD_MEMBER', 'REACTION', 'MESSAGE', 'CHANNEL'],
    }
);


process.on('uncaughtException', (err, origin) => {
    console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error(reason);
});

module.exports = client;


require("./src/events/ready.js")
require("./src/events/messageCreate.js")
require("./src/events/messageUpdate.js")
require("./src/events/messageReactionAdd.js")
require("./src/events/messageReactionRemove.js")
require("./src/events/interactionCreate.js")
require("./src/events/guildMemberAdd.js")


client.login(token);
