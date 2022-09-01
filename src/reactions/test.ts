import Discord from "discord.js";
import tools from "../utils/tools";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";

export = {
    name: "test",
    message_Id: ["991267187660693504"],
    type: ['test'],

    async execute(client: ZClient, event: string, reaction: Discord.MessageReaction, user: Discord.User) {
        const reactionTag = reaction.emoji.id ? `<:${reaction.emoji.name}:${reaction.emoji.id}>` : reaction.emoji.name;

        switch (event) {
            case 'messageReactionAdd':
                reaction.message.channel.send(`${user.username || user.id || user} Add ${reactionTag}`)
                break;
            case 'messageReactionRemove':
                reaction.message.channel.send(`${user.username || user.id || user} Remove ${reactionTag}`)
                break;

        }
    }
};
