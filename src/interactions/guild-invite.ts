import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";
import auth from "../utils/auth";

export = {
    name: "guild-invite",

    async execute(client: ZClient, interaction: Discord.SelectMenuInteraction, args: string[]) {
        let member = interaction.member;

        let guild = client.guilds.cache.get(args[0]);
        let hasVanity = guild.vanityURLCode;
        if (hasVanity) {
            let vanity = await guild.fetchVanityData();
            return interaction.channel.send(`https://discord.gg/${vanity.code}`);
        }

        const invites = await guild.invites.fetch();
        for (let [code, inv] of invites) {
            if (inv.maxAge == 0) return interaction.channel.send(`https://discord.gg/${code}`);
        }

        if (auth.isDeveloperUser((member as Discord.GuildMember)))
            return interaction.channel.send({ content: (await dcUtil.createInvite(guild, { maxAge: 0, maxUses: 0 })).url })
        else
            if ((member.permissions as Discord.PermissionsBitField).has(Discord.PermissionsBitField.Flags['CreateInstantInvite']))
                return interaction.channel.send({ content: (await dcUtil.createInvite(guild)).url })

        return interaction.channel.send(`無邀請連結`);

    }
}

