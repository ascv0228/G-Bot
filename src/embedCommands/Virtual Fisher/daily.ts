import Discord from "discord.js";
import tools from "../../utils/tools";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";


export = {
    name: "Virtual Fisher Verify",
    mat: /^Daily reward$/,
    guilds: [],
    description: 'Virtual Fisher 每日提醒',
    permissions: [],
    roles: [],
    users: ['574652751745777665'],
    type: [CmdType.Bot],
    bot: true,

    async execute(client: ZClient, msg: Discord.Message, embed: Discord.Embed) {
        if (!(msg.interaction && msg.interaction.commandName == 'daily')) return;
        if (msg.interaction.user.id != process.env.BOT_OWNER) return;

        client.botStatus['daily'] = true;
        msg.channel.send(`<@${msg.interaction.user.id}> 今天完成vf-daily`);
        let channelID = '991256310563733564'
        let msg_id = '1016235047797407754'
        let channel = await client.channels.fetch(channelID) as Discord.TextChannel
        let message = await channel.messages.fetch(msg_id);
        message.edit('`釣魚機器人` 狀態: 已完成 (✅)')

    }
};

