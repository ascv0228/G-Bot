import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";

export = {
    name: "pause",
    aliases: [],
    description: '暫停(/重啟)音樂狀態',
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
        player.pause(!player.paused); //⏸️ ⏯️

        await msg.react("☑️");
    },
};