import Discord from "discord.js";
import tools from "../../utils/tools";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";

export = {
    name: "add",
    description: "add two numbers",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "number1",
            description: "number1",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "number2",
            description: "number2",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    async execute(client: ZClient, interaction: Discord.CommandInteraction, args: string[]) {
        let num1 = parseInt(interaction.options.get("number1").value as string);
        let num2 = parseInt(interaction.options.get("number2").value as string);
        await interaction.followUp({ content: `${num1 + num2}` })
    },
};
