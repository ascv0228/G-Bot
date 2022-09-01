import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";

export = {
    name: "guild-icon",

    async execute(client: ZClient, interaction: Discord.SelectMenuInteraction, args: string[]) {
        let member = interaction.member;

        let guild = client.guilds.cache.get(args[0]);
        const iconEmbed = new Discord.EmbedBuilder()
            .setDescription(`${guild.name} 頭貼: `)
            .setImage(guild.iconURL({ size: 4096, forceStatic: false }))
            .setFooter({
                text: (member.user as Discord.User).tag,
                iconURL: (member as Discord.GuildMember).displayAvatarURL({ forceStatic: false })
            });
        interaction.channel.send({ embeds: [iconEmbed] });

        return;
    }
};