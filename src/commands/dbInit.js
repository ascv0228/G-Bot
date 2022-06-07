const dbUtil = require('../tools/db-util.js');

module.exports = {
    name: "dbInit",
    guilds: ['829673608791851038', '864925734581043280'],

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411')
            return;
        if (!(this.guilds.includes(msg.guild.id)))
            return;
        if (args.length == 0 || args.includes('-h')) {
            temp = [
                '`' + 'all' + '`' + " : 全部清空",
                '`' + 'reward' + '`' + " : 全部輔助獎勵清空",
                '`' + 'check-msg' + '`' + " : 當日記錄區發文記錄清空",
                '`' + 'confirm' + '`' + " : 確認",
                '`' + '-h' + '`' + " : 查看參數"
            ]
            msg.reply({ content: temp.join("\n") });
            return;
        }
        if (!args[args.length - 1] == 'confirm') {
            msg.reply('No confirm!\nNothing happened');
            return;
        }
        if (args.includes('all')) {
            dbUtil.dbInitAll(client);
            msg.reply('All 清空');
        }
        if (args.includes('reward')) {
            dbUtil.dbInitReward(client, args);
            msg.reply('Reward 清空');
        }
        if (args.includes('check-msg'))
            dbUtil.dbInitCheckMsg(client, args);
        return msg.reply('Finish!');
    }
};
