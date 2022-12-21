import Discord from "discord.js";
import auth from "../utils/auth";
import { ZClient } from "../structure/client";


export = {
    name: 'guildMemberAdd',

    async execute(client: ZClient, member: Discord.GuildMember) {
        if (!member || !member.user || member.user.bot) return;
        if (!member.guild) return;
        if (!auth.isAuthGuild(member.guild.id)) return;
        if (member.guild.id == '829673608791851038') {
            member.roles.add('986888997538246748');
        }
        if (member.guild.id == '1002583252923596820') {
            member.roles.add('1018762530241384489')
        }
        if (member.guild.id == '1042333554085998662'){
            let roleIds = ['1052903492592873513', '1054738844651618375', '1054738667987542016',
            '1054738470637154374', '1054738954013917224']
            member.roles.add(roleIds);

        }
    }
}