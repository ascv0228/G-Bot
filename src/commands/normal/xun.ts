import Discord from "discord.js";
import tools from "../../utils/tools";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import dataJson from "../../data"

export = {
    name: 'xun',
    aliases: ["xun"],
    description: '阿薰',
    permissions: [],
    roles: [],
    users: [dataJson.user['xun'], dataJson.user['me']],
    type: [CmdType.Universal],
    usage: [
    ],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        let opts = [
            {
                label: '阿薰是87',
                value: `${client.prefix}xun87 ${msg.author.id}`,
            },
            {
                label: '阿薰9487',
                value: `${client.prefix}xun9487 ${msg.author.id}`,
            }
        ]
        const avatarEmbed = new Discord.EmbedBuilder()
            .setDescription("阿薰是不是87")
            .setFooter({
                text: (msg.member.user as Discord.User).tag,
                iconURL: (msg.member as Discord.GuildMember).displayAvatarURL({ forceStatic: false })
            });
        const row = new Discord.ActionRowBuilder<Discord.StringSelectMenuBuilder>()
            .addComponents(
                new Discord.StringSelectMenuBuilder()
                    .setCustomId('select')
                    .setPlaceholder('阿薰')
                    .addOptions(opts),
            );

        await msg.channel.send({ embeds: [avatarEmbed], components: [row] });
    }
};

