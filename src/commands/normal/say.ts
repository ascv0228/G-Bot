
import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import auth from "../../utils/auth";
import tools from "../../utils/tools";
import dataJson from "../../data";

let allow_users = [dataJson['user']['catcatBug'], '833243125089959948']
let d1 = new Date().getTime();

export = {
    name: 'say',
    aliases: [],
    description: '重複說 (換行使用\\n)',
    permissions: [],
    roles: [],
    type: [CmdType.Universal],
    usage: [
        "<one or more thing> ..."
    ],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (!args.length)
            return msg.reply({ content: tools.usageString(client, this) });

        if (!msg.member.permissions.has(Discord.PermissionFlagsBits.Administrator)
            && !allow_users.includes(msg.author.id)
            && !auth.isDeveloperUser(msg.member)) {
            let d2 = new Date().getTime();
            if ((d2 - d1) < 30000)
                return msg.reply({ content: `冷卻時間剩餘 ${(30000 - (d2 - d1)) / 1000} 秒` });
            d1 = d2;

        }
        if (!auth.isOwnerUser(msg.member)) {
            if (args[0].startsWith('x!') || args[0].startsWith('z!')) {
                return msg.reply({ content: "欠扁" })
            }
        }
        let str = args.join(" ")
        str = await dcUtil.dealStringMention(msg.guild, str);
        let msg1: Discord.Message;
        if (msg.type === Discord.MessageType.Reply) {
            msg1 = await msg.fetchReference();
        }

        if (msg1) {
            (msg as any).delete()
                .then(msg1.reply({ content: str })).catch(() => { });
            return
        }
        let channel = msg.channel as Discord.TextChannel

        (msg as any).delete()
            .then(channel.send({ content: str })).catch(() => { });
        return


    }
};
