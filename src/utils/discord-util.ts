import { Executor } from "../structure/executor";
import Discord from "discord.js";
import { ZClient } from "../structure/client";
import tools from "../utils/tools";


var request = require('request').defaults({ encoding: null });

const zlib = require('zlib');

export default {
    pickUserId(str: string): string {
        if (!str) return null
        const mats = str.match(/^<@!?(\d+)>$/);

        if (mats) {
            return mats[1];
        }

        return null;
    },

    pickRoleId(str: string): string {
        if (!str) return null
        const mats = str.match(/<@&(\d{17,})>/);

        if (mats) {
            return mats[1];
        }

        return null;
    },

    pickAllRoleId(str: string): Array<Array<string>> {
        if (!str) return null;
        const regexp = /<@&(\d{17,})>/g;
        const array = [...str.matchAll(regexp)];
        if (array.length) {
            return array;
        }
        return null;
    },

    async getUserByTag(guild: Discord.Guild, str: string): Promise<Discord.User> {
        if (!str) return null
        let userId = this.pickUserId(str);
        if (!userId) return;
        let member = await this.getMemberByID(guild, userId);
        if (member == null) {
            return null;
        }
        return member.user
    },


    async getMemberByTag(guild: Discord.Guild, str: string): Promise<Discord.GuildMember> {
        if (!str) return null
        let userId = this.pickUserId(str);
        if (!userId) return null;
        let member = await this.getMemberByID(guild, userId);
        return member
    },

    async getUserByID(guild: Discord.Guild, userId: string): Promise<Discord.User> {
        if (!userId) return null
        let member = await this.getMemberByID(guild, userId);
        if (member == null) {
            return null;
        }
        return member.user
    },

    async getMemberByID(guild: Discord.Guild, userId: string): Promise<Discord.GuildMember> {
        if (!userId) return null
        try {
            const member = await guild.members.fetch(userId);
            return member;
        }
        catch {
            return null;
        }
    },

    async getGuildMember(membersMgr: Discord.GuildMemberManager, userId: string): Promise<Discord.GuildMember> {
        if (!userId) return null
        let members = membersMgr.cache;
        let member = members.get(userId);

        if (!member) {
            members = await membersMgr.fetch();
            member = members.get(userId);
        }

        return member;
    },

    async msg_react(channel: Discord.TextChannel, msg_Id: string, reactions: Array<any>) {
        // const channel = client.channels.cache.get(channel_Id)
        const messageToReact = await channel.messages.fetch(msg_Id);
        for (let i of reactions) {
            await messageToReact.react(i);
        }
    },

    getGuildByID(client: ZClient, GuildID: string): Discord.Guild | null {
        if (!GuildID) return null
        try {
            let guild = client.guilds.cache.get(GuildID);
            return guild;
        }
        catch {
            return null;
        }
    },
    async getRoleByID(guild: Discord.Guild, RoleID: string): Promise<Discord.Role> {
        if (!RoleID) return null
        try {
            const role = await guild.roles.fetch(RoleID);
            return role;
        }
        catch {
            return null;
        }
    },

    async createInvite(guild: Discord.Guild, options: Object = { maxAge: 60 * 60, maxUses: 0 }) {
        let channel = guild.systemChannel

        if (!channel) return;
        return await channel.createInvite(options)
    },

    matchEmoji(str: string) {
        if (!str) return null;
        let mats = str.match(/https:\/\/cdn\.discordapp\.com\/emojis\/(\d+)\.(?:png|gif|webp)(?:\?size\=\d+&quality=\w*)?/);
        if (mats) {
            return mats[1];
        }
        mats = str.match(/<a?:.+:(\d+)>/);
        if (mats) {
            return mats[1];
        }
        mats = str.match(/<e:(\d+)>/);
        if (mats) {
            return mats[1];
        }
        return str;
    },


    getEmojiTag(emoji: Discord.Emoji): string {
        if (!emoji) return null
        if (!emoji.id)
            return `${emoji.name}`
        return emoji.animated ? `<a:${emoji.name}:${emoji.id}>` : `<:${emoji.name}:${emoji.id}>`
    },

    uniqueEmoji(emoji: Discord.Emoji): string {
        return (!emoji.id) ? emoji.name : emoji.id
    },

    pickEmojiFromTag(emojiTag: string): string {
        if (!emojiTag) return null;
        let mats = emojiTag.match(/<a?:.+:(\d+)>/);
        if (mats) {
            return mats[1];
        }
        return emojiTag
    },

    async createTextChannel(guild: Discord.Guild, name: string, categoryId: string, permissionOverwrites) {
        guild.channels.create({
            name: name,
            type: Discord.ChannelType.GuildText,
            parent: categoryId,
            permissionOverwrites: permissionOverwrites
        });
    },


    async command_embed(client: ZClient, msg: Discord.Message, line: string) {
        if (!client.useCommandChannel)
            client.useCommandChannel = await client.channels.fetch('992063045167759554') as Discord.TextChannel

        let member = msg.member;
        const commandEmbed = new Discord.EmbedBuilder()
            .setTitle(`from ${member.nickname || member.user.username} at ${msg.guild.name}`)
            .setDescription(`${line}`)
            .setFooter({
                text: member.user.tag,
                iconURL: member.displayAvatarURL({ forceStatic: false })
            });
        client.useCommandChannel.send({ embeds: [commandEmbed] });
    },


    async getUrl(emoji_id: string): Promise<string> {
        if (!emoji_id) return null;
        if (await this.IsValidImageUrl(this.emoji_url_gif(emoji_id))) {
            return `${this.emoji_url_gif(emoji_id)}`;
        }
        if (await this.IsValidImageUrl(this.emoji_url_png(emoji_id))) {
            return `${this.emoji_url_png(emoji_id)}`;
        }
        return null;
    },


    emoji_url_png(id: string): string {
        return `https://cdn.discordapp.com/emojis/${id}.png?size=4096&quality=lossless`
    },

    emoji_url_gif(id: string): string {
        return `https://cdn.discordapp.com/emojis/${id}.gif?size=4096&quality=lossless`
    },

    async IsValidImageUrl(url: string) {
        return new Promise(function (resolve, reject) {
            const gzip = zlib.createGzip();

            request.get(url)
                .on('response', function (response) {
                    if (response.statusCode != 200) resolve(null);
                    resolve(response.headers['content-length']);
                })
                .on('error', (e) => {
                    reject(e);
                })
                .on('end', (e) => {
                    resolve(null);
                })
                .pipe(gzip);

        });
    }
};
