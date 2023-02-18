import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";
import { EggRuleType, EggType } from "../utils/types";
import dataJson from "../data";
let rolesMap = {
    '@輸出': {
        [dataJson['guild']['RD_main']] : '<@&987180143275569212>',
        // [dataJson['guild']['ฅ(•ㅅ•^✿)ฅ']] : '<@&1043508245307867196>'
    },
    '@输出': {
        [dataJson['guild']['RD_main']] : '<@&987180143275569212>',
        // [dataJson['guild']['ฅ(•ㅅ•^✿)ฅ']] : '<@&1043508245307867196>'
    },
    '<@&987180143275569212>': '<@&987180143275569212>',
    '<@&1043508245307867196>': '<@&1043508245307867196>',
    '@輔助': {
        [dataJson['guild']['RD_main']] : '<@&987180195121332224>',
        // [dataJson['guild']['ฅ(•ㅅ•^✿)ฅ']] : '<@&1043508182665936966>'
    },
    '@辅助': {
        [dataJson['guild']['RD_main']] : '<@&987180195121332224>',
        // [dataJson['guild']['ฅ(•ㅅ•^✿)ฅ']] : '<@&1043508182665936966>'
    },
    '<@&987180195121332224>': '<@&987180195121332224>',
    '<@&1043508182665936966>' : '<@&1043508182665936966>',
    // '@自拉' :{
    //     [dataJson['guild']['ฅ(•ㅅ•^✿)ฅ']] : '<@&1043854592401752115>'
    // },
    // '<@&1043854592401752115>':'<@&1043854592401752115>'
}
export = {
    aliases: Object.keys(rolesMap),
    channels: ['987233571276210217', '987234093748068363', '1049904141905965076', 
    '1049903667639242842', '1042348853455753227', '1042699894214885416'],

    description: '協同區找人',
    roles: [],
    eggType: EggType.PartSame,
    index: null,

    async execute(client: ZClient, msg: Discord.Message, listen: string) {
        if (dcUtil.pickRoleId(listen) && msg.mentions.roles.get(dcUtil.pickRoleId(listen))) return;
        let res = (typeof rolesMap[listen] === 'string' || rolesMap[listen] instanceof String)? rolesMap[listen] : rolesMap[listen][msg.guild.id]
        if(!res) return

        return msg.reply({ content: res + `, ${msg.member} 找你` });

    }
};
