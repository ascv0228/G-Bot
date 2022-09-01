import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";

export = {
    name: "avatar",

    async execute(client: ZClient, interaction: Discord.SelectMenuInteraction, args: string[]) {
        let member = interaction.member;

        let user = await dcUtil.getUserByTag(interaction.guild, args[0]) || member.user;
        const avatarEmbed = new Discord.EmbedBuilder()
            .setImage((user as Discord.User).displayAvatarURL({ size: 4096, forceStatic: false }))
            .setFooter({
                text: (member.user as Discord.User).tag,
                iconURL: (member as Discord.GuildMember).displayAvatarURL({ forceStatic: false })
            });
        interaction.channel.send({ embeds: [avatarEmbed] });

        return;
    }
};