
import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";

export = {
    name: "nosex",
    aliases: [],

    description: '不可以色色',
    permissions: [],
    roles: [],
    type: [CmdType.Universal],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        let urls = [
            'https://c.tenor.com/NEl9pS8LFdUAAAAC/inawtf-%E5%B7%A5%E4%B8%89%E5%B0%8F.gif',
            'https://cdn.discordapp.com/attachments/964528474809323610/983338949038735411/7EFD54E2-971D-4EDB-A4F6-2D99AEF86EFC.gif',
            'https://media.discordapp.net/attachments/829678324150042684/972048166474092584/received_402828584784372.gif',
            'https://cdn.discordapp.com/attachments/964528474809323610/986532513419780096/image2.gif'
        ]
        let channel = msg.channel
        msg.delete().catch(() => { });
        channel.send({ content: urls[Math.random() * urls.length | 0] });



    }
};