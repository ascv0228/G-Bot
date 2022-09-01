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
        if (msg.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
        if (!this.channels.includes(msg.channel.id) &&
            !(msg.channel.isThread() && this.channels.includes(msg.channel.parentId)) &&
            !msg.member.permissions.has(Discord.PermissionFlagsBits.Administrator))
            return msg.reply({ content: '頻道錯誤' });

        return msg.reply({ content: rolesMap[listen] + `${msg.member} 找你` });

    }
};