const mongoose = require('mongoose');
const { token, database } = require('../../config/token.json');


module.exports = {
    dbInitAll: dbInitAll,
    dbInitReward: dbInitReward,
    dbInitCheckMsg: dbInitCheckMsg,
    dbInitHashData: dbInitHashData,
    checkMsgNotInChannel: checkMsgNotInChannel,
    loadMongodb: loadMongodb,
    dbInitActivityCommand: dbInitActivityCommand,
    dbInitHash: dbInitHash
}

async function dbInitAll(client) {
    await client.Mdbcollection.drop()
    await client.Mdbcollection.insertOne({ type: 'hashData', channelId: '963831403001307167', hash: new Map() });
    await client.Mdbcollection.insertOne({ type: 'hashData', channelId: '867811395474423838', hash: new Map() });
    await client.Mdbcollection.insertOne({ type: 'hashData', channelId: '948120050458574878', hash: new Map() });
    await client.Mdbcollection.insertOne({ type: 'reward-ticket', msg: new Map() });
    await client.Mdbcollection.insertOne({ type: 'reward-big-ticket', msg: new Map() });
    await client.Mdbcollection.insertOne({ type: 'reward-4000-ticket', msg: new Map() });
    await client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '963831403001307167', users: new Array() });
    await client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '867811395474423838', users: new Array() });
    await client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '948120050458574878', users: new Array() });
}

async function dbInitHash(client) {
    await client.Mdbcollection.deleteMany({ type: 'hashData' })
    await client.Mdbcollection.insertOne({ type: 'hashData', channelId: '963831403001307167', hash: new Map() });
    await client.Mdbcollection.insertOne({ type: 'hashData', channelId: '867811395474423838', hash: new Map() });
    await client.Mdbcollection.insertOne({ type: 'hashData', channelId: '948120050458574878', hash: new Map() });
}



async function dbInitReward(client, args) {
    await client.Mdbcollection.deleteMany({ type: 'reward-ticket' })
    await client.Mdbcollection.insertOne({ type: 'reward-ticket', msg: new Map() });
    await client.Mdbcollection.deleteMany({ type: 'reward-big-ticket' })
    await client.Mdbcollection.insertOne({ type: 'reward-big-ticket', msg: new Map() });
    await client.Mdbcollection.deleteMany({ type: 'reward-4000-ticket' })
    await client.Mdbcollection.insertOne({ type: 'reward-4000-ticket', msg: new Map() });
}

async function dbInitCheckMsg(client, args) {
    await client.Mdbcollection.deleteMany({ type: 'check-msg' })
    await client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '963831403001307167', users: new Array() });
    await client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '867811395474423838', users: new Array() });
    await client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '886269472158138429', users: new Array() });
    await client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '948120050458574878', users: new Array() });
}

async function dbInitHashData(client, args) {
    await client.Mdbcollection.deleteMany({ type: 'hashData' })
    await client.Mdbcollection.insertOne({ type: 'hashData', channelId: '963831403001307167', hash: new Map() });
    await client.Mdbcollection.insertOne({ type: 'hashData', channelId: '867811395474423838', hash: new Map() });
    await client.Mdbcollection.insertOne({ type: 'hashData', channelId: '886269472158138429', hash: new Map() });
    await client.Mdbcollection.insertOne({ type: 'hashData', channelId: '948120050458574878', hash: new Map() });
}

async function dbInitActivityCommand(client, args) {
    await client.Mdbcollection.deleteMany({ type: 'ActivityCommand' })
    await client.Mdbcollection.insertOne({ type: 'ActivityCommand', msg: new Map() });
}

async function checkMsgNotInChannel(client, target_channel, msg) {
    let temp = await client.Mdbcollection.find({ type: 'check-msg', channelId: target_channel }).toArray()
    return !temp[0].users.includes(msg.author.id);
}

async function loadMongodb(client) {
    if (!database) return;
    mongoose.Promise = global.Promise;
    await mongoose.connect(database, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("The client is now connected to the database!")
    }).catch((err) => {
        console.log(err)
    });
    let db = await mongoose.connection;;
    client.Mdbcollection = await db.collection('Clients');
}
