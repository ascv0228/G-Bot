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
        let msg1 = await msg.fetchReference();

        console.log("msg1.interaction && msg1.interaction.commandName == 'daily': ", msg1.interaction && msg1.interaction.commandName == 'daily')

        console.log("msg1.interaction.user.id != process.env.BOT_OWNER: ", msg1.interaction.user.id != process.env.BOT_OWNER)

        // msg.channel.send(`<@${msg.interaction.user.id}> 今天完成vf-daily`);

    }
};
