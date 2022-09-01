import Discord from "discord.js";
import tools from "../../utils/tools";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import { CommandInteraction } from "discord.js";

export = {
    name: "ping",
    description: "returns websocket ping",
    type: Discord.ApplicationCommandType.ChatInput,

    async execute(client: ZClient, interaction: Discord.CommandInteraction, args: string[]) {
        const resMsg: any = await interaction.followUp({ content: 'Ping...' })
        await resMsg.edit({ content: `Ping: ${resMsg.createdTimestamp - interaction.createdTimestamp}ms | Websocket: ${client.ws.ping}ms` });

    },
};

/*
CHAT_INPUT	1	Slash commands; a text-based command that shows up when a user types /
USER	2	A UI-based command that shows up when you right click or tap on a user
MESSAGE	3
*/