import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";

export = {
    name: "avatar",

    async execute(client: ZClient, interaction: Discord.SelectMenuInteraction) {
        let member = interaction.member;
        let value = interaction.values[0];

        let cmd = value.trimEnd().split(/\s+/)[0];
        let mentionId = value.trimEnd().split(/\s+/)[1] || null;

        let mention = ((mentionId) ? (await dcUtil.getMemberByTag(interaction.guild, mentionId) || interaction.member)
            : interaction.member) as Discord.GuildMember;

        let img: string;

        switch (cmd) {
            case 'avatar':
                img = mention.user.displayAvatarURL({ size: 4096, forceStatic: false })
                break;
            case 'memberavatar':
                img = mention.displayAvatarURL({ size: 4096, forceStatic: false })
                break;
            case 'banner':
                img = await dcUtil.getBanner(mention.user.id);
                break;
        }
 
        if (!img) return interaction.message.edit({ content: `User ${mention.user.tag} ${cmd} not found!` })

        const avatarEmbed = new Discord.EmbedBuilder()
            .setImage(img)
            .setFooter({
                text: (member.user as Discord.User).tag,
                iconURL: (member as Discord.GuildMember).displayAvatarURL({ forceStatic: false })
            });
            
        interaction.update({ embeds: [avatarEmbed]});

        return;
    }
};