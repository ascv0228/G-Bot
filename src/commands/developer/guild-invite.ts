
import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";


export = {
    name: "guild-invite",
    aliases: ['invite'],
    description: '取得伺服器邀請連結',
    roles: [],
    type: [CmdType.Developer],


    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        let guild = msg.guild;
        let hasVanity = guild.vanityURLCode;
        if (hasVanity) {
            let vanity = await guild.fetchVanityData();
            return msg.reply(`https://discord.gg/${vanity.code}`);
        }

        const invites = await guild.invites.fetch();
        for (let [code, inv] of invites) {
            if (inv.maxAge == 0) return msg.reply(`https://discord.gg/${code}`);
        }

        return msg.reply({ content: (await dcUtil.createInvite(guild)).url })

    }
}
