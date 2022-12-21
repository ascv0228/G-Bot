import Discord from "discord.js";
import { ZClient } from "../client";
import { Executor } from "../executor";

export interface Command {
    commands: Discord.Collection<string, Executor>;
    aliases: Discord.Collection<string, Executor>;
    listens: Discord.Collection<string, Executor>;
    embedCommands: Discord.Collection<string, Executor>;
    eggs: Discord.Collection<string, Executor>;
    monitors: Discord.Collection<string, Executor>;

    loadCommands(this: ZClient): Promise<any>;
    loadEmbedCommands(this: ZClient): Promise<any>;
    loadEggs(this: ZClient): Promise<any>;
}