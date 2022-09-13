import Discord from "discord.js";
import musicDao from "../../database/musicDao";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";

export = {
    name: "clearqueue",
    aliases: ["cq"],
    description: '清空隊列',
    permissions: [],
    roles: [],
    users: [],
    type: [CmdType.Music],
    usage: [""],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        const player = client.manager.get(msg.guild.id);

        if (!player) {
            await msg.channel.send({ content: "尚未創建音樂播放器!" });
            return;
        }

        if (!msg.member.voice.channel) {
            await msg.channel.send({ content: `此命令需在語音頻道中使用!` });
            return;
        }

        if (msg.member.voice.channel.id != player.voiceChannel) {
            await msg.channel.send({ content: `此命令需和機器人相同頻道才可使用!` });
            return;
        }

        musicDao.clearMusicByRange(player.guild, 1, player.queue.totalSize);

        player.queue.clear();

        await msg.channel.send({ content: "已清空當前隊列!" });
    },
};