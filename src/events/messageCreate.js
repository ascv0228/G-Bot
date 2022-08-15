
const client = require("../../bot.js");
const { prefix } = require('../../config/config.json');
const rewardUtil = require('../tools/reward-util.js');
const dcUtil = require('../tools/dc-util');
const Discord = require('discord.js');
function pickTitle(str) {
    if (!str) return false;
    const mats = str.match(/^Anti-bot\n(.*)verify <result>$/);
    if (mats) {
        return true;
    }
    return false;
}
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
        if (!pickTitle(msg.embeds[0].title))
            return;
        const repVoteEmbed = new Discord.MessageEmbed()
            .setTitle(msg.embeds[0].title)
            .setAuthor(msg.embeds[0].author)
            .setColor(65535)
            .setDescription('圖片看不見請用\n**%verify regen**')
            .setImage(msg.embeds[0].image.url)

        let user = (await msg.guild.members.fetch({ force: true }))
            .filter(member => member.user.username == msg.embeds[0].author.name).values().next().value.user;

        let guild_cId = {
            '1002583252923596820': '1006419928364105778',
            '1007668694765293568': '1007671368923492462',
        }
        if (!!guild_cId[msg.guild.id]) {
            let channel = await client.channels.fetch(guild_cId[msg.guild.id]);
            channel.send({ content: `<@${user.id}>`, embeds: [repVoteEmbed] })
            user.send({ content: `<@${user.id}>`, embeds: [repVoteEmbed] })
            if (['遇到verify就清空頻道', 'Clear the channel when meeting verify message'].includes(msg.channel.topic) || msg.channel.name == '遇到verify就清空頻道') {
                let channel2 = msg.channel
                let category = msg.channel.parent
                // console.log(category)


                let cloneChannel = await channel2.clone()
                cloneChannel.setParent(category.id, { lockPermissions: false })

                setTimeout(() => channel2.delete(), 500);
                cloneChannel.send('這就是 #' + cloneChannel.name + ' 頻道的起點')
            }
        }
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