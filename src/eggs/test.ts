import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";
import { EggRuleType, EggType } from "../utils/types";
let rolesMap = {
    '<@&1001485729597239316>': '<@&1001485729597239316>',
}
export = {
    aliases: Object.keys(rolesMap),
    channels: ['989138173953183744', '879732521154252890'],

    description: '測試',
    roles: [],
    eggType: EggType.PartSame,

    async execute(client: ZClient, msg: Discord.Message, listen: string) {
        if (dcUtil.pickRoleId(listen) && msg.mentions.roles.get(dcUtil.pickRoleId(listen))) {
            msg.reply({ content: rolesMap[listen] + `, ${msg.member} 找你, test1` });
        }
        msg.reply({ content: rolesMap[listen] + `, ${msg.member} 找你, test2` });


    }
};