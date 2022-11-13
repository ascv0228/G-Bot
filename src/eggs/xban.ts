import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";
import { EggRuleType, EggType } from "../utils/types";
import dataJson from "../data";

export = {
    name: "x!ban ",
    aliases: [],
    users: [dataJson["user"]["me"], dataJson["user"]["catcatBug"]],
    eggType: EggType.PartWithStartSame,

    async execute(client: ZClient, msg: Discord.Message, listen: string) {
        if (!msg.content.startsWith(`x!ban `)) return;
        let args = msg.content.slice('x!ban '.length).trim().split(/\s+/);
        let member = await dcUtil.getMemberByTag(msg.guild, args[0]);
        if (member == null)
            return;

        return msg.reply({ content: `<@${member.id}>(${member.nickname || member.user.username}) 退出伺服器&刪庫` });

    }

};