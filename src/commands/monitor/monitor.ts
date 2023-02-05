import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import imgUtil from '../../utils/img-util';
import rewardUtil from '../../utils/reward-util';
import { RewardChannel, RewardChannelName } from "../../utils/types";
import checkMsgDao from "../../database/checkMsgDao"
import rewardDao from "../../database/rewardDao"
import auth from "../../utils/auth";
import dataJson from "../../data";

let Map = {
    [dataJson['user']['簡倫']]: {
        'guild': '1042333554085998662',
        // 'echoChannel': '1043557584193454091',
        'echoChannel': '1069941949915742298',

    },
    // [dataJson['user']['me']]: {
    //     'guild': '829673608791851038',
    //     'echoChannel': '835393879398154260',
    // }
}





export = {
    name: 'monitor',
    aliases: [],
    description: '監視器',
    permissions: [],
    roles: [],
    monitorUsers: Object.keys(Map),
    hide: true,

    async execute(client: ZClient, msg: Discord.Message) {
        if (!(msg.author.id in Map)) return;
        if((msg.channel as Discord.TextChannel).nsfw) return;
        if(msg.guildId != Map[msg.author.id].guild) return;

        let opts = {};
        opts['embeds'] = [
            new Discord.EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`${msg.author.tag} 在 #${(msg.channel as Discord.TextChannel).name}`)
                .setDescription(msg.content)
                .setTimestamp()
        ]
        if(msg.attachments && msg.attachments.size > 1){

            opts['files'] = [
                msg.attachments.map((att, _) => {
                    return new Discord.AttachmentBuilder(att.proxyURL, { name: att.name });
                })
            ]
        }

        let echoChannel = await client.channels.fetch(Map[msg.author.id].echoChannel) as Discord.TextChannel;
        echoChannel.send(opts);
    }
}