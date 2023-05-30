import Discord from "discord.js";
import tools from "../../utils/tools";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import auth from "../../utils/auth";
import dcUtil from "../../utils/discord-util";
import dataJson from "../../data";


export = {
    name: "addemojis",
    aliases: ["aes"],
    users: [dataJson["user"]["me"], dataJson["user"]["catcatBug"], dataJson["user"]['lover']],
    description: '增加表情符號',
    permissions: ['Administrator'],
    roles: [],
    type: [CmdType.Universal],
    usage: [
        ["<image_url> ..."],
        ["<emoji> ..."]
    ],
    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        // if (!this.member.includes(msg.author.id)) return;
        if (!args.length)
            return msg.reply({ content: tools.usageString(client, this) });
        for(let arg of args){
            let emoji_url = await dcUtil.getUrl(dcUtil.matchEmoji(arg));
            let name = matchEmojiName(arg)
            
    
            let emoji = await msg.guild.emojis.create({ attachment: emoji_url, name: name }).catch((e) => {
                if (`${e}`.includes("maximum size")) {
                    msg.reply({ content: `image file's size is too large` })
                }
                if (`${e}`.includes("DiscordAPIError[50035]")) {
                    msg.reply({ content: `this url \`${emoji_url}\`is not image url` })
            
                }
                msg.reply({ content: `${e}` })
                tools.Console_Send(client, e);
            })
            if (emoji)
                msg.reply({ content: `增加 ${emoji}` })
        }


    }
};

function getImgUrlFromAttachment(msg: Discord.Message): string {
    for (const [_, att] of msg.attachments) {
        let found = suffix_array.find(v => att.url.endsWith(v));
        if (!found) continue;
        return att.url;
    }
    return null;
}
let suffix_array = [
    '.webp', '.png', '.jpg', '.jpeg',
    '.WEBP', '.PNG', '.JPG', '.JPEG',
    '.gif', '.GIF'
]

function matchEmojiName(str: string){
        if (!str) return null;
        let mats = str.match(/<a?:(.+):(\d+)>/);
        if (mats) {
            return mats[1];
        }

        return null;
}
