import Discord from "discord.js";
import musicDao from "../../database/musicDao";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";

export = {
    name: "skip",
    aliases: ["s"],
    example: "s 2",
    description: '跳過歌曲, 可加參數指定跳過的歌曲位置',
    permissions: [],
    roles: [],
    users: [],
    type: [CmdType.Music],
    usage: ["<number>"],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        let target = 0;

        if (args.length >= 1) {
            target = parseInt(args[0]);
        }

        if (isNaN(target)) {
            target = 0;
        }

        const player = client.manager.players.get(msg.guild.id);

        if (!player) {
            await msg.channel.send({ content: `音樂播放器尚未創建!` });
            return;
        }

        if (!msg.member.voice.channel || msg.member.voice.channel.id != player.voiceChannel) {
            await msg.channel.send({ content: `此命令需和機器人相同頻道才可使用!` });
            return;
        }

        if (target) {
            if (!player.queue.size) {
                await msg.channel.send({ content: `無任何歌曲可移除!` });
            } else {
                if (target <= 0 || target > player.queue.size) {
                    await msg.channel.send({ content: `移除位置不正確!` });
                } else {
                    musicDao.removeMusicByIndex(player.guild, target);

                    const realTarget = target - 1;
                    const res = player.queue.remove(realTarget);
                    await msg.channel.send({ content: `成功移除歌曲! \`[${target}](${res[0].title})\`` });
                }
            }
        } else {
            if (!player.queue.current) {
                await msg.channel.send({ content: `無任何歌曲可跳過!` });
            } else {
                const track = player.queue.current;
                player.stop();
                await msg.channel.send({ content: `成功跳過當前歌曲! \`(${track.title})\`` });
            }
        }
    },
};