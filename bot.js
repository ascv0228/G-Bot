const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const { token, database } = require('./config/token.json');
const { prefix } = require('./config/config.json');
const fs = require('fs');
const path = require("path")
const { send } = require('process');
const dbUtil = require('./src/tools/db-util.js');
const scheduleUtil = require('./src/tools/schedule-util.js');

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


client.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot) return;
    const exec = client.reactions.get(reaction.message.id);
    if (exec) exec.execute(client, 'messageReactionAdd', reaction, user);
});

client.on('messageReactionRemove', async (reaction, user) => {
    if (user.bot) return;
    const exec = client.reactions.get(reaction.message.id);
    if (exec) exec.execute(client, 'messageReactionRemove', reaction, user);
});

client.on('interactionCreate', async interaction => {
    if (interaction.isSelectMenu() && interaction.customId === 'select') {
        let content = interaction.values[0];
        if (!content.startsWith(`${prefix}`)) return;
        const [cmd, ...args] = content.slice(prefix.length).trimEnd().split(/\s+/);
        let allow_user = args.pop();
        if (allow_user != 'all' && allow_user != interaction.user.id)
            return interaction.reply({ content: 'You cannot use others\' commands.', ephemeral: true });
        const exec = client.interactions.get(cmd);
        if (!exec) return;
        exec.execute(client, interaction, args);
        await interaction.message.delete();
    }
});

client.on('guildMemberAdd', member => {
    if (member.guild.id == '829673608791851038') {
        member.roles.add('986888997538246748');
    }
});


client.login(token);
