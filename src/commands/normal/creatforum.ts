import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";


export = {
    name: "creatforum",
    aliases: [],
    description: '建立 論壇 頻道',
    permissions: ['Administrator'],
    roles: [],
    type: [CmdType.Universal],


    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (args.length == 0)
            return msg.reply('需要參數: category頻道ID');
        try {
            await createForumChannel(msg.guild, 'new forum', args[0])
            msg.reply('Finish')
        }
        catch {

        }

    }
};
async function createForumChannel(guild: Discord.Guild, name: string, categoryId: string) {
    guild.channels.create({
        name: name,
        type: Discord.ChannelType.GuildForum,
        parent: categoryId,
    });
}