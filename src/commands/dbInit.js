const { prefix } = require('../../config/config.json');

module.exports = {
    name: "dbInit",

    async execute(client, msg, args) {
        if (!msg.content.startsWith(`${prefix}`)) return;
        if (!msg.author.id == '411895879935590411') return;
        if (args.includes('-h')) {
            temp = [
                '`' + 'all' + '`' + " : 全部清空",
                '`' + 'reward' + '`' + " : 全部輔助獎勵清空",
                '`' + 'check-msg' + '`' + " : 當日記錄區發文記錄清空",
                '`' + 'confirm' + '`' + " : 確認"
            ]
            msg.reply({ content: temp.join("\n") });
            return;
        }
        if (!msg.content.endswith('confirm')) {
            msg.reply('No confirm!\nNothing happened');
            return;
        }
        if (args.includes('all')) {
            dbInitAll(client);
            msg.reply('All 清空');
        }
        if (args.includes('reward')) {
            dbInitReward(client, args);
            msg.reply('Reward 清空');
        }
        if (args.includes('check-msg'))
            getCheckMsg(args)
        return msg.reply('Finish!');
    }
};

async function dbInitAll(client) {
    client.Mdbcollection.drop()
    client.Mdbcollection.insertOne({ type: 'hashData', channelId: '963831403001307167', hash: new Array() });
    client.Mdbcollection.insertOne({ type: 'hashData', channelId: '867811395474423838', hash: new Array() });
    client.Mdbcollection.insertOne({ type: 'hashData', channelId: '886269472158138429', hash: new Array() });
    client.Mdbcollection.insertOne({ type: 'hashData', channelId: '948120050458574878', hash: new Array() });
    client.Mdbcollection.insertOne({ type: 'reward-ticket', msg: new Array() });
    client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '963831403001307167', users: new Array() });
    client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '867811395474423838', users: new Array() });
    client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '886269472158138429', users: new Array() });
    client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '948120050458574878', users: new Array() });
}

async function dbInitReward(client, args) {
    await client.Mdbcollection.remove({ type: 'reward-ticket' })
    client.Mdbcollection.insertOne({ type: 'reward-ticket', msg: new Array() });
}

async function dbInitCheckMsg(client, args) {
    await client.Mdbcollection.remove({ type: 'check-msg' })
    client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '963831403001307167', users: new Array() });
    client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '867811395474423838', users: new Array() });
    client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '886269472158138429', users: new Array() });
    client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '948120050458574878', users: new Array() });
}
