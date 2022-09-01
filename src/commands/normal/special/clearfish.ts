import Discord from "discord.js";
import tools from "../../../utils/tools";
import { ZClient } from "../../../structure/client";
import { CmdType } from "../../../utils/types";

export = {
    name: 'clearfish',
    aliases: ["cf"],
    guilds: ["1002583252923596820"],
    description: '清除釣魚頻道',
    permissions: ["ManageMessages"],
    roles: [],
    type: [CmdType.Universal],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        let categoryId = '1005021325519233106'
        let category = await client.channels.fetch(categoryId) as Discord.CategoryChannel
        let chl = category.children.cache
        for (let [id, channel] of chl) {
            let testchl = await channel.clone()
            testchl.setParent(categoryId, { lockPermissions: false })
            channel.delete()
            if (testchl.type == Discord.ChannelType.GuildText)
                testchl.send({ content: '這就是 #' + testchl.name + ' 頻道的起點' })
        }
    }
};
