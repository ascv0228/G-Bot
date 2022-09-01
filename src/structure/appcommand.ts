import Discord from "discord.js";
import { ZClient } from "./client";

interface BaseCommand {

    name: string;
    description: string;
    type?: number;
    options?: Discord.ApplicationCommandOption[];


    execute?(client: ZClient, ...args: any): Promise<void>;
    execute?(client: ZClient, interaction: Discord.CommandInteraction): Promise<void>;
    execute?(client: ZClient, interaction: Discord.CommandInteraction, args: string[]): Promise<void>;
};

export type AppCommand = BaseCommand & Discord.ApplicationCommandDataResolvable;