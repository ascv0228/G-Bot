import Discord from "discord.js";
import tools from "../../utils/tools";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
let guild_cId = {
    '1002583252923596820': '1022350675566407681',
    '1007668694765293568': '1007671368923492462',
    '981737244236865577': '1009857192683384983',
    '901498054077714462': '1019231029556428810'
}

export = {
    name: "Virtual Fisher Verify",
    mat: /^Anti-bot\n(.*)verify <result>$/,
    guilds: Object.keys(guild_cId),
    description: 'Virtual Fisher驗證提醒',
    permissions: [],
    roles: [],
    users: ['574652751745777665'],
    type: [CmdType.Bot],
    bot: true,

    async execute(client: ZClient, msg: Discord.Message, embed: Discord.Embed) {
        if (msg.interaction && msg.interaction.commandName == 'verify') return;

        if (client.user.id != '848194732143542324') return
        let cId = guild_cId[msg.guild.id]
        // let categoryId = args[0]
        let channel = await client.channels.fetch(cId) as Discord.TextChannel;

        const verifyEmbed = new Discord.EmbedBuilder()
            .setTitle(embed.title)
            .setAuthor(embed.author)
            .setColor(65535)
            .setDescription('圖片看不見請用\n**/verify answer:regen**')
            .setImage(embed.image.proxyURL)

        let members = (await msg.guild.members.fetch({ force: true }))
        let user = members
            .filter(member => member.user.username == embed.author.name).values().next().value.user as Discord.User;

        if (user.id == process.env.BOT_OWNER && process.env.BOT_PREFIX == process.env.MAIN_BOT_PREFIX) {
            client.botStatus['Before_fish_count'] = client.botStatus['Now_fish_count'];
            client.botStatus['Now_fish_count'] = 0;
            (client.botStatus['fish_count_message'] as Discord.Message).edit({
                content:
                    '`上次釣魚` : ' + String(client.botStatus['Before_fish_count'])
                    + '\n`這次釣魚` : ' + String(client.botStatus['Now_fish_count'])
            })
        }

        channel.send({ content: `<@${user.id}>`, embeds: [verifyEmbed] });
        // user.send({ content: `<@${user.id}>`, embeds: [verifyEmbed] }).catch(error => { })
        let clearChannelTopics = ['遇到verify就清空頻道', 'Clear the channel when meeting verify message']
        if (msg.channel.type == Discord.ChannelType.GuildText &&
            clearChannelTopics.includes((msg.channel as Discord.TextChannel).topic)) {
            let channel2 = msg.channel as Discord.TextChannel
            // console.log(category)


            let cloneChannel = await channel2.clone()
            cloneChannel.setPosition(channel2.position)
            cloneChannel.send('這就是 #' + cloneChannel.name + ' 頻道的起點')
            setTimeout(() => channel2.delete().catch(async error => { await cloneChannel.delete().catch(); }), 500);

        }
        else if (msg.channel.isThread() && clearChannelTopics.includes(msg.channel.parent.topic)) {

            setTimeout(() => msg.channel.delete().catch(), 500);

        }
    }
};

