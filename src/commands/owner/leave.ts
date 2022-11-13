
import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";

export = {
    name: "leave",
    aliases: ['leaveserver', 'leaveServer'],
    guilds: [],
    permissions: [],
    users: ['411895879935590411'],
    description: '離開伺服器',
    roles: [],
    type: [CmdType.Owner],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (args.length < 1) return msg.reply({ content: '參數錯誤' });
        let server = await dcUtil.getGuildByID(client, args[0]);
        server.leave();
    }
};

