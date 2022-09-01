import Discord from "discord.js";
import { ZClient } from "../client";
import { Executor } from "../executor";

export interface Task {
    tasks: Discord.Collection<string, Executor>;
    loadTasks(this: ZClient): Promise<any>;
    runTasks(this: ZClient): void;
}
