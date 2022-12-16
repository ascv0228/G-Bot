import Discord from "discord.js";
import tools from "../utils/tools";
import { ZClient } from "../structure/client";
// import config from "../utils/config";
// import eggs from "../utils/eggs";
import { EggRuleType, EggType } from "../utils/types";
import checkMsgDao from "../database/checkMsgDao";
import auth from "../utils/auth";

export = {
    name: 'eggsAppear',

    async execute(client: ZClient, message: Discord.Message, deletor: Discord.User) {

        // if (deletor) console.log('AAA')
        // if (deletor) {
        //     const textData: string[] = config.event.eggsAppear.delete[deletor.id];
        //     if (textData) {
        //         await message.channel.send({ content: `<@${deletor.id}>, ${textData[tools.randInt(1, textData.length - 1)]}` });
        //     }
        //     return;
        // }

        // let echos = [];

        // if (message.mentions.has(client.user.id)) {
        //     for (const cf of config.event.eggsAppear.reply) {
        //         if (cf.uid == message.author.id) {
        //             await message.reply({ content: cf.text });
        //             break;
        //         }
        //     }
        // }

        if (process.env.BOT_PREFIX != process.env.MAIN_BOT_PREFIX) return
        client.eggs.forEach((egg, name) => {
            if (!auth.hasCommmandAuth(message.member, egg)) return;
            if (!auth.isAuthChannel(message, egg)) return;

            if (egg.eggType == EggType.Delete && deletor) {
                // console.log('DD')
                egg.execute(client, message, deletor);
                return
            }

            if (!egg.bot && message.author.bot) return;
            // if (deletor) console.log('BB')
            let content = message.content;
            let execed = false
            if (
                egg.eggType == EggType.FullSame && content == name ||
                egg.eggType == EggType.PartSame && content.includes(name) ||
                egg.eggType == EggType.PartWithStartSame && content.startsWith(name) ||
                egg.eggType == EggType.PartWithEndSame && content.endsWith(name) ||
                egg.eggType == EggType.Mention && message.mentions.has(client.user.id)
            )
                execed = true;

            if (!execed) return;

            // if (deletor) console.log('EE')
            egg.execute(client, message, name)
            // let eggContents: any = [egg.content];

            // if (egg.perm && !client.botStatus.get(egg.perm)) return;
            // if (egg.from && !egg.from.includes(message.author.id)) return;

            // if (egg.rules && egg.rules.includes(EggRuleType.Multiple)) {
            //     eggContents = egg.content;
            // }

            // eggContents.forEach((eggContent: string) => {
            //     if (egg.rules) {
            //         if (egg.rules.includes(EggRuleType.IgnoreCase)) {
            //             content = content.toLowerCase();
            //             eggContent = eggContent.toLowerCase();
            //         }
            //     }

            //     let check = false;
            //     if (egg.type == EggType.PartWithStartSame) {
            //         check = content.startsWith(eggContent);
            //     } else if (egg.type == EggType.PartSame) {
            //         check = content.includes(eggContent);
            //     }

            //     if (check) {
            //         if (egg.conditionFn) {
            //             const status = egg.conditionFn();
            //             if (status != 0) {
            //                 if (!egg.errEcho) return;
            //                 if (!egg.errEcho[status]) return;

            //                 echos.push(egg.errEcho[status]);
            //                 return;
            //             }
            //         }
            //         echos.push(egg.echo);
            //     }
            // });
        });

        // if (echos.length) {
        //     echos = echos.sort((x, y) => x.index - y.index);

        //     const fstEcho = echos[0];
        //     const collected: any[][] = [[echos[0]]];

        //     let dataIndex = 0;
        //     let curIndex = fstEcho.index;

        //     for (let i = 1; i < echos.length; ++i) {
        //         const e = echos[i];
        //         if (curIndex == e.index) {
        //             collected[dataIndex].push(e);
        //         } else if (curIndex == e.index - 1) {
        //             // index改變時要先初始化
        //             curIndex += 1;
        //             dataIndex += 1;
        //             collected[dataIndex] = collected[dataIndex] || [];
        //             collected[dataIndex].push(e);
        //         } else {
        //             break;
        //         }
        //     }

        //     let msgs: string[] = [];
        //     for (let i = 0; i < collected.length; ++i) {
        //         const echos = collected[i];
        //         msgs.push(echos[tools.randInt(0, echos.length - 1)].content);
        //     }

        //     await message.reply({ content: msgs.join(", ") });
        // }
    }
};