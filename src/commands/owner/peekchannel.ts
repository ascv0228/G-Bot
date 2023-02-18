import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import dataJson from "../../data"


export = {
    name: "peekchannel",
    aliases: ['peekChannel', 'peekchl'],
    permissions: [],
    users: [dataJson.user['me']],
    description: '查看Channel資料',
    roles: [],
    type: [CmdType.Owner],


    async execute(client: ZClient, msg: Discord.Message, args: string[]) {


        let channel: Discord.GuildChannel
        if (args.length && msg.member.id == dataJson['user']['me'] && args[0] == 'parent' && [10, 11, 12].includes(msg.channel.type)) {
            if ((msg.channel as Discord.TextChannel).parentId) {

                channel = (msg.channel as Discord.ThreadChannel).parent
            }
        }
        if (!channel) {
            channel = (args.length && msg.member.id == dataJson['user']['me']) ? await client.channels.fetch(args[0]) as Discord.TextChannel : msg.channel as Discord.TextChannel
        }
        console.log(channel)
        console.log('=======================')
        console.log(channel.type)
        console.log(channel.id, channel.name)
        console.log(channel.permissionOverwrites.cache)


    }
};
