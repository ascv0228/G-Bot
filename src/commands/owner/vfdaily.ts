
import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import dataJson from "../../data";

export = {
    name: "vfdaily",
    aliases: ['vf-daily'],
    guilds: [],
    permissions: [],
    users: [dataJson["user"]["me"]],
    description: 'vf-bot daily',
    roles: [],
    type: [CmdType.Owner],
    usage: [""],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        msg.reply(`['daily']: ${String(client.botStatus['daily'])} => ${String(true)}`)
        client.botStatus['daily'] = true
        msg.channel.send(`<@${dataJson['user']['me']}> 已經關閉daily提醒， 記得確實完成`);

        let channelID = dataJson["channel"]["botStatus_main"]
        let msg_id = dataJson["msg_id"]["VfDaily"]
        let channel = await client.channels.fetch(channelID) as Discord.TextChannel
        let message = await channel.messages.fetch(msg_id);
        message.edit('`釣魚機器人` 狀態: 已完成 (✅)').catch()
    }
};

// `釣魚機器人` 狀態: 完成 (:white_check_mark:)