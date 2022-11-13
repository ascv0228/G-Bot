import Discord from "discord.js";
import tools from "../../utils/tools";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";

export = {
    name: "nowplaying",
    aliases: ["np"],
    description: '獲取目前播放歌曲',
    permissions: [],
    roles: [],
    users: [],
    type: [CmdType.Music],
    usage: [""],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        const player = client.manager.players.get(msg.guild.id);
        if (!player || !player.queue.current) {
            await msg.channel.send({ content: `當前沒有任何歌曲正在播放...` });
            return;
        }

        const playing = player.playing ? `▶` : `⏸`;
        const requester = (player.queue.current.requester as Discord.User);
        const member = await dcUtil.getGuildMember(msg.guild.members, requester.id);

        await msg.channel.send({
            embeds: [
                new Discord.EmbedBuilder()
                    .setAuthor({
                        name: `當前播放歌曲:`,
                        iconURL: member.displayAvatarURL({ forceStatic: false })
                    })
                    .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
                    .setURL(player.queue.current.uri)
                    .setTitle(`${playing} **${player.queue.current.title}**`)
                    .addFields(
                        { name: `歌曲長度: `, value: `\`${player.queue.current.isStream ? "LIVE" : tools.timeFormat(player.queue.current.duration)}\``, inline: true },
                        { name: `上傳者: `, value: `\`${player.queue.current.author}\``, inline: true },
                        { name: `經過時間: `, value: tools.createBar(player) }
                    )
                    .setFooter({
                        text: requester.tag,
                        iconURL: member.displayAvatarURL({ forceStatic: false })
                    })
            ]
        });
    },
};