import Discord from "discord.js";
import { ZClient } from "./client";

export interface Executor {
    name?: string;
    bot?: boolean;
    aliases?: string[];
    listens?: string[];
    description?: string;
    permissions?: string[];
    roles?: string[];
    users?: string[];
    cooldown?: number & { [key: string]: number };
    channels?: string[] & { [key: string]: string[] };
    guilds?: string[]
    once?: boolean;
    interval?: number;
    hide?: boolean;
    type?: string[];
    slashType?: string;
    dbAdmin?: boolean;
    example?: string;
    delete?: boolean;
    message_Id?: string[];
    mat?: string;
    usage?: string[] | string[][];
    eggType?: number;
    slash?: { [key: string]: Object[] },


    execute?(client: ZClient): Promise<void>;
    execute?(client: ZClient, ...args: any): Promise<void>;
    execute?(client: ZClient, message: Discord.Message): Promise<void>;
    execute?(client: ZClient, message: Discord.Message, embed: Discord.Embed): Promise<void>;
    execute?(client: ZClient, message: Discord.Message, listen: string): Promise<void>;
    execute?(client: ZClient, message: Discord.Message, args: string[]): Promise<void>;
    execute?(client: ZClient, interaction: Discord.Interaction, args: string[]): Promise<void>;
    execute?(client: ZClient, interaction: Discord.SelectMenuInteraction, args: string[]): Promise<void>;
    execute?(client: ZClient, event: string, reaction: Discord.MessageReaction, user: Discord.User): Promise<void>;
}