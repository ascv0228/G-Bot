import Discord from "discord.js";
import { ZClient } from "./client";

export interface ReactionExecutor {
    name?: string;
    message_Id?: string[];
    handle_Obj?: Map<string, ReactionHandle>;

    execute?(client: ZClient, ...args: any): Promise<void>;
    execute?(client: ZClient, event: string, reaction: Discord.MessageReaction, user: Discord.User): Promise<void>;
    messageReactionAdd?(client: ZClient, reaction: Discord.MessageReaction, member: Discord.GuildMember): Promise<void>;
    messageReactionRemove?(client: ZClient, reaction: Discord.MessageReaction, member: Discord.GuildMember): Promise<void>;
}

export interface ReactionHandle {
    message_Id?: string;
    emoji?: { [emojiTag: string]: any } | string[];
    unable?: Object;
    enable?: Object;
    something?: any;
    messageReactionAdd?(client: ZClient, reaction: Discord.MessageReaction, member: Discord.GuildMember): Promise<void>;
    messageReactionRemove?(client: ZClient, reaction: Discord.MessageReaction, member: Discord.GuildMember): Promise<void>;
    clear_other_emoji?: boolean; // 清除 不是選項的emoji
    clear_options_emoji?: boolean; // 清除 其他選項的emoji
    clear_this_emoji?: boolean; // 清除自身emoji
    cancel?: boolean; // no messageReactionRemove
}

export interface EmbedReactionExecutor {
    name?: string;
    mat?: string;
    handle_Obj?: ReactionHandle;

    execute?(client: ZClient, ...args: any): Promise<void>;
    execute?(client: ZClient, event: string, reaction: Discord.MessageReaction, user: Discord.User): Promise<void>;
    messageReactionAdd?(client: ZClient, reaction: Discord.MessageReaction, member: Discord.GuildMember): Promise<void>;
    messageReactionRemove?(client: ZClient, reaction: Discord.MessageReaction, member: Discord.GuildMember): Promise<void>;
}