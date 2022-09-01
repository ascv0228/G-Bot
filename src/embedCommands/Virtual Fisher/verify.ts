import Discord from "discord.js";
import tools from "../../utils/tools";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
let guild_cId = {
    '1002583252923596820': '1006419928364105778',
    '1007668694765293568': '1007671368923492462',
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

        channel.send({ content: `<@${user.id}>`, embeds: [verifyEmbed] });
        let clearChannelTopics = ['遇到verify就清空頻道', 'Clear the channel when meeting verify message']
        if (msg.channel.type == Discord.ChannelType.GuildText &&
            clearChannelTopics.includes((msg.channel as Discord.TextChannel).topic)) {
            let channel2 = msg.channel as Discord.TextChannel
            // console.log(category)


            let cloneChannel = await channel2.clone()
            try {
                cloneChannel.setPosition(channel2.position)
                setTimeout(() => channel2.delete(), 500);
                cloneChannel.send('這就是 #' + cloneChannel.name + ' 頻道的起點')
            }
            catch {
                cloneChannel.delete()
            }
        }
        else if (msg.channel.isThread() && clearChannelTopics.includes(msg.channel.parent.topic)) {

            setTimeout(() => msg.channel.delete(), 500);

        }
    }
};

