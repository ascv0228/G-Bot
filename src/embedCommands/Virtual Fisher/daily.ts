import Discord from "discord.js";
import tools from "../../utils/tools";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dataJson from "../../data"


export = {
    name: "Virtual Fisher Daily",
    mat: /^Daily reward$/,
    guilds: [],
    description: 'Virtual Fisher 每日提醒',
    permissions: [],
    roles: [],
    users: [dataJson["user"]['vf_bot']],
    type: [CmdType.Bot],
    bot: true,

    async execute(client: ZClient, msg: Discord.Message, embed: Discord.Embed) {
        if (!(msg.interaction && msg.interaction.commandName == 'daily')) return;

        if (msg.interaction.user.id != process.env.BOT_OWNER) return;

        client.botStatus['daily'] = true;
        let channelID = dataJson["channel"]["botStatus_main"]
        let msg_id = dataJson["msg_id"]["VfDaily"]
        let channel = await client.channels.fetch(channelID) as Discord.TextChannel
        let message = await channel.messages.fetch(msg_id);
        (await message.edit(`test`)).edit('`釣魚機器人` 狀態: 已完成 (✅)')

    }
};

