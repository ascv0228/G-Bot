import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";
import auth from "../utils/auth";

export = {
    name: "guild",

    async execute(client: ZClient, interaction: Discord.SelectMenuInteraction) {
        let member = interaction.member as Discord.GuildMember;
        let value = interaction.values[0];

        let cmd = value.trimEnd().split(/\s+/)[0];
        let guildId = value.trimEnd().split(/\s+/)[1] || null;

        let guild = ((guildId) ? (client.guilds.cache.get(guildId) || interaction.guild)
            : interaction.guild) as Discord.Guild;

        let opt = {};
        switch (cmd) {
            case 'guild-banner':
                opt = {
                    embeds: [new Discord.EmbedBuilder()
                        .setDescription(`${guild.name} 橫幅: `)
                        .setImage(guild.bannerURL({ size: 4096, forceStatic: false }))
                        .setFooter({
                            text: (member.user as Discord.User).tag,
                            iconURL: (member as Discord.GuildMember).displayAvatarURL({ forceStatic: false })
                        })]
                }
                break;
            case 'guild-icon':
                opt = {
                    embeds: [new Discord.EmbedBuilder()
                        .setDescription(`${guild.name} 頭貼: `)
                        .setImage(guild.iconURL({ size: 4096, forceStatic: false }))
                        .setFooter({
                            text: (member.user as Discord.User).tag,
                            iconURL: (member as Discord.GuildMember).displayAvatarURL({ forceStatic: false })
                        })]
                };
                break;
            case 'guild-splash':
                opt = {
                    embeds: [new Discord.EmbedBuilder()
                        .setDescription(`${guild.name} 邀請連結背景: `)
                        .setImage(getSplashUrl(guild.id, guild.splash))
                        .setFooter({
                            text: (member.user as Discord.User).tag,
                            iconURL: (member as Discord.GuildMember).displayAvatarURL({ forceStatic: false })
                        })]
                };
                break;
            case 'guild-info':
                opt = { embeds: [await getGuildInfoEmbed(guild, member)] };
                break;
            case 'guild-invite':
                opt = await getGuildInviteOption(guild, member);
                break;


        }
        interaction.update(opt);
        return;
    }
};

function getSplashUrl(guildId: string, splashHash: string): string {
    return `https://cdn.discordapp.com/splashes/${guildId}/${splashHash}.jpg?size=4096`
}

async function getGuildInfoEmbed(guild: Discord.Guild, member: Discord.GuildMember) {
    let invite = (guild.vanityURLCode) ? `https://discord.gg/${(await guild.fetchVanityData()).code}` : null;
    let members = (await guild.members.fetch())
    let memberBot = members.filter(m => m.user.bot).size
    let memberOnline = members.filter(m => m.presence && m.presence.status == 'online').size

    return new Discord.EmbedBuilder()
        .setDescription(`${guild.name} 一般資訊: `)
        .setImage(getSplashUrl(guild.id, guild.splash))
        .addFields(
            {
                name: '擁有者', value: `${await dcUtil.getMemberByID(guild, guild.ownerId)}`,
                inline: true
            },
            { name: '創建時間', value: `${guild.createdAt.toLocaleString('zh-TW', { timeZone: 'UTC' })}`, inline: true },
            {
                name: '自訂邀請連結',
                value: `${invite ? `邀請連結: https://discord.gg/${guild.vanityURLCode}` : '無自訂邀請連結'})`,
                inline: true
            },
        )
        .addFields(
            { name: '加成等級', value: `${guild.premiumTier}`, inline: true },
            { name: '加成數量', value: `${guild.premiumSubscriptionCount}`, inline: true },
            {
                name: '成員數量',
                value: [`${guild.memberCount} 位成員`,
                `${memberOnline} 位上線中`,
                `${memberBot} 位機器人`,
                `${guild.memberCount - memberBot} 位真人`
                ].join('\n'),
                inline: true
            },
        )
        .setThumbnail(guild.iconURL({ size: 1024, forceStatic: false }))
        .setFooter({
            text: (member.user as Discord.User).tag,
            iconURL: (member as Discord.GuildMember).displayAvatarURL({ forceStatic: false })
        });


}

async function getGuildInviteOption(guild: Discord.Guild, member: Discord.GuildMember) {
    let hasVanity = guild.vanityURLCode;
    if (hasVanity) {
        let vanity = await guild.fetchVanityData();
        return { content: `https://discord.gg/${vanity.code}` };
    }

    const invites = await guild.invites.fetch();
    for (let [code, inv] of invites) {
        if (inv.maxAge == 0)
            return { content: `https://discord.gg/${code}` };
    }

    if (auth.isDeveloperUser((member as Discord.GuildMember)))
        return { content: (await dcUtil.createInvite(guild, { maxAge: 0, maxUses: 0 })).url }
    else if ((member.permissions as Discord.PermissionsBitField).has(Discord.PermissionsBitField.Flags['CreateInstantInvite']))
        return { content: (await dcUtil.createInvite(guild)).url }

    return { content: `無邀請連結`}
}