import Discord from "discord.js";
import auth from "../utils/auth";
import { ZClient } from "../structure/client";
import { EventType } from "../utils/types";
import rewardUtil from '../utils/reward-util';
import dcUtil from "../utils/discord-util";
import tools from "../utils/tools";
import dataJson from "../data"

export = {
    name: 'messageCreate',

    async execute(client: ZClient, message: Discord.Message) {
        if (!message.member) return;
        if (message.webhookId && !auth.isAllowWebhook(message.member)) return;
        if (!message.guild) return;
        if (!auth.isAuthGuild(message.guild.id) /*&& message.guild.id != '1002583252923596820'*/) return;


        if (message.embeds) {
            for (let embed of message.embeds) {

                if (!embed.title) continue;

                const exec = client.embedCommands.find(v => !!(embed.title.match(v.mat)));

                if (!exec) continue;

                if (!auth.hasCommmandAuth(message.member, exec)) continue;

                try {
                    exec.execute(client, message, embed);
                } catch (error) {
                    console.error(error);
                }
            }

        }

        if (message.guild.id == dataJson.guild['RD_main'] &&
            message.attachments && message.attachments.size &&
            !message.author.bot) {

            let ImgLogChannel = await message.guild.channels.fetch("1041588918434406490") as Discord.TextChannel
            if (!((message.channel as Discord.TextChannel).nsfw && !ImgLogChannel.nsfw))
                tools.messageWithAttachments(message, ImgLogChannel);
        }

        client.listens.forEach((exec) => {
            if (!auth.hasCommmandAuth(message.member, exec)) return;
            if (!exec.bot && message.author.bot) return;
            let needListen = exec.listens.includes(message.channel.id) ||
                (message.channel.isThread() && exec.listens.includes(message.channel.parentId));

            if (!needListen) return;

            try {
                exec.execute(client, message);
            } catch (error) {
                console.error(error);
            }
        });

        do{
            let m = client.monitors.get(message.author.id);
            if (!m) break;
            m.execute(client, message);
        }while(0);

        let execed = false;
        let deleted = false;
        const lines = message.content.trim().split("\n");

        for (let i = 0; i < lines.length; ++i) {
            const line = lines[i];

            if (!line.startsWith(client.prefix)) continue;

            const [cmd, ...args] = line.slice(client.prefix.length).trimEnd().split(/\s+/);

            const exec = client.commands.get(cmd) || client.aliases.get(cmd);

            if (!exec) continue;

            if (!exec.bot && message.author.bot) continue;

            if (auth.isOnlyAuthMusicGuild(message.guild.id) && !auth.isOnlyAuthMusicCommand(exec)) continue;

            if (!auth.isAuthChannel(message, exec)) continue;

            if (!auth.hasCommmandAuth(message.member, exec)) continue;

            if (exec.delete && !deleted && message.deletable) deleted = !!await message.delete();

            if (!client.coolDownExpired(message, exec)) continue;

            try {
                execed = true;
                exec.execute(client, message, args);

                dcUtil.command_embed(client, message, line);
            } catch (error) {
                console.error(error);
            }

            client.updateCoolDown(message, exec);
        }

        if (!execed && !message.author.bot) {
            client.emit(EventType.eggsAppear, message);
        }
    },
};