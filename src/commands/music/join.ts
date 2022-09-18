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
                let org_voicechannel = await client.channels.fetch(player.voiceChannel) as Discord.VoiceChannel;
                let tgt_voicechannel = msg.member.voice.channel
                let joinEmbed = new Discord.EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle(`${msg.author.tag} 移動 ${client.user.tag}`)
                    .setThumbnail(msg.member.displayAvatarURL({ size: 4096, forceStatic: false }) || msg.author.displayAvatarURL({ size: 4096, forceStatic: false }))
                    .addFields(
                        { name: `**${org_voicechannel.name}** 成員`, value: `${org_voicechannel.members.filter((m, id) => id != client.user.id).map((m, id) => `<@${id}>`)}` || `無任何成員`, inline: false },
                        { name: `\n**=========================================**\n`, value: `\n**=========================================**\n`, inline: false },
                        { name: `**${tgt_voicechannel.name}** 成員`, value: `${tgt_voicechannel.members.filter((m, id) => id != client.user.id).map((m, id) => `<@${id}>`)}` || `無任何成員`, inline: false }
                    )
                    .setTimestamp()
                    .setFooter({
                        text: msg.author.tag,
                        iconURL: msg.member.displayAvatarURL({ forceStatic: false })
                    });


                msg.reply({ embeds: [joinEmbed] })
                player.setVoiceChannel(msg.member.voice.channel.id);

            }
        }
    },
};



