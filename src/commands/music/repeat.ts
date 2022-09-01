import Discord from "discord.js";
import musicDao from "../../database/musicDao";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";

export = {
    name: "repeat",
    aliases: ["loop"],
    example: "loop all",
    description: '重複播放當前歌曲, 加all為重複播放隊列歌曲',
    permissions: [],
    roles: [],
    users: [],
    type: [CmdType.Music],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        const player = client.manager.players.get(msg.guild.id);

        if (!player) {
            await msg.channel.send({ content: `音樂播放器尚未創建!` });
            return;
        }

        if (!msg.member.voice.channel || msg.member.voice.channel.id != player.voiceChannel) {
            await msg.channel.send({ content: `此命令需和機器人相同頻道才可使用!` });
            return;
        }

        let target: string = null;

        if (args.length >= 1) {
            target = args[0];
        }

        if (target == "all") {
            player.setQueueRepeat(!player.queueRepeat);
            musicDao.updateLoopStatus(player.guild, false, player.queueRepeat);
            await msg.channel.send({ content: `隊列循環播放已${player.queueRepeat ? "開啟" : "關閉"}!` });
        } else {
            player.setTrackRepeat(!player.trackRepeat);
            musicDao.updateLoopStatus(player.guild, player.trackRepeat, false);
            await msg.channel.send({ content: `歌曲循環播放已${player.trackRepeat ? "開啟" : "關閉"}!` });
        }
    },
};