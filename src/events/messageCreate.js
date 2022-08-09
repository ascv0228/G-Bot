
const client = require("../../bot.js");
const { prefix } = require('../../config/config.json');
const rewardUtil = require('../tools/reward-util.js');
const dcUtil = require('../tools/dc-util');
const Discord = require('discord.js');
client.on('messageCreate', async msg => {
    try {
        if (!msg.guild || !msg.member) return;
        if (!msg.member.user) return;
    } catch (err) {
        return;
    }
    if (msg.author.id == '574652751745777665') {
        if (!(msg.embeds && msg.embeds.length == 1))
            return;
        if (msg.embeds[0].title != 'Anti-bot\n%verify <result>')
            return;
        const repVoteEmbed = new Discord.MessageEmbed()
            .setTitle(msg.embeds[0].title)
            .setAuthor(msg.embeds[0].author)
            .setColor(65535)
            .setDescription('%verify')
            .setImage(msg.embeds[0].image.url)

        let userId = (await msg.guild.members.fetch({ force: true }))
            .filter(member => member.user.username == msg.embeds[0].author.name).keys().next().value;

        let cId = '1006419928364105778'
        let channel = await client.channels.fetch(cId);
        channel.send({ content: `<@${userId}>`, embeds: [repVoteEmbed] })
    }
    if (msg.member.user.bot) return;
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
        dcUtil.command_embed(client, msg, lines[i]);
    }
});