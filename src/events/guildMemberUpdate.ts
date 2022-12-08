import Discord from "discord.js";
import auth from "../utils/auth";
import { ZClient } from "../structure/client";
import dataJson from "../data";


export = {
    name: 'guildMemberUpdate',

    async execute(client: ZClient, oldMember: Discord.GuildMember, newMember: Discord.GuildMember) {
        if (!oldMember || !oldMember.user || oldMember.user.bot) return;
        if (!oldMember.guild) return;
        if (!auth.isAuthGuild(oldMember.guild.id)) return;
        switch (oldMember.guild.id){
            case dataJson['guild']['ฅ(•ㅅ•^✿)ฅ']:
                if (newMember.permissions.has(Discord.PermissionsBitField.Flags.Administrator)){
                    break;
                }
                let echoChannel = await client.channels.fetch('1043413783609094164') as Discord.TextChannel
                let obj = {'團員':'1042368200937066587'/*團員*/, 
                    '非團員':'1042371082637807627'/*非團員*/}
                for (let name in obj ){
                    let roleId = obj[name]
                    if(!oldMember.roles.cache.has(roleId) && newMember.roles.cache.has(roleId))
                    {
                        echoChannel.send({content: `<@${newMember.user.id}> 領取身份組 **${name}**`})
                        
                    }
                }
                
                
                break;

        }
    }
}