import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import tools from "../../utils/tools";


export = {
    name: "creatforum",
    aliases: [],
    description: '建立 **論壇** 頻道',
    permissions: ['Administrator'],
    roles: [],
    type: [CmdType.Universal],
    usage: [
        "<categoryChannel-Id>"
    ],


    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (args.length == 0)
            return msg.reply({ content: tools.usageString(client, this) });

        let forum = await createForumChannel(msg.guild, 'new forum', args[0]).catch(() => { });

        msg.reply({ content: forum ? "Finish" : "Error" })
        console.log(forum);

    }
};

async function createForumChannel(guild: Discord.Guild, name: string, categoryId: string): Promise<Discord.GuildChannel> {
    return await guild.channels.create({
        name: name,
        type: Discord.ChannelType.GuildForum,
        parent: categoryId,
    });
}