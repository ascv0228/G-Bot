import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";

export = {
    name: "getBigEmoji",
    aliases: ['gbe'],

    description: '取得emoji大圖',
    permissions: [],
    roles: [],
    type: [CmdType.Universal],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (msg.type === Discord.MessageType.Reply)
            getEmojiByReply(msg);
        if (!args.length)
            return;
        let emoji_id = dcUtil.matchEmoji(args[0])
        if (!emoji_id) return;

        let emoji_url = await dcUtil.getUrl(emoji_id);
        return msg.reply({ content: `${emoji_url || 'no emoji'}` });

    }
}

async function getEmojiByReply(msg: Discord.Message) {
    let msg1 = await msg.fetchReference();
    let args = pickAllEmojiId(msg1.content);
    if (!args || !args.length) return msg.reply({ content: 'no emoji' });
    for (let emoji_id of args) {
        let url = await dcUtil.getUrl(emoji_id)
        if (url == null) continue;
        msg.reply({ content: `${url}` });
    }
}

function pickAllEmojiId(str: string): string[] | null {
    if (!str) return null;
    const regexp = /<a?:\w+:(\d+)>/g;
    const array = [...str.matchAll(regexp)];
    if (array.length) {
        const unique = [...new Set(array.map(x => x[1]))];
        return unique;
    }
    return null;
}


