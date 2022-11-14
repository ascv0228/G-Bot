import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";
import auth from "../utils/auth";

export = {
    name: "xunBack",

    async execute(client: ZClient, interaction: Discord.SelectMenuInteraction, args: string[]) {
        let whoCanUse = interaction.user.id;
        let opts = [
            {
                label: '阿薰87',
                value: `${client.prefix}xun87 ${whoCanUse}`,
            },
            {
                label: '阿薰9487',
                value: `${client.prefix}xun9487 ${whoCanUse}`,
            }
        ]
        const avatarEmbed = new Discord.EmbedBuilder()
            .setDescription("阿薰是不是87")
            .setFooter({
                text: (interaction.user as Discord.User).tag,
                iconURL: (interaction.member as Discord.GuildMember).displayAvatarURL({ forceStatic: false })
            });
        const row = new Discord.ActionRowBuilder<Discord.SelectMenuBuilder>()
            .addComponents(
                new Discord.SelectMenuBuilder()
                    .setCustomId('select')
                    .setPlaceholder('阿薰')
                    .addOptions(opts),
            );
        interaction.message.edit({ embeds: [avatarEmbed], components: [row] });
        return;
    }
};