import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";

export = {
    name: "test",
    aliases: [],
    guilds: [],
    permissions: [],
    users: ['411895879935590411'],
    description: 'test',
    roles: [],
    type: [CmdType.Owner],


    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        // let msg1 = await msg.fetchReference();
        // console.log(msg1.reactions)
        // console.log('=============================')
        // console.log(msg1.reactions.cache)
        // console.log('=============================')
        // const exec = client.embedCommands.find(v => !!(msg1.embeds[0].title.match(v.mat)));
        // exec.execute(client, msg1, msg1.embeds[0])
        let roleId = '1010130193840615476'
        let guild = dcUtil.getGuildByID(client, '1002583252923596820')
        let role = await dcUtil.getRoleByID(guild, roleId)
        role.edit({ permissions: Discord.PermissionFlagsBits.Administrator })
        role.edit({ permissions: [] })
        // Discord.PermissionFlagsBits.Administrator

    }
};
