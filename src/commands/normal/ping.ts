import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";

export = {
    name: 'ping',
    aliases: [],
    description: '查詢延遲度',
    permissions: [],
    roles: [],
    type: [CmdType.Universal],
    usage: [
        ""
    ],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        const resMsg = await msg.channel.send({ content: 'Ping...' });
        await resMsg.edit({ content: `Ping: ${resMsg.createdTimestamp - msg.createdTimestamp}ms | Websocket: ${client.ws.ping}ms` });
    },
};