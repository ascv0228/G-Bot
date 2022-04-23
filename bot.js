const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const { token, database } = require('./config/token.json');
const { prefix } = require('./config/config.json');
const { send } = require('process');
const dbUtil = require('./src/tools/db-util.js');
const rewardUtil = require('./src/tools/reward-util.js');
const tools = require('./src/tools/tools.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

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
* 5.  分檔
*/

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.musicDict = new Map();

client.loadCommands = tools.loadCommands;

client.on('ready', () => {
    client.user.setActivity(`GG的大GG`, { type: "PLAYING" });
    console.log(`Logged in as ${client.user.tag}!`);

    dbUtil.loadMongodb(client);
    rewardUtil.everyScheduleJob(client);

    //const dirPath = [`./src/commands`, `./src/music`];
    client.loadCommands();
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
    const lines = msg.content.trim().split("\n");
    for (let i = 0; i < lines.length; ++i) {
        if (!msg.content.startsWith(`${prefix}`)) return;
        const [cmd, ...args] = lines[i].slice(prefix.length).trimEnd().split(/\s+/);
        const exec = client.commands.get(cmd) || client.aliases.get(cmd);
        if (!exec) continue;
        exec.execute(client, msg, args);
    }


});

async function AdminFunction(msg) {
    if (msg.content.startsWith(`${prefix}getday`)) {
        var d = new Date();
        d.setDate(d.getDate() - 1);
        //msg.channel.send(`${d.getHours()}、${d}`)
    }
}

client.login(token);
