import Discord from "discord.js";
import tools from "../../utils/tools";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import auth from "../../utils/auth";
import dcUtil from "../../utils/discord-util";
import { Executor } from "../../structure/executor";

export = {
    name: "suppressEmbeds",
    aliases: ["se", "suppressembeds"],
    description: '對特定訊息刪除附加檔案',
    permissions: ['Administrator', 'ManageMessages'],
    roles: [],
    type: [CmdType.Universal],
    usage: [
        ["(using reply)", ""],
    ],
    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        // if (!this.member.includes(msg.author.id)) return;
        if (!msg || !args || args.length < 1 || msg.type != Discord.MessageType.Reply) return null;
        let msg1 = await msg.fetchReference();
        return msg1.suppressEmbeds(true)
    }
};





