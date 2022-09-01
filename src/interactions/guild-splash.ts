import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";
import auth from "../utils/auth";

export = {
    name: "guild-splash",

    async execute(client: ZClient, interaction: Discord.SelectMenuInteraction, args: string[]) {
        let member = interaction.member;

        let guild = client.guilds.cache.get(args[0]);
        const splashEmbed = new Discord.EmbedBuilder()
            .setDescription(`${guild.name} 邀請連結背景: `)
            .setImage(getSplashUrl(guild.id, guild.splash))
            .setFooter({
                text: (member.user as Discord.User).tag,
                iconURL: (member as Discord.GuildMember).displayAvatarURL({ forceStatic: false })
            });
        interaction.channel.send({ embeds: [splashEmbed] });

        return;
    }
};

function getSplashUrl(guildId: string, splashHash: string): string {
    return `https://cdn.discordapp.com/splashes/${guildId}/${splashHash}.jpg?size=4096`
}