import Discord from "discord.js";
import path from "path";
import tools from "../utils/tools";
import { ZClient } from "../structure/client";
import { ReactionExecutor, EmbedReactionExecutor } from "../structure/reactionExecutor";
import { Executor } from "../structure/executor";

function loadReactions(this: ZClient) {
    const dirPath = path.resolve(__dirname, `../reactions`);

    return tools.readDirAll(dirPath, (file) => {
        if (file.match(/(\.js|\.ts)$/)) {
            const Reaction: ReactionExecutor = require(file);
            if (Reaction.message_Id) {
                Reaction.message_Id.forEach(message_Id => {
                    this.reactions.set(message_Id, Reaction);
                });
            }
        }
    });
}
function loadEmbedReactions(this: ZClient) {
    const dirPath = path.resolve(__dirname, `../embedReactions`);

    return tools.readDirAll(dirPath, (file) => {
        if (file.match(/(\.js|\.ts)$/)) {
            const embedReaction: EmbedReactionExecutor = require(file);
            if (embedReaction.name) {
                this.embedReactions.set(embedReaction.name, embedReaction);
            }
        }
    });
}



export function install(client: ZClient) {
    client.reactions = new Discord.Collection();
    client.embedReactions = new Discord.Collection();
    client.activity_time = new Map<string, string>(); // msgId, time_string

    client.loadReactions = loadReactions;
    client.loadEmbedReactions = loadEmbedReactions;
    client.loadReactions();
    client.loadEmbedReactions();
}