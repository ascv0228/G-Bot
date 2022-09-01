import Discord from "discord.js";
import { ZClient } from "../client";
import { AppCommand } from "../appcommand";

export interface Interaction {
    interactions: Discord.Collection<string, AppCommand>;
    slashCommands: Discord.Collection<string, AppCommand>;
    loadSlashCommands(this: ZClient): Promise<any>;
    loadInteractions(this: ZClient): Promise<any>;
}