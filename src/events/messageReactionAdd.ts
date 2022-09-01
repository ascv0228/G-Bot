import Discord from "discord.js";
import auth from "../utils/auth";
import tools from "../utils/tools";
import dcUtil from "../utils/discord-util";
import listenMsgs from "../utils/listenMsgs";
import { ZClient } from "../structure/client";

export = {
    name: 'messageReactionAdd',

    async execute(client: ZClient, reaction: Discord.MessageReaction, user: Discord.User) {
        if (user.bot) return;
        if (!reaction.message.member) return;
        if (reaction.message.webhookId) return;
        if (!reaction.message.guild) return;
        if (!auth.isAuthGuild(reaction.message.guild.id)) return;
        const exec = client.reactions.get(reaction.message.id);
        if (exec) {
            const member = await dcUtil.getMemberByID(reaction.message.guild, user.id);
            if (!auth.ReactionEmojiAuth(reaction, member, exec.handle_Obj.get(reaction.message.id)))
                return;
            exec.execute(client, this.name, reaction, user);
        }
        const msg = reaction.message.partial ? await reaction.message.fetch() : reaction.message;
        if (auth.isOwnerBot(reaction.message.member)) {
            if (!(reaction.message.embeds && reaction.message.embeds.length == 1))
                return;

            for (let embed of reaction.message.embeds) {
                if (!embed.title) continue;
                const exec = client.embedReactions.find(v => !!(embed.title.match(v.mat)));
                if (!exec) continue;
                const member = await dcUtil.getMemberByID(reaction.message.guild, user.id);
                if (!auth.ReactionEmojiAuth(reaction, member, exec.handle_Obj)) continue;
                try {
                    exec.execute(client, this.name, reaction, user);
                } catch (error) {
                    console.error(error);
                }
            }
        }

    }
};