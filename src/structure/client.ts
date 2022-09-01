import Discord from "discord.js";
import { Command } from "./plugin/command";
import { Interaction } from "./plugin/interaction";
import { Task } from "./plugin/task";
import { Event } from "./plugin/event";
import { Message } from "./plugin/message";
import { Preference } from "./plugin/preference";
import { PlayerManager } from "./plugin/playermanager";
import { Schedule } from "./plugin/schedule";
import { Reaction } from "./plugin/reaction";

export interface ZClient extends Discord.Client, Command, Task, Event, Message, Preference, PlayerManager, Interaction, Reaction, Schedule {

}