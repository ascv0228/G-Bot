import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
export = {
    name: "clearchannel",
    aliases: ['clrchl'],
    permissions: [],
    users: ['411895879935590411'],
    description: '刪除並克隆頻道 (清空)',
    roles: [],
    type: [CmdType.Owner],


    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (msg.guild.id != '1002583252923596820' && args.pop() != 'confirm')
            return msg.reply('需要confirm')

        let channel = args.length ? await client.channels.fetch(args[0]) as Discord.TextChannel : msg.channel as Discord.TextChannel

        let cloneChannel = await channel.clone()

        channel.delete()
        cloneChannel.send({ content: '這就是 #' + cloneChannel.name + ' 頻道的起點' })

    }
};
