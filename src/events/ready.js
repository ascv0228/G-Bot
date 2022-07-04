const Discord = require('discord.js');
const client = require("../../bot.js");
const loader = require('../loader.js');
const dbUtil = require('../tools/db-util');
const scheduleUtil = require('../tools/schedule-util.js');

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
    client.Guilds = client.guilds.cache.map(guild => new Array(guild.id, guild.name));
    console.log(client.Guilds);

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

async function initCatopen(client) {
    client.useCommandChannel = await client.channels.fetch('992063045167759554')
    let channelID = '991256310563733564'
    let msg_id = '991257219356168242'
    let channel = await client.channels.fetch(channelID)
    let message = await channel.messages.fetch(msg_id);
    client.catOpen = message.content.includes('開') ? true : false
}