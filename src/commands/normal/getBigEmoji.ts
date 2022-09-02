import Discord from "discord.js";
import tools from "../../utils/tools";
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

        let emoji_url = await getUrl(emoji_id);
        return msg.reply({ content: `${emoji_url || 'no emoji'}` });

    }
}

async function getEmojiByReply(msg: Discord.Message) {
    let msg1 = await msg.fetchReference();
    let args = pickAllEmojiId(msg1.content);
    if (!args || !args.length) return msg.reply({ content: 'no emoji' });
    for (let emoji_id of args) {
        let url = await getUrl(emoji_id)
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

async function getUrl(emoji_id: string): Promise<string> {
    if (!emoji_id) return null;
    if (await IsValidImageUrl(emoji_url_gif(emoji_id))) {
        return `${emoji_url_gif(emoji_id)}`;
    }
    if (await IsValidImageUrl(emoji_url_png(emoji_id))) {
        return `${emoji_url_png(emoji_id)}`;
    }
    return null;
}


function emoji_url_png(id: string): string {
    return `https://cdn.discordapp.com/emojis/${id}.png?size=4096&quality=lossless`
}

function emoji_url_gif(id: string): string {
    return `https://cdn.discordapp.com/emojis/${id}.gif?size=4096&quality=lossless`
}
var request = require('request').defaults({ encoding: null });

const zlib = require('zlib');
async function IsValidImageUrl(url: string) {
    return new Promise(function (resolve, reject) {
        const gzip = zlib.createGzip();

        request.get(url)
            .on('response', function (response) {
                if (response.statusCode != 200) resolve(null);
                resolve(response.headers['content-length']);
            })
            .on('error', (e) => {
                reject(e);
            })
            .on('end', (e) => {
                resolve(null);
            })
            .pipe(gzip);

    });
}


