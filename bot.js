const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const { token, database } = require('./config/token.json');
const { prefix } = require('./config/config.json');
const fs = require('fs');
const path = require("path")
const { send } = require('process');
const dbUtil = require('./src/tools/db-util.js');
const rewardUtil = require('./src/tools/reward-util.js');
const tools = require('./src/tools/tools.js');
const big = require('./src/noPrefix/big.js');
const small = require('./src/noPrefix/small.js');
const bluebuff = require('./src/noPrefix/bluebuff.js');

const client = new Client(
    {
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
        partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    });


process.on('uncaughtException', (err, origin) => {
    console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error(reason);
});

/*
* 1.  獎勵 0:00 再發  > OK
* 2.  檢查 有記錄區 才能丟 每日  > BUG
* 3.  分批清空資料庫指令 > half OK
* 4.  img-hash bug  > maybe no bug
* 5.  分檔  > OK
*/

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.musicDict = new Map();

function loadCommands(dirPath) {
    // const dirPath = `./src/commands`;
    // const dirPath = [`./src/commands`, `./src/music`];

    return tools.readDirAll(dirPath, (file) => {
        if (file.match(/(\.js|\.ts)$/)) {
            const command = require(file);
            if (command.aliases) {
                command.aliases.forEach(alias => {
                    this.aliases.set(alias, command);
                });
            }

            if (command.name) {
                if (command.listens && command.listens.length > 0) {
                    this.listens.set(command.name, command);
                } else {
                    this.commands.set(command.name, command);
                }
            }
        }
    });
}

client.loadCommands = loadCommands;

client.on('ready', () => {
    client.user.setActivity(`GG的大GG`, { type: "PLAYING" });
    console.log(`Logged in as ${client.user.tag}!`);

    dbUtil.loadMongodb(client);
    rewardUtil.everyScheduleJob(client);

    const dirPath = [`./src/commands`, `./src/music`];
    client.loadCommands(dirPath[0]);
    //client.loadCommands();
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
    /*
        if (msg.member.roles.cache.has('863405200562454548') && msg.author.id == '411895879935590411') {
            console.log('GG')
        }*/
    if (msg.content.includes('@佬') || msg.content.includes('<@&948118013293494303>')) {
        big.execute(client, msg);
    }
    if (msg.content.includes('@小萌新') || msg.content.includes('<@&938748850112430091>')) {
        small.execute(client, msg);
    }
    if (msg.content.includes('@傳說') || msg.content.includes('@偷抓對面藍buff') || msg.content.includes('<@&931946175827959819>')) {
        bluebuff.execute(client, msg);
    }
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
    '978841912859557888': "978841314546315284", //元氣騎士
    '978848399602368512': "931946175827959819", //藍BUFF
    '978848407714168872': "938768045646700594", //日麻
    '978842912773275688': "968413297491738635", //打瓦
    '978842918141964369': "973560687567720488", //PUBG
    '977362245510115388': "977361812343369768", //APEX m
    '978848908165926952': "967797624621109248", //LOL
    // : "867718549723152404", //失去理智
    '978848404920733706': "960013742777704490", //人偶
    '978848402299318292': "853647561024864266" //決勝
}

client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.message.id != '978854245174493245') return;
    // const member = reaction.message.guild.members.cache.get(user.id);
    client.channels.cache.get('863086136180342804').send({ content: '有' })
    client.channels.cache.get('863086136180342804').send({ content: `${reaction.emoji.name}` });
    // const emoji = '✅'
    // if (reaction.emoji.name != emoji) return;
    // member.roles.add(client.memberRoles[reaction.message.id])
});
// 978854245174493245
client.on('messageReactionRemove', (reaction, user) => {
    if (reaction.message.id != '978854245174493245') return;
    const member = reaction.message.guild.members.cache.get(user.id);
    // const emoji = '✅'
    client.channels.cache.get('863086136180342804').send({ content: reaction.emoji.name });
    // if (reaction.emoji.name != emoji) return;
    // member.roles.remove(client.memberRoles[reaction.message.id])
});
// 863086136180342804
client.login(token);
