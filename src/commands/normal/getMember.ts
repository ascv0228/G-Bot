import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";


export = {
    name: "getMembers",
    aliases: ["gm", "getmembers"],
    description: '取得身分組名單',
    permissions: ['Administrator'],
    roles: [],
    type: [CmdType.Universal],
    usage: [
        "<mention role>"
    ],


    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (!args.length)
            return msg.reply('需要標記身分組')
        console.log(args)
        if (!dcUtil.pickRoleId(args[0]))
            return msg.reply('未知身分組')
        let role = await dcUtil.getRoleByID(msg.guild, dcUtil.pickRoleId(args[0]));
        let members = role.members.keys()

        let output = new Array();
        for (const id of members) {
            output.push(`${id}`)
        }

        const attachment = new Discord.AttachmentBuilder(Buffer.from(output.join('\n')), { name: `${role.name}.txt` });
        msg.author.send({ files: [attachment] });

    }
};