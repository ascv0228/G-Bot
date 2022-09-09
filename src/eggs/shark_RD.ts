import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";
import { EggRuleType, EggType } from "../utils/types";
let rolesMap = {
    '@可掛輸出': '<@&1017346767366398022>',
    '<@&1017346767366398022>': '<@&1017346767366398022>',

    '@不掛輸出': '<@&1017346838208204840>',
    '<@&1017346838208204840>': '<@&1017346838208204840>',

    '@可掛輔助': '<@&1017346885356355584>',
    '<@&1017346885356355584>': '<@&1017346885356355584>',

    '@不掛輔助': '<@&1017346926594773032>',
    '<@&1017346926594773032>': '<@&1017346926594773032>',
}
export = {
    aliases: Object.keys(rolesMap),
    channels: ['1017337875701964860', '1017337922636230687'],

    description: '協同區找人',
    roles: [],
    eggType: EggType.PartSame,

    async execute(client: ZClient, msg: Discord.Message, listen: string) {
        if (msg.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;

        return msg.reply({ content: rolesMap[listen] + `, ${msg.member} 找你` });

    }
};