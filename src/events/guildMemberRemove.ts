// guildMemberRemove

import Discord from "discord.js";
import auth from "../utils/auth";
import { ZClient } from "../structure/client";

let guild_cId = {
    '901498054077714462': '1019254792670949436',
    '1032880609883856937': '1032880609909026845'
}

export = {
    name: 'guildMemberRemove',

    async execute(client: ZClient, member: Discord.GuildMember) {
        if (!member || !member.user) return;
        if (!member.guild || !auth.isAuthGuild(member.guild.id)) return;

        if (member.guild.id in guild_cId) {
            let chl = (await member.guild.channels.fetch(guild_cId[member.guild.id])) as Discord.TextChannel
            chl.send({ content: `<@${member.user.id}> (${member.nickname || member.user.username}) left guild: "${member.guild.name}"` });
        }
    }
}