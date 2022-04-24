const mongoose = require('mongoose');
const { token, database } = require('../../config/token.json');


module.exports = {
    dbInitAll: dbInitAll,
    dbInitReward: dbInitReward,
    dbInitCheckMsg: dbInitCheckMsg,
    checkMsgNotInChannel: checkMsgNotInChannel,
    loadMongodb: loadMongodb
}

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

async function checkMsgNotInChannel(client, target_channel, msg) {
    let temp = await client.Mdbcollection.find({ type: 'check-msg', channelId: target_channel }).toArray()
    console.log(temp)
    return !temp[0].includes(msg.author.id);
}

async function loadMongodb(client) {
    if (!database) return;
    mongoose.Promise = global.Promise;
    mongoose.connect(database, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("The client is now connected to the database!")
    }).catch((err) => {
        console.log(err)
    });
    let db = mongoose.connection;;
    client.Mdbcollection = db.collection('Clients');
}
/*
async function dbPush(client, field, )
*/