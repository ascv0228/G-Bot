import Discord from "discord.js";

export type ReactionOption = Discord.ReactionCollectorOptions

export interface MessageOption extends Discord.MessageCollectorOptions {
    end?(collected: Discord.Collection<string, Discord.Message<boolean>>): Promise<void>;
}