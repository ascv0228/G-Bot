import Discord from "discord.js";
import musicDao from "../../database/musicDao";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";

export = {
    name: "shuffle",
    aliases: ["shuf"],
    description: '打亂順序',
    permissions: [],
    roles: [],
    users: [],
    type: [CmdType.Music],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        const player = client.manager.players.get(msg.guild.id);
        if (!player || player.queue.size <= 0) {
            await msg.channel.send({ content: `隊列當前無任何曲目` });
        } else {
            player.queue.shuffle();

            musicDao.clearMusicByRange(player.guild, 1, player.queue.totalSize).then((res) => {
                musicDao.addMusicsToQueue(player.guild, player.queue);
            });

            await msg.channel.send({ content: `隊列打亂完畢!` });
        }
    },
};