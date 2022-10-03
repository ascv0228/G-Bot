import Discord from "discord.js";
import tools from "../../utils/tools";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";

export = {
    name: "nickname",
    description: "Change a member's nickname",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "name",
            description: "The new nickname",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute(client: ZClient, interaction: Discord.CommandInteraction, args: string[]) {
        if ((interaction.member.permissions as Readonly<Discord.PermissionsBitField>)
            .has(Discord.PermissionsBitField.Flags.ChangeNickname)) {
            if ((interaction.member as Discord.GuildMember).manageable) {
                await (interaction.member as Discord.GuildMember).setNickname(args[0]).catch();
                return await interaction.followUp({ content: `set nickname => ${args[0]}` });
            }

            else {
                return await interaction.followUp({ content: `the bot permission is less than user.` });
            }
        }
        await interaction.followUp({ content: `you cannot change you nickname.` });
    },
};
