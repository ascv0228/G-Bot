import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import tools from "../../utils/tools";
import dataJson from "../../data";


export = {
    name: "vote",
    aliases: [],
    description: '產生投票',
    permissions: ['Administrator', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'MANAGE_MESSAGES', 'MANAGE_THREADS'],
    roles: [],
    type: [CmdType.Universal],
    usage: [
        ["**(1~11 options)**", "<title> <options> ... "]
    ],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (args.length > 12)
            return msg.reply({ content: '投票的選項最多11個' })
        if (args.length < 2)
            return msg.reply({ content: '投票的選項至少1個' })
        let title = `${args.shift()} 的投票`
        let description = [];
        for (let index in args) {
            description.push(`${emojiArray[index]}   **${args[index]}**`)
        }
        const embed = new Discord.EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('投票進行中')
            .setAuthor({
                name: title,
                iconURL: msg.member.displayAvatarURL({ forceStatic: false })
            })
            .setDescription(description.join('\n'))
            .setTimestamp()
            .setFooter({
                text: msg.member.user.tag,
                iconURL: msg.member.displayAvatarURL({ forceStatic: false })
            });
        let opts = [
            {
                emoji: { id: dataJson['emoji']['statistic'], name: 'statistic' } as Discord.APIMessageComponentEmoji,
                label: '結束投票 (慎)',
                description: '關閉投票, 並顯示統計結果',
                value: `${client.prefix}vote end all`,
            }
        ]
        const row = new Discord.ActionRowBuilder<Discord.StringSelectMenuBuilder>()
            .addComponents(
                new Discord.StringSelectMenuBuilder()
                    .setCustomId('select')
                    .setPlaceholder('投票操作')
                    .addOptions(opts),
            );

        let msg2 = await msg.channel.send({ embeds: [embed], components: [row] });
        for (let index in args) {
            await msg2.react(emojiArray[index])
        }
        msg.delete().catch(() => { });
    }
}

let emojiArray = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']

