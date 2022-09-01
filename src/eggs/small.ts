import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";
import { EggRuleType, EggType } from "../utils/types";
let rolesMap = {
    '@小萌新': '<@&938748850112430091>',
    '<@&938748850112430091>': '<@&938748850112430091>',
}
let d1 = new Date().getTime();
export = {
    aliases: Object.keys(rolesMap),
    channels: ['832610209377288222', '867811248560144444', '948118924120166410', '987234093748068363'],

    description: '協同區找人',
    roles: ['948118013293494303'],
    eggType: EggType.PartSame,

    async execute(client: ZClient, msg: Discord.Message, listen: string) {
        if (msg.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
        if (!this.channels.includes(msg.channel.id) &&
            !(msg.channel.isThread() && this.channels.includes(msg.channel.parentId)))
            return msg.reply({ content: '頻道錯誤' });

        let d2 = new Date();
        if (d2.getHours() < 1 || d2.getHours() > 15)
            return msg.reply({ content: '00:00 ~ 09:00 請勿打擾' });
        d1 = d2.getTime();
        return msg.reply({ content: '<@&938748850112430091>, ' + `${msg.member} 找你` });

    }
};
