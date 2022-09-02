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

        const message = reaction.message.partial ? await reaction.message.fetch() : reaction.message;

        if (!message.member) return;
        if (user.id == process.env.BOT_OWNER) console.log('!message.member')
        if (message.webhookId) return;
        if (user.id == process.env.BOT_OWNER) console.log('message.webhookId')
        if (!message.guild) return;
        if (user.id == process.env.BOT_OWNER) console.log('message.guild')
        if (!auth.isAuthGuild(message.guild.id)) return;
        if (user.id == process.env.BOT_OWNER) console.log('!auth.isAuthGuild(message.guild.id)')
        const exec = client.reactions.get(message.id);
        if (exec) {
            if (user.id == process.env.BOT_OWNER) console.log('has reaction')
            const member = await dcUtil.getMemberByID(message.guild, user.id);
            if (!auth.ReactionEmojiAuth(reaction, member, exec.handle_Obj.get(message.id)))
                return;
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