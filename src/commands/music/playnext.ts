import Discord from "discord.js";
import tools from "../../utils/tools";
import musicDao from "../../database/musicDao";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";

export = {
    name: "playnext",
    aliases: ["pt"],
    description: '插入音樂',
    permissions: [],
    roles: [],
    users: [],
    type: [CmdType.Music],
    usage: [
        "<music-name>",
        "<music-url>"
    ],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (!msg.member.voice.channel) {
            await msg.channel.send({ content: `此命令需在語音頻道中使用!` });
            return;
        }
        if (args.length < 1) {
            await msg.channel.send({ content: `需提供網址或歌名!` });
            return;
        }
        const player = client.manager.players.get(msg.guild.id);
        if (!player || player.queue.size <= 0) {
            await msg.channel.send({ content: `隊列當前無任何曲目 請用 \`${client.prefix}play\`` });
            return
        }
        if (!msg.guild.channels.cache.get(player.voiceChannel)) {
            player.setVoiceChannel(msg.member.voice.channel.id);
        }
        if (msg.member.voice.channel.id != player.voiceChannel) {
            await msg.channel.send({ content: `此命令需和機器人相同頻道才可使用!` });
            return;
        }

        const res = await client.manager.search({
            query: args.join(" "),
            source: "youtube" // youtube or soundcloud
        },
            msg.author
        );

        if (res.loadType == "LOAD_FAILED") throw res.exception;

        if (res.tracks.length <= 0) {
            await msg.channel.send({ content: `未發現任何曲目!` });
            return;
        }

        musicDao.clearMusicByRange(player.guild, 1, player.queue.totalSize)
        let tempQueue = player.queue.remove(0, player.queue.totalSize);

        switch (res.loadType) {
            case "PLAYLIST_LOADED":
                let time = 0;
                res.tracks.forEach((track) => {
                    time += track.duration;
                    player.queue.add(track);
                });

                await msg.channel.send({ content: `成功加入\`${res.tracks.length}\`首歌曲至隊列 \`(${tools.timeFormat(time)})\`` });
                break;
            default:
                player.queue.add(res.tracks[0]);

                await msg.channel.send({ content: `🎶 已將曲目 \`${res.tracks[0].title}\` 加入隊列` });
                break;
        }
        player.queue.add(tempQueue);
        musicDao.addMusicsToQueue(player.guild, player.queue);

    },
};