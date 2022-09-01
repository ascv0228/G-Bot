import Discord from "discord.js";
import { ZClient } from "../client";
import { ReactionExecutor, EmbedReactionExecutor } from "../reactionExecutor";

export interface Reaction {
    reactions: Discord.Collection<string, ReactionExecutor>;
    embedReactions: Discord.Collection<string, EmbedReactionExecutor>;
    activity_time: Map<string, string>; // msgId, time_string

    loadReactions(this: ZClient): Promise<any>;
    loadEmbedReactions(this: ZClient): Promise<any>;
}