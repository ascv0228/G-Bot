import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";

export = {
    name: "join",
    aliases: [],
    description: '使機器人加入目前語音頻道',
    permissions: [],
    roles: [],
    users: [],
    type: [CmdType.Music],
    usage: [""],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
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

            player.connect();
        } else {
            if (player.voiceChannel != msg.member.voice.channel.id) { // check another user using or not
                msg.reply({ content: `從 ${(await client.channels.fetch(player.voiceChannel) as Discord.VoiceChannel).name} 移動到 ${msg.member.voice.channel.name}` })
                player.setVoiceChannel(msg.member.voice.channel.id);
            }
        }
    },
};