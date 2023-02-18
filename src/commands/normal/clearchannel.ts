import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dataJson from "../../data"
export = {
    name: "clearchannel",
    aliases: ['clrchl'],
    permissions: ['Administrator'],
    users: [],
    description: '刪除並克隆頻道 (清空)',
    roles: [],
    type: [CmdType.Universal],
    usage: [
        "confirm"
    ],


    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (msg.member.id != msg.guild.ownerId && msg.member.id != dataJson['user']['me'])
            return msg.reply({ content: `<@${msg.guild.ownerId}>, <@${msg.member.id}> 想刪除此頻道` })
        if (args.pop() != 'confirm')
            return msg.reply('需要參數 confirm')

        let channel = (args.length && msg.member.id == dataJson['user']['me']) ? await client.channels.fetch(args[0]) as Discord.TextChannel : msg.channel as Discord.TextChannel

        let cloneChannel = await channel.clone().catch(() => { return false }) as any;
        if (!cloneChannel) return msg.reply({ content: '無法克隆頻道、亦無法進行清空' })

        channel.delete().catch();
        cloneChannel.send({ content: '這就是 #' + cloneChannel.name + ' 頻道的起點' })

    }
};
