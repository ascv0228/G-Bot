import Discord from "discord.js";
import tools from "../../utils/tools";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import auth from "../../utils/auth";
import dcUtil from "../../utils/discord-util";
import { Executor } from "../../structure/executor";

export = {
    name: "removeAttachments",
    aliases: ["ra", "removeattachments"],
    description: '對特定訊息刪除附加檔案',
    permissions: [],
    roles: [],
    type: [CmdType.Universal],
    usage: [
        ["(using reply)", ""],
    ],
    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        let flag = msg.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator) || msg.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages)

        if (!msg || msg.type != Discord.MessageType.Reply) return null;
        let msg1 = await msg.fetchReference();
        if (!flag && msg.author.id != msg1.author.id)
            return;

        msg1.removeAttachments();
        msg.delete().catch()
    }
};





