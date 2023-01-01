
import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";

export = {
    name: "musicStatus",
    aliases: ['ms'],
    guilds: [],
    permissions: [],
    users: ['411895879935590411'],
    description: '伺服器音樂狀態',
    roles: [],
    type: [CmdType.Owner],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        msg.reply(JSON.stringify(client.manager.players.keys()))
    }
};

