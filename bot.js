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
client.musicDict = new Map();
client.command_member_role = new Map();
client.command_member_role_time = new Map();
// client.dispatcher = new Discord.Collection();

client.loadCommands = loader.loadCommands;
client.loadInteractions = loader.loadInteractions;
client.loadNoPerfixs = loader.loadNoPerfixs;
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

    const dirPath = [`./src/commands`, `./src/music`, `./src/interactions`, `./src/noPrefix`];
    client.loadCommands(dirPath[0]);
    // client.loadCommands(dirPath[1]);
    client.loadInteractions(dirPath[2]);
    client.loadNoPerfixs(dirPath[3]);
    client.noPerfixs_keys = [...client.noPerfixs.keys()];

    scheduleUtil.everydayScheduleJob(client);
    scheduleUtil.ScheduleJob_RemoveNewMemberRole(client)
});


client.catOpen = false;
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


client.memberRoles = {
    '0️⃣': "853647561024864266", //決勝
    '1️⃣': "931946175827959819", //藍BUFF
    '2️⃣': "977361812343369768", //APEX m
    '3️⃣': "968413297491738635", //打瓦
    '4️⃣': "973560687567720488", //PUBG
    '5️⃣': "938768045646700594", //日麻
    '6️⃣': "967797624621109248", //LOL
    '7️⃣': "960013742777704490", //人偶
    '8️⃣': "978841314546315284", //元氣騎士
    '9️⃣': '983103203744813076', //原神
    '🔟': '989534277056204820', //音遊
    /*
    9️⃣
    🔟*/
}

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.id == '978852872177471518') {
        const member = reaction.message.guild.members.cache.get(user.id);
        if (member.user.bot) return;
        if (!(reaction.emoji.name in client.memberRoles)) return;
        member.roles.add(client.memberRoles[reaction.emoji.name])
    }
    if (reaction.message.id == '988964977224318986') {
        if (reaction.emoji.name != '✅') return;
        let EW_guild = await client.guilds.cache.get('856793573194465300');
        const member = await EW_guild.members.fetch({ user: user.id });
        // console.log(member)
        member.roles.add('987326459402145852');
    }
    if (client.command_member_role.has(reaction.message.id)) {
        const member = reaction.message.guild.members.cache.get(user.id);
        if (member.user.bot) return;
        if (reaction.emoji.name != '✅') return;
        member.roles.add(client.command_member_role.get(reaction.message.id));
    }
});

client.on('messageReactionRemove', async (reaction, user) => {
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
    if (reaction.message.id == '988964977224318986') {
        if (reaction.emoji.name != '✅') return;
        let EW_guild = await client.guilds.cache.get('856793573194465300');
        const member = await EW_guild.members.fetch({ user: user.id });
        // console.log(member)
        member.roles.remove('987326459402145852');
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

client.login(token);
