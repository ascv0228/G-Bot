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
const tools = require('./src/tools/tools.js');
const big = require('./src/noPrefix/big.js');
const small = require('./src/noPrefix/small.js');
const bluebuff = require('./src/noPrefix/bluebuff.js');
const loader = require('./src/loader.js');

const client = new Client(
    {
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
        partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
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
client.interactions = new Discord.Collection();
client.musicDict = new Map();
client.command_member_role = new Map();
client.command_member_role_time = new Map();


client.loadCommands = loader.loadCommands;
client.loadInteractions = loader.loadInteractions;

client.on('ready', () => {
    client.user.setActivity(`GG的大GG`, { type: "PLAYING" });
    console.log(`Logged in as ${client.user.tag}!`);

    dbUtil.loadMongodb(client).then(() => {
        scheduleUtil.everydayScheduleJob_ActivityCommand(client);
    });

    const dirPath = [`./src/commands`, `./src/music`, `./src/interactions`];
    client.loadCommands(dirPath[0]);
    client.loadInteractions(dirPath[2])

    scheduleUtil.everydayScheduleJob(client);
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
    if (msg.content.includes('@佬') || msg.content.includes('<@&948118013293494303>')) {
        big.execute(client, msg);
    }
    if (msg.content.includes('@小萌新') || msg.content.includes('<@&938748850112430091>')) {
        small.execute(client, msg);
    }/*
    if (msg.content.includes('@傳說') || msg.content.includes('@偷抓對面藍buff') || msg.content.includes('<@&931946175827959819>')) {
        bluebuff.execute(client, msg);
    }*/
    const lines = msg.content.trim().split("\n");
    for (let i = 0; i < lines.length; ++i) {
        if (!msg.content.startsWith(`${prefix}`)) return;
        const [cmd, ...args] = lines[i].slice(prefix.length).trimEnd().split(/\s+/);
        const exec = client.commands.get(cmd) || client.aliases.get(cmd);
        if (!exec) continue;
        // if(exec.channel && exec.channel.includes)
        exec.execute(client, msg, args);
    }
});


client.memberRoles = {
    '0️⃣': "853647561024864266", //決勝
    '1️⃣': "931946175827959819", //藍BUFF
    '2️⃣': "977361812343369768", //APEX m
    '3️⃣': "968413297491738635", //打瓦
    '4️⃣': "973560687567720488", //PUBG
    '5️⃣': "938768045646700594", //日麻
    '6️⃣': "967797624621109248", //LOL
    '7️⃣': "960013742777704490", //人偶
    '8️⃣': "978841314546315284" //元氣騎士
    /*
    9️⃣
    🔟*/
}

client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.message.id == '978852872177471518') {
        const member = reaction.message.guild.members.cache.get(user.id);
        if (member.user.bot) return;
        if (!(reaction.emoji.name in client.memberRoles)) return;
        member.roles.add(client.memberRoles[reaction.emoji.name])
    }
    if (client.command_member_role.has(reaction.message.id)) {
        const member = reaction.message.guild.members.cache.get(user.id);
        if (member.user.bot) return;
        if (reaction.emoji.name != '✅') return;
        member.roles.add(client.command_member_role.get(reaction.message.id));
    }
});

client.on('messageReactionRemove', (reaction, user) => {
    if (reaction.message.id == '978852872177471518') {
        const member = reaction.message.guild.members.cache.get(user.id);
        if (member.user.bot) return;
        if (!(reaction.emoji.name in client.memberRoles)) return;
        member.roles.remove(client.memberRoles[reaction.emoji.name]);
    }
    if (client.command_member_role.has(reaction.message.id)) {
        const member = reaction.message.guild.members.cache.get(user.id);
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
        if (args.pop() != interaction.user.id)
            return interaction.reply({ content: 'You cannot use others\' commands.', ephemeral: true });
        const exec = client.interactions.get(cmd);
        if (!exec) return;
        exec.execute(client, interaction, args);
        await interaction.message.delete();
    }
});



client.login(token);
