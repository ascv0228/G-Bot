import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";

export = {
    name: "banner",
    aliases: [],
    description: '查詢使用者橫幅',
    permissions: ['Administrator'],
    roles: [],
    type: [CmdType.Universal],
    usage: [
        "",
        "<user>"
    ],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        let member = await dcUtil.getMemberByTag(msg.guild, args[0]) || msg.member;
        const banner = await dcUtil.getBanner(member.user.id, { size: "2048", format: "png", dynamic: true })
        if (banner) { return msg.channel.send(banner); }
        else if (!banner) return msg.channel.send("User banner not found!")
    }
};