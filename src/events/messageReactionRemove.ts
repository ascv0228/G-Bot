import Discord from "discord.js";
import auth from "../utils/auth";
import tools from "../utils/tools";
import dcUtil from "../utils/discord-util";
import listenMsgs from "../utils/listenMsgs";
import { ZClient } from "../structure/client";

export = {
    name: 'messageReactionRemove',

    async execute(client: ZClient, reaction: Discord.MessageReaction, user: Discord.User) {
        if (user.bot) return;

        const message = reaction.message.partial ? await reaction.message.fetch() : reaction.message;

        if (!message.member) return;
        if (message.webhookId) return;
        if (!message.guild) return;
        if (!auth.isAuthGuild(message.guild.id) && message.guild.id != '1002583252923596820') return;

        const exec = client.reactions.get(message.id);
        if (exec) {
            const member = await dcUtil.getMemberByID(message.guild, user.id);
            exec.execute(client, this.name, reaction, user);
        }
        const msg = message.partial ? await message.fetch() : message;
        if (auth.isOwnerBot(message.member)) {
            if (!(message.embeds && message.embeds.length == 1))
                return;

            for (let embed of message.embeds) {
                if (!embed.title) continue;
                const exec = client.embedReactions.find(v => !!(embed.title.match(v.mat)));
                if (!exec) continue;
                const member = await dcUtil.getMemberByID(message.guild, user.id);
                try {
                    exec.execute(client, this.name, reaction, user);
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }
};