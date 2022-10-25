import Discord from "discord.js";
import tools from "../../utils/tools";
import musicDao from "../../database/musicDao";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";

export = {
    name: "play",
    aliases: ["p"],
    description: '撥放音樂',
    permissions: [],
    roles: [],
    users: [],
    type: [CmdType.Music],
    usage: [
        "<music-name>",
        "<music-url>"
    ],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (args.length < 1) {
            await msg.channel.send({ content: `需提供網址或歌名!` });
            return;
        }

        if (!msg.member.voice.channel) {
            await msg.channel.send({ content: `此命令需在語音頻道中使用!` });
            return;
        }

        let player = client.manager.players.get(msg.guild.id);
        if (!!player && (player.voiceChannel == null || !msg.guild.channels.cache.get(player.voiceChannel))) {
            player.destroy()
        }
        if (!player) {
            player = client.manager.create({
                guild: msg.guild.id,
                voiceChannel: msg.member.voice.channel.id,
                textChannel: msg.channel.id,
            });
        } else {
            if (!player.voiceChannel) {
                player.setVoiceChannel(msg.member.voice.channel.id);
            }
            if (msg.member.voice.channel.id != player.voiceChannel) {
                await msg.channel.send({ content: `此命令需和機器人相同頻道才可使用!` });
                return;
            }
        }

        const state = player.state;
        if (state != "CONNECTED") {
            player.connect();
            player.stop();
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

        switch (res.loadType) {
            case "PLAYLIST_LOADED":
                let time = 0;

                musicDao.addMusicsToQueue(player.guild, res.tracks);

                res.tracks.forEach((track) => {
                    time += track.duration;
                    player.queue.add(track);
                });

                await msg.channel.send({ content: `成功加入\`${res.tracks.length}\`首歌曲至隊列 \`(${tools.timeFormat(time)})\`` });
                break;
            default:
                musicDao.addMusicsToQueue(player.guild, [res.tracks[0]]);

                player.queue.add(res.tracks[0]);

                await msg.channel.send({ content: `🎶 已將曲目 \`${res.tracks[0].title}\` 加入隊列` });
                break;
        }

        if (!player.playing && !player.paused && player.queue.current) {
            player.play();
        }
    },
};