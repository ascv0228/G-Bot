import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";


export = {
    name: "peekchannel",
    aliases: ['peekChannel', 'peekchl'],
    permissions: [],
    users: ['411895879935590411'],
    description: '查看Channel資料',
    roles: [],
    type: [CmdType.Owner],


    async execute(client: ZClient, msg: Discord.Message, args: string[]) {

        let channel = msg.channel;
        console.log(channel)


    }
};
