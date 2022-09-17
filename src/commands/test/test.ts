import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import db from "../../database/db"

export = {
    name: "test",
    aliases: [],
    guilds: [],
    permissions: [],
    users: ['411895879935590411'],
    description: 'test',
    roles: [],
    type: [CmdType.Owner],


    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        await db.svr.db('G-Bot').collection('Clients').insertOne({ type: 'hashData', channelId: '1020573892890349669', hash: new Map() });

    }
};
