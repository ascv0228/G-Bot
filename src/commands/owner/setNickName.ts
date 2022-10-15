
import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";

export = {
    name: "setNickName",
    aliases: ['snn', 'setnickname', 'setNickname'],
    guilds: [],
    permissions: [],
    users: ['411895879935590411'],
    description: '離開伺服器',
    roles: [],
    type: [CmdType.Owner],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (args.length < 1) return msg.reply({ content: '參數錯誤' });
        let member = await dcUtil.getMemberByID(msg.guild, client.user.id);;
        member.setNickname(args[0]);
    }
};

