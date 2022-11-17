
import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import dataJson from "../../data"

export = {
    name: "getEmojis",
    aliases: ['ge'],
    guilds: [],
    permissions: [],
    users: [dataJson.user['me']],
    description: '離開伺服器',
    roles: [],
    type: [CmdType.Owner],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {

        let channel = ((await client.channels.fetch(args[0])) || msg.channel) as Discord.TextChannel;

        for (let guild of client.guilds.cache) {
            // let msg_array = new Array()
            channel.send({ content: `ˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇ${guild[1]}ˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇ` })
            for (let [emoji_id, emoji] of await ((await dcUtil.getGuildByID(client, guild[0])).emojis.fetch(null, { force: true }) as any)) {
                // msg_array.push(`${emoji}  ${emoji_id}`)
                // if (msg_array.length == 20) {
                //     await channel.send({ content: `${msg_array.join('\n')}` })
                //     msg_array = new Array()
                // }
                channel.send({ content: `${emoji}  ${emoji_id}` })
            }
            // if (msg_array.length) await channel.send({ content: `${msg_array.join('\n')}` })
            channel.send({ content: `^^^^^^^^^^^^^^^${guild[1]}^^^^^^^^^^^^^^^` })
        }

    }
};

