module.exports.dbInitAll = async function (client) {
    dbInitAll(client);
};

module.exports.dbInitReward = async function (client, args) {
    dbInitReward(client, args);
};

module.exports.dbInitCheckMsg = async function (client, args) {
    dbInitCheckMsg(client, args);
};


async function dbInitAll(client) {
    client.Mdbcollection.drop()
    client.Mdbcollection.insertOne({ type: 'hashData', channelId: '963831403001307167', hash: new Map() });
    client.Mdbcollection.insertOne({ type: 'hashData', channelId: '867811395474423838', hash: new Map() });
    client.Mdbcollection.insertOne({ type: 'hashData', channelId: '886269472158138429', hash: new Map() });
    client.Mdbcollection.insertOne({ type: 'hashData', channelId: '948120050458574878', hash: new Map() });
    client.Mdbcollection.insertOne({ type: 'reward-ticket', msg: new Map() });
    client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '963831403001307167', users: new Array() });
    client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '867811395474423838', users: new Array() });
    client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '886269472158138429', users: new Array() });
    client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '948120050458574878', users: new Array() });
}

async function dbInitReward(client, args) {
    await client.Mdbcollection.deleteMany({ type: 'reward-ticket' })
    client.Mdbcollection.insertOne({ type: 'reward-ticket', msg: new Map() });
}

async function dbInitCheckMsg(client, args) {
    await client.Mdbcollection.deleteMany({ type: 'check-msg' })
    client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '963831403001307167', users: new Array() });
    client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '867811395474423838', users: new Array() });
    client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '886269472158138429', users: new Array() });
    client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '948120050458574878', users: new Array() });
}
