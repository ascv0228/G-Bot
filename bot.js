const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const { token, database } = require('./config/token.json');
const { prefix } = require('./config/config.json');
const fs = require('fs');
const path = require("path")
const { send } = require('process');
const dbUtil = require('./src/tools/db-util.js');
const rewardUtil = require('./src/tools/reward-util.js');
const scheduleUtil = require('./src/tools/schedule-util.js');

const loader = require('./src/loader.js');
const dcUtil = require('./src/tools/dc-util');
const client = new Client(
    {
        // https://discord.js.org/#/docs/main/stable/class/Intents?scrollTo=s-FLAGS
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS],

        // https://discord.js.org/#/docs/main/stable/typedef/PartialType
        partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER'],
    }
);


process.on('uncaughtException', (err, origin) => {
    console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error(reason);
});


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.listens = new Discord.Collection();
client.noPerfixs = new Discord.Collection();
client.interactions = new Discord.Collection();
client.reactions = new Discord.Collection();
client.musicDict = new Map();
client.command_member_role = new Map();
client.command_member_role_time = new Map();
// client.dispatcher = new Discord.Collection();

client.loadCommands = loader.loadCommands;
client.loadInteractions = loader.loadInteractions;
client.loadNoPerfixs = loader.loadNoPerfixs;
client.loadReactions = loader.loadReactions;
client.allDiscordServer = new Map();
client.allowServer = new Array('790338603141431336', '829673608791851038',
    '864925734581043280', '901498054077714462', '964526913861341254', '856793573194465300');
client.on('ready', () => {
    client.user.setActivity(`GG的大GG`, { type: "PLAYING" });
    console.log(`Logged in as ${client.user.tag}!`);
    const Guilds = client.guilds.cache.map(guild => new Array(guild.id, guild.name));
    console.log(Guilds);

    dbUtil.loadMongodb(client).then(() => {
        scheduleUtil.everydayScheduleJob_ActivityCommand(client);
    });

    const dirPath = [`./src/commands`, `./src/music`, `./src/interactions`, `./src/noPrefix`, `./src/reactions`];
    client.loadCommands(dirPath[0]);
    // client.loadCommands(dirPath[1]);
    client.loadInteractions(dirPath[2]);
    client.loadNoPerfixs(dirPath[3]);
    client.noPerfixs_keys = [...client.noPerfixs.keys()];
    client.loadReactions(dirPath[4])

    scheduleUtil.everydayScheduleJob(client);
    scheduleUtil.ScheduleJob_RemoveNewMemberRole(client)
    initCatopen(client);
});



client.on('messageCreate', msg => {
    try {
        if (!msg.guild || !msg.member) return;
        if (!msg.member.user) return;
        if (msg.member.user.bot) return;
    } catch (err) {
        return;
    }
    rewardUtil.confirmReward(client, msg);

    const lines = msg.content.trim().split("\n");
    for (let i = 0; i < lines.length; ++i) {
        if (!lines[i].startsWith(`${prefix}`)) {
            const found = client.noPerfixs_keys.find(v => lines[i].includes(v));
            if (!found) continue;
            const exec = client.noPerfixs.get(found);
            exec.execute(client, msg);
            continue;
        }
        const [cmd, ...args] = lines[i].slice(prefix.length).trimEnd().split(/\s+/);
        const exec = client.commands.get(cmd) || client.aliases.get(cmd);
        if (!exec) continue;
        // if(exec.channel && exec.channel.includes)
        exec.execute(client, msg, args);
    }
});


client.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot) return;
    const exec = client.reactions.get(reaction.message.id);
    if (exec) exec.execute(client, 'messageReactionAdd', reaction, user);

    if (client.command_member_role.has(reaction.message.id)) {
        const member = await dcUtil.getMemberByID(EW_guild, user.id);
        if (member.user.bot) return;
        if (reaction.emoji.name != '✅') return;
        member.roles.add(client.command_member_role.get(reaction.message.id));
    }
});

client.on('messageReactionRemove', async (reaction, user) => {
    if (user.bot) return;
    const exec = client.reactions.get(reaction.message.id);
    if (exec) exec.execute(client, 'messageReactionRemove', reaction, user);

    if (client.command_member_role.has(reaction.message.id)) {
        const member = await dcUtil.getMemberByID(EW_guild, user.id);
        if (member.user.bot) return;
        if (reaction.emoji.name != '✅') return;
        member.roles.remove(client.command_member_role.get(reaction.message.id));
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return;
    if (interaction.customId === 'select') {
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

async function initCatopen(client) {
    let channelID = '991256310563733564'
    let msg_id = '991257219356168242'
    let channel = await client.channels.fetch(channelID)
    let message = await channel.messages.fetch(msg_id);
    client.catOpen = message.content.includes('開') ? true : false

}

client.login(token);
