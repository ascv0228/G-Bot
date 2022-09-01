import Discord from "discord.js";
import tools from "../../utils/tools";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import { CommandInteraction } from "discord.js";

export = {
    name: "add",
    description: "add two numbers",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "number1",
            description: "number1",
            type: Discord.ApplicationCommandOptionType.Number,
            required: true,
        },
        {
            name: "number2",
            description: "number2",
            type: Discord.ApplicationCommandOptionType.Number,
            required: true,
        },
    ],

    async execute(client: ZClient, interaction: Discord.CommandInteraction, args: string[]) {
        await interaction.followUp({ content: `${args[0] + args[1]}` })
    },
};
