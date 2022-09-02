
import Discord, { TextChannel } from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import auth from "../../utils/auth";

let substring = ['@everyone', '@here'];
let allow_users = '832777502848974920'
let d1 = new Date().getTime();

export = {
    name: 'say',
    aliases: [],
    description: '重複說 (換行使用\\n)',
    permissions: [],
    roles: [],
    type: [CmdType.Universal],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {

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
        str = newlines(str)
        if (str.length == 0)
            return;
        let roleIds = dcUtil.pickAllRoleId(str)
        str = str.replaceAll('@everyone', `@ everyone`);
        str = str.replaceAll('@here', `@ here`);
        let msg1: Discord.Message;
        if (msg.type === Discord.MessageType.Reply) {
            msg1 = await msg.fetchReference();
        }
        if (roleIds != null) {
            for (let roleId of roleIds) {
                let role = await dcUtil.getRoleByID(msg.guild, roleId[1]);
                str = str.replaceAll(roleId[0], `@${role.name}`);
            }
        }


        if (msg1) {
            (msg as any).delete()
                .then(msg1.reply({ content: str }));
            return
        }
        let channel = msg.channel as TextChannel

        (msg as any).delete()
            .then(channel.send({ content: str }));
        return


    }
};

function newlines(str: string): string {
    return str.replaceAll('\\n', `\n`);
}