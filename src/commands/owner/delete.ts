import Discord from "discord.js";
import tools from "../../utils/tools";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";

export = {
    name: "delete",
    aliases: ['del'],

    description: '刪除訊息',
    permissions: [],
    roles: [],
    type: [CmdType.Owner],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (msg.type !== Discord.MessageType.Reply) {
            setTimeout(() => msg.reply('需要回覆一個訊息'), 10000);
            return;
        }
        let msg1 = await msg.fetchReference();
        msg1.delete().catch(() => { });
        msg.delete().catch(() => { });
    }
}
