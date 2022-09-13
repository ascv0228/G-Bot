import Discord from "discord.js";
import tools from "../../utils/tools";
import musicDao from "../../database/musicDao";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";

export = {
    name: "search",
    aliases: ["sch"],
    description: '搜尋音樂',
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
        if (!player) {
            player = client.manager.create({
                guild: msg.guild.id,
                voiceChannel: msg.member.voice.channel.id,
                textChannel: msg.channel.id,
            });
        } else {
            if (msg.member.voice.channel.id != player.voiceChannel) {
                await msg.channel.send({ content: `此命令需和機器人相同頻道才可使用!` });
                return;
            }
        }

        const res = await client.manager.search({
            query: args.join(" "),
            source: "youtube" // youtube or soundcloud
        },
            msg.author
        );

        if (res.loadType == "LOAD_FAILED") throw res.exception;

        if (res.loadType == "PLAYLIST_LOADED") throw {
            message: "Playlists are not supported with this command. Use ?playlist "
        };

        if (res.tracks.length <= 0) {
            await msg.channel.send({ content: `未發現任何曲目!` });
            return;
        }

        res.tracks = res.tracks.slice(0, 10);

        let i = 0;
        const sendMsgs = await tools.sendEmbedMultiMessage(msg, res.tracks, "🔎 **搜尋清單**", 30, (track) => {
            const stream = track.isStream ? `LIVE` : tools.timeFormat(track.duration);
            return `\`${++i}.\` \`${track.title}\` - \`${stream}\`\n\n`;
        });

        let index = -1;
        const filter = (m) => {
            if (m.author.id != msg.author.id) return false;
            if (!m.content.match(/^-?\d+$/)) return false;

            const tmpIndex = parseInt(m.content);
            if (isNaN(tmpIndex)) return false;
            if (tmpIndex > res.tracks.length || tmpIndex <= 0 && tmpIndex != -1) return false;

            index = tmpIndex;

            return true;
        };

        await msg.channel.awaitMessages({
            filter: filter,
            max: 1,
            time: 120 * 1000,
            errors: ['time']
        }).catch(e => {
            console.error(e);
        });

        if (index < 0) {
            await sendMsgs[0].edit({
                content: `終止搜尋...`,
                embed: null
            });
            return;
        }

        const track = res.tracks[index - 1];

        const state = player.state;
        if (state != "CONNECTED") {
            player.connect();
            player.stop();
        }

        musicDao.addMusicsToQueue(player.guild, [track]);
        player.queue.add(track);

        await msg.channel.send({ content: `🎶 已將曲目 \`${track.title}\` 加入隊列` });

        if (!player.playing && !player.paused && player.queue.current) {
            player.play();
        }
    },
};