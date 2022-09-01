
import { DiscordBanners } from 'discord-banners';
import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";

export = {
    name: "banner",

    async execute(client: ZClient, interaction: Discord.SelectMenuInteraction, args: string[]) {
        const discordBanners = new DiscordBanners(client);
        let member = interaction.member;

        let user = await dcUtil.getMemberByTag(interaction.guild, args[0]) || interaction.member;
        const banner = await discordBanners.getBanner(user.user.id, { size: 2048, forceStatic: false })
        console.log(banner);
        if (banner) {
            const avatarEmbed = new Discord.EmbedBuilder()
                .setImage(banner)
                .setFooter({
                    text: (member.user as Discord.User).tag,
                    iconURL: (member as Discord.GuildMember).displayAvatarURL({ forceStatic: false })
                });
            return interaction.channel.send({ embeds: [avatarEmbed] });
        }
        else if (!banner) return interaction.channel.send({ content: "User banner not found!" })
        return;
    }
};