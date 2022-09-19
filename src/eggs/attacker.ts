import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";
import { EggRuleType, EggType } from "../utils/types";
let rolesMap = {
    '@輸出': '<@&987180143275569212>',
    '<@&987180143275569212>': '<@&987180143275569212>',
    '@輔助': '<@&987180195121332224>',
    '<@&987180195121332224>': '<@&987180195121332224>',
}
export = {
    aliases: Object.keys(rolesMap),
    channels: ['987233571276210217', '987234093748068363'],

    description: '協同區找人',
    roles: [],
    eggType: EggType.PartSame,

    async execute(client: ZClient, msg: Discord.Message, listen: string) {
        if (dcUtil.pickRoleId(listen) && msg.mentions.roles.get(dcUtil.pickRoleId(listen))) return;

        return msg.reply({ content: rolesMap[listen] + `, ${msg.member} 找你` });

    }
};