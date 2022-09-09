import Discord from "discord.js";
import { AnyBulkWriteOperation } from "mongodb";
import { BotMessage } from "../botinfo";
import { ZClient } from "../client";
import { Executor } from "../executor";

export interface Preference {
    prefix: string;
    mainGuild: string;
    cooldown: Discord.Collection<string, number>;
    botStatus: Discord.Collection<string, any>;
    useCommandChannel: Discord.TextChannel
    updateCoolDown(this: ZClient, message: Discord.Message, exec: Executor): void;
    coolDownExpired(this: ZClient, message: Discord.Message, exec: Executor): boolean;
    getChannelInfo(this: ZClient, gid: string, cid: string, author?: Discord.User): BotMessage;
}