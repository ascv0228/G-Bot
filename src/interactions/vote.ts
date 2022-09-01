import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";
import auth from "../utils/auth";

export = {
    name: "vote",

    async execute(client: ZClient, interaction: Discord.SelectMenuInteraction, args: string[]) {
        if (args[0] != 'end') {
            return interaction.reply({ content: 'something error.', ephemeral: true });

        }
        if ((!interaction.message.embeds) || interaction.message.embeds.length < 1)
            return interaction.reply({ content: 'something error.', ephemeral: true });
        let embed = interaction.message.embeds[0];
        if (embed.title != '投票進行中') return;
        if (!(interaction.member.permissions as Discord.PermissionsBitField).has(Discord.PermissionsBitField.Flags.Administrator)
            || (interaction.member.user as Discord.User).tag != embed.footer.text
        ) {
            return interaction.reply({ content: '你無法使用這項操作', ephemeral: true });
        }
        let member = interaction.member;
        // let embed = (msg.embeds.filter(embed => embed.title == '投票進行中').values().next().value as Discord.Embed);


        let newDescription = Array<string>();
        let oldDescription = embed.description.split("\n")
        for (let index in oldDescription) {
            let a = interaction.message.reactions.resolve(emojiArray[index]).count - 1
            newDescription.push(oldDescription[index] + `  >>  **${a}**票`)
        }
        const repVoteEmbed = new Discord.EmbedBuilder()
            .setTitle('投票截止 by' + member.user.username)
            .setAuthor(embed.author)
            .setColor(65535)
            .setDescription(newDescription.join('\n'))
            .setFooter({
                text: (member.user as Discord.User).tag,
                iconURL: (member as Discord.GuildMember).displayAvatarURL({ forceStatic: false })
            });
        try {
            interaction.message.edit({ embeds: [repVoteEmbed], components: [] });
            interaction.message.reactions.removeAll();
            interaction.message.reply('投票結束')
        }
        catch (e) {
            interaction.channel.send({ embeds: [repVoteEmbed] });
        }

        return;
    }
};

let emojiArray = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']
