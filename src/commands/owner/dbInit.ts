import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import scheduleUtil from "../../utils/schedule-util";
import db from "../../database/db"
import dbUtil from '../../utils/database-util';

export = {
    name: "dbInit",
    aliases: ["dbinit"],
    guilds: ['829673608791851038', '864925734581043280'],
    description: '編輯database',
    type: [CmdType.Owner],
    permissions: [],
    usage: [`<dbClass>`],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (args.length == 0 || args.includes('-h')) {
            let temp = [
                '`' + 'all' + '`' + " : 全部清空",
                '`' + 'reward' + '`' + " : 全部輔助獎勵清空",
                '`' + 'check-msg' + '`' + " : 當日紀錄區發文紀錄清空",
                '`' + 'activity' + '`' + " : 活動指令",
                '`' + 'confirm' + '`' + " : 確認 // **必要**",
                '`' + '-h' + '`' + " : 查看參數"
            ]
            msg.reply({ content: temp.join("\n") });
            return;
        }
        if (args[args.length - 1] !== 'confirm') {
            msg.reply('No confirm!\nNothing happened');
            return;
        }
        if (args.includes('all')) {
            dbUtil.dbInitAll();
            msg.reply('All 清空');
        }
        if (args.includes('hash')) {
            dbUtil.dbInitHash();
            msg.reply('Hash 清空');
        }
        if (args.includes('reward')) {
            dbUtil.dbInitReward(args);
            msg.reply('Reward 清空');
        }
        if (args.includes('check-msg')) {
            dbUtil.dbInitCheckMsg(args);
            msg.reply('check-msg 清空');
        }
        if (args.includes('activity') || args.includes('ActivityCommand')) {
            dbUtil.dbInitActivityCommand(args);
            msg.reply('activity 清空');
        }
        return msg.react("☑️");
    }

}

//     guilds: ['829673608791851038', '864925734581043280'],

//     async execute(client, msg, args) {
//         if (msg.author.id !== '411895879935590411')
//             return;
//         if (!(this.guilds.includes(msg.guild.id)))
//             return;
//         if (args.length == 0 || args.includes('-h')) {
//             temp = [
//                 '`' + 'all' + '`' + " : 全部清空",
//                 '`' + 'reward' + '`' + " : 全部輔助獎勵清空",
//                 '`' + 'check-msg' + '`' + " : 當日紀錄區發文紀錄清空",
//                 '`' + 'activity' + '`' + " : 活動指令",
//                 '`' + 'confirm' + '`' + " : 確認 // 必要",
//                 '`' + '-h' + '`' + " : 查看參數"
//             ]
//             msg.reply({ content: temp.join("\n") });
//             return;
//         }
//         if (!args[args.length - 1] == 'confirm') {
//             msg.reply('No confirm!\nNothing happened');
//             return;
//         }
//         if (args.includes('all')) {
//             dbUtil.dbInitAll(client);
//             msg.reply('All 清空');
//         }
//         if (args.includes('hash')) {
//             dbUtil.dbInitHash(client);
//             msg.reply('Hash 清空');
//         }
//         if (args.includes('reward')) {
//             dbUtil.dbInitReward(client, args);
//             msg.reply('Reward 清空');
//         }
//         if (args.includes('check-msg')) {
//             dbUtil.dbInitCheckMsg(client, args);
//             msg.reply('check-msg 清空');
//         }
//         if (args.includes('activity') || args.includes('ActivityCommand')) {
//             dbUtil.dbInitActivityCommand(client, args);
//             msg.reply('activity 清空');
//         }
//         return msg.reply('Finish!');
//     }
// };
