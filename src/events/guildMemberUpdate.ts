import Discord from "discord.js";
import auth from "../utils/auth";
import { ZClient } from "../structure/client";
import dataJson from "../data";
import dcUtil from "../utils/discord-util";


export = {
    name: 'guildMemberUpdate',

    async execute(client: ZClient, oldMember: Discord.GuildMember, newMember: Discord.GuildMember) {
        if (!oldMember || !oldMember.user || oldMember.user.bot) return;
        if (!oldMember.guild) return;
        if (!auth.isAuthGuild(oldMember.guild.id)) return;
        switch (oldMember.guild.id){
            case dataJson['guild']['ฅ(•ㅅ•^✿)ฅ']:
                // if (newMember.permissions.has(Discord.PermissionsBitField.Flags.Administrator)){
                //     break;
                // }
                if(auth.isOwnerUser(newMember)){
                    break;
                }
                let echoChannel = await client.channels.fetch('1043413783609094164') as Discord.TextChannel
                let obj = {
                    '團員':'1042368200937066587', 
                    '非團員':'1042371082637807627',
                    '我來聊天的': '1049551551234060349'}

                let welcomeChannelId = {
                    '團員':'1043952513143029941', 
                    '非團員':'1043952575998857319',
                    '我來聊天的': '1043952575998857319'}
                let welcomeChannelContent = {
                    '團員':'1050232371984740403', 
                    '非團員':'1050234035550564402',
                    '我來聊天的': '1050234035550564402'}
                for (let name in obj ){
                    let roleId = obj[name]
                    if(!oldMember.roles.cache.has(roleId) && newMember.roles.cache.has(roleId))
                    {
                        echoChannel.send({content: `<@${newMember.user.id}> 領取身份組 **${name}**`})
                        let welcomeChannel = await client.channels.fetch(welcomeChannelId[name]) as Discord.TextChannel
                        welcomeChannel.send({content: `<@${newMember.user.id}>`,
                            embeds:[buildEmbed(await dcUtil.msg_content(client, '1050231770408296568', welcomeChannelContent[name]))]
                        })
                    }
                    if(!newMember.roles.cache.has(roleId) && oldMember.roles.cache.has(roleId))
                    {
                        echoChannel.send({content: `<@${newMember.user.id}> 移除身份組 **${name}**`})
                    }
                }
                
                
                break;

        }
    }
}


function buildEmbed(description: string):Discord.EmbedBuilder{
    const embed = new Discord.EmbedBuilder()
    .setColor('Aqua')
    .setTitle('投票進行中')
    .setDescription(description)
    .setTimestamp();
    return embed;
}