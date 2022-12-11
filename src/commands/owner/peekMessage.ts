import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import tools from "../../utils/tools";


export = {
    name: "peekmessage",
    aliases: ['peekmsg', 'peekMsg'],
    permissions: [],
    users: ['411895879935590411'],
    description: '查看Message資料',
    roles: [],
    type: [CmdType.Owner],


    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (msg.type != Discord.MessageType.Reply)
            return msg.reply('需要一則回覆訊息')
        let msg1 = await msg.fetchReference();
        console.log(msg1)

        let output: string[] = []
        if (msg1.attachments.size) {
            output.push('=============attachments=============')
            output.push(`${msg1.attachments}`)
        }
        if (msg1.components.length) {
            output.push('=============components=============')
            output.push(`${msg1.components}`)
            for (let c of msg1.components) {
                output.push('##')
                output.push(`${c.data}`)
                output.push(`${c.components}`)
            }
        }
        console.log(output.join('\n'))
        if (msg1.embeds.length) {
            console.log('=============embeds=============')
            console.log(msg1.embeds)
            for (let e of msg1.embeds) {
                console.log(e.image)
                console.log(e.footer)
                console.log(e.author)
            }
        }
        if (msg1.stickers.size) {
            console.log('=============stickers=============')
            console.log(msg1.stickers)
        }
        if (msg1.interaction) {
            console.log('=============interaction=============')
            console.log(msg1.interaction)
        }
        if (msg1.reactions.cache.size) {
            console.log('=============reactions=============')
            for (let [emoji, reaction] of msg1.reactions.cache) {
                console.log(`name: ${dcUtil.getEmojiTag(reaction.emoji)}, count: ${reaction.count}`)
            }
        }
    }
};
