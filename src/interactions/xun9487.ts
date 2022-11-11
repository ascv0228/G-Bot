import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";
import auth from "../utils/auth";

export = {
    name: "xun9487",

    async execute(client: ZClient, interaction: Discord.SelectMenuInteraction, args: string[]) {
        let whoCanUse = interaction.user.id;
        let opts = [
            {
                label: '返回',
                value: `${client.prefix}xunBack ${whoCanUse}`,
            },
            {
                label: '阿薰87',
                value: `${client.prefix}xun87 ${whoCanUse}`,
            }
        ]
        const avatarEmbed = new Discord.EmbedBuilder()
            .setDescription("確實9487")
            .setFooter({
                text: (interaction.user as Discord.User).tag,
                iconURL: (interaction.member as Discord.GuildMember).displayAvatarURL({ forceStatic: false })
            });
        const row = new Discord.ActionRowBuilder<Discord.SelectMenuBuilder>()
            .addComponents(
                new Discord.SelectMenuBuilder()
                    .setCustomId('select del')
                    .setPlaceholder('阿薰')
                    .addOptions(opts),
            );
        interaction.message.edit({ embeds: [avatarEmbed], components: [row] });
        return;
    }
};