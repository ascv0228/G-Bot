import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";


export = {
    name: "peekchannel",
    aliases: ['peekChannel', 'peekchl'],
    permissions: [],
    users: ['411895879935590411'],
    description: '查看Channel資料',
    roles: [],
    type: [CmdType.Owner],


    async execute(client: ZClient, msg: Discord.Message, args: string[]) {


        let channel: Discord.TextChannel | Discord.NewsChannel | Discord.APIGuildForumChannel
        if (args.length && msg.member.id == process.env.BOT_OWNER && args[0] == 'parent' && [10, 11, 12].includes(msg.channel.type)) {
            if ((msg.channel as Discord.TextChannel).parentId) {

                channel = (msg.channel as Discord.ThreadChannel).parent
            }
        }
        if (!channel) {
            channel = (args.length && msg.member.id == process.env.BOT_OWNER) ? await client.channels.fetch(args[0]) as Discord.TextChannel : msg.channel as Discord.TextChannel
        }

        console.log(channel)


    }
};
