import Discord from "discord.js";
import tools from "../../utils/tools";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";

export = {
    name: "eat",
    description: "what i want to eat",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "food",
            description: "food",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "cake",
                    value: "cake",
                }
            ]
        },
    ],

    async execute(client: ZClient, interaction: Discord.CommandInteraction, args: string[]) {
        await interaction.followUp({ content: `${args[0] + args[1]}` })
    },
};
