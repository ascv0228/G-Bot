import Discord from "discord.js";
import { ZClient } from "../client";
import { Executor } from "../executor";

export interface Schedule {
    schedules: Discord.Collection<string, Executor>
    activity_time: Map<string, string>;  // msgId, time_string
    loadSchedules(this: ZClient): Promise<any>;
}