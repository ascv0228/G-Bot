import Discord from "discord.js";
import tools from "./tools";
import { Executor } from "../structure/executor";
import { CmdType } from "../utils/types";
import { ReactionHandle } from "../structure/reactionExecutor";
import dcUtil from "../utils/discord-util";

export default {
    hasCommmandAuth(member: Discord.GuildMember, exec: Executor): boolean {
        let isAuth =
            (!exec.permissions || exec.permissions.length <= 0) &&
            (!exec.roles || exec.roles.length <= 0) &&
            (!exec.users || exec.users.length <= 0);

        if (exec.permissions) {
            for (const perm of exec.permissions) {
                if (member.permissions.has(Discord.PermissionsBitField.Flags[perm])) {
                    isAuth = true;
                    break;
                }
            }
        }


        if (exec.roles) {
            for (const role of exec.roles) {
                if (member.roles.cache.has(role)) {
                    isAuth = true;
                    break;
                }
            }
        }

        if (exec.users) {
            for (const user of exec.users) {
                if (member.id == user) {
                    isAuth = true;
                    break;
                }
            }
        }

        if (isAuth && exec.guilds && exec.guilds.length > 0) {
            isAuth = exec.guilds.includes(member.guild.id);

        }

        if (isAuth && exec.dbAdmin) {
            isAuth = member.permissions.has(Discord.PermissionsBitField.Flags.ManageGuild);
        }

        if (isAuth && exec.developer) {
            isAuth = this.isDeveloperUser(member);
        }
        if (isAuth && exec.type && exec.type.includes(CmdType.Owner)) {
            isAuth = this.isOwnerUser(member);
        }

        return isAuth;
    },

    ReactionEmojiAuth(reaction: Discord.MessageReaction, member: Discord.GuildMember, reactionHandle: ReactionHandle): boolean {
        let emoji_Tag = dcUtil.uniqueEmoji(reaction.emoji);
        if (reactionHandle.unable) {
            if (reactionHandle.unable['roles'] && reactionHandle.unable['roles'].length != 0) {
                if (member.roles.cache.hasAny(...reactionHandle.unable['roles'])) {
                    reaction.users.remove(member.user.id);
                    return false
                }
            }
            if (reactionHandle.unable['users'] && reactionHandle.unable['users'].length != 0) {
                if (reactionHandle.unable['users'].includes(member.user.id)) {
                    reaction.users.remove(member.user.id);
                    return false
                }
            }
        }
        if (reactionHandle.enable) {
            if (reactionHandle.enable['roles'] && reactionHandle.enable['roles'].length != 0) {
                if (!member.roles.cache.hasAny(...reactionHandle.enable['roles'])) {
                    reaction.users.remove(member.user.id);
                    return false
                }
            }
            if (reactionHandle.enable['users'] && reactionHandle.enable['users'].length != 0) {
                if (!reactionHandle.enable['users'].includes(member.user.id)) {
                    reaction.users.remove(member.user.id);
                    return false
                }
            }
        }
        if (reactionHandle.clear_this_emoji) {
            reaction.users.remove(member.user.id);
            return !tools.checkInArrayOrObject(emoji_Tag, reactionHandle.emoji)
        }
        if (reactionHandle.clear_other_emoji && !tools.checkInArrayOrObject(emoji_Tag, reactionHandle.emoji)) {
            reaction.users.remove(member.user.id);
        }
        if (reactionHandle.clear_options_emoji) {
            for (let e_index in reactionHandle.emoji) {
                let e_tag = reactionHandle.emoji[e_index]
                if (e_tag == emoji_Tag)
                    continue;
                let r = reaction.message.reactions.resolve(e_tag)
                if (!!r) {
                    r.users.remove(member.user.id);
                }
            }
        }

        return tools.checkInArrayOrObject(emoji_Tag, reactionHandle.emoji)
    },
    isFriendUser(member: Discord.GuildMember): boolean {
        return [
            "212524823367254017",
            "411895879935590411"
        ].includes(member.user.id);
    },

    isDeveloperUser(member: Discord.GuildMember): boolean {
        return [
            "765629373084074064", // Z
            "411895879935590411", // G
            "212524823367254017", // Y
            "702385586941722654", // X
            "830469275528986695", // Q
            "342604295520124939", // M
        ].includes(member.user.id);
    },

    isOwnerBot(member: Discord.GuildMember): boolean {
        return [
            "848194732143542324", // G器人
            "993175612225241138"  // 測試G
        ].includes(member.user.id);
    },

    isOwnerUser(member: Discord.GuildMember): boolean {
        return [
            "411895879935590411", // G
        ].includes(member.user.id);
    },

    isSpecUser(member: Discord.GuildMember): boolean {
        return [
            "745250432330498118",
            "745250432330498118",
            "825342781622190100",
            "836145508032315403"
        ].includes(member.user.id);
    },

    hasSpecAuth(member: Discord.GuildMember): boolean {
        return member.roles.cache.hasAny(...[
            "846777928414003231"
        ]);
    },

    isSpecCrewUser(id: string): boolean {
        return [
            "uChDu0o88vfL8alF6muJqub042J3",
            "cIJ5ykZj0qZgVqYOnPBtNQ2UeR43",
            "DTPOgjj08CaYjxdi380qWOWT0z83",
            "nbPTA2EULUcBSHGbybQuVPYShNb2",
            "8x9hbJh9KJWaMB7yDSgC26jJcts2",
            "UaT9Cs8kwDZ5qH0CqdJvEFaCkhf2",
            "LWxY2NApgXeQLRBL2RsmtsFMNDt2",
            "S1EAyrymWxUNAfvLmZr8IJEJqhO2",
            "ziNpx3SnVKNaj5fpSQOe0N9WnP63",
            "SuS7OOmRYNcwxiFAw0UDYUTYZkk1",
            "wUENRIwWYPX3PIeQ5NFbds9cXEI2"
        ].includes(id);
    },

    isAuthGuild(id: string): boolean {
        return [
            "829673608791851038",
            "844980689093918751",
            "867357573031919676",
            "988795992667193395", // 臭GG
            "901498054077714462", // CHEGG
            "964526913861341254", // 秘密基地
            "966859511098916914", // 阿薰家
            "1002583252923596820", // 不怕困難家
        ].includes(id);
    },

    isOnlyAuthMusicGuild(id: string): boolean {
        return [
            "867357573031919676",
        ].includes(id);
    },

    isOnlyAuthMusicCommand(exec: Executor): boolean {
        return exec.type && (exec.type.includes(CmdType.Music) || exec.type.includes(CmdType.Universal));
    },

    isAuthChannel(msg: Discord.Message, exec: Executor): boolean {
        const channels = tools.getChannelConfig(msg, exec);
        return !channels || channels.length <= 0 || channels.includes(msg.channel.id) || (msg.channel.isThread() && channels.includes(msg.channel.parentId));
    },

    isAllowWebhook(member: Discord.GuildMember): boolean {
        return ['574652751745777665'].includes(member.user.id);
    },
};