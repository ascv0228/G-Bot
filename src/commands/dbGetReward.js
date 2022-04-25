const Discord = require('discord.js');

module.exports = {
    name: "dbGetReward",
    aliases: ["dbGR"],

    execute(client, msg, args) {
        getRewardText(client, msg, args);  //輔助獎勵
        getRecordText(client, ["記錄區", "867811395474423838"])
        getRecordText(client, ["日常獎勵記錄區", "886269472158138429"])
        getRecordText(client, ["佬專用紀錄區", "948120050458574878"])
        return;
    }
};
const sendChannel = '964516826811858984'

async function getRewardText(client) {
    let temp = await client.Mdbcollection.find({ type: 'reward-ticket' }).toArray();
    //const fetchUser = async id => client.users.fetch(id);
    var nowDate = new Date().getTime();
    nowDate += (8 * 60 * 60 * 1000);
    var date = new Date(nowDate)
    let output = [`==========${date.getMonth() + 1}/${date.getDate()} 輔助獎勵區==========\n`];
    const m = new Map(Object.entries(temp[0].msg))

    /*
    Object.keys(user_ids).forEach(async function (key) {
        console.log(key)
        let user = await client.users.fetch(key);
        let userTag = `@${user.username}#${user.discriminator}`
        console.log(userTag);
        output.push(`x!ticket ${userTag} ${user_ids[key]}`);
    });*/
    /*
    for (key in Object.keys(temp[0].msg)) {
        let user = await getUser(client, key);
        console.log(user);
        let userTag = `@${user.username}#${user.discriminator}`;
        console.log(userTag);
        output.push(`x!ticket ${userTag} ${temp[0].msg[key]}`);
    }*/

    m.forEach((value, key) => {
        //let user = await getUser(client, key);
        //console.log(user);
        //let userTag = `@${user.username}#${user.discriminator}`;
        let userTag = `<@${key}>`;
        //console.log(userTag);
        output.push(`x!ticket ${userTag} ${value}`);
    });

    console.log(output);
    const attachment = new Discord.MessageAttachment(Buffer.from(output.join('\n')), `${date.getMonth() + 1}-${date.getDate()}.txt`);
    client.channels.cache.get(sendChannel).send({ files: [attachment] });
    // client.channels.cache.get(sendChannel).send({ content: '```' + output.join('\n') + '```' });
}

/*
client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '963831403001307167', users: new Array() });
client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '867811395474423838', users: new Array() });
client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '886269472158138429', users: new Array() });
client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '948120050458574878', users: new Array() });
*/

async function getRecordText(client, args) {
    let temp = await client.Mdbcollection.find({ type: "check-msg", channelId: args[1] }).toArray();
    let temp2 = temp[0].users.filter(function (elem, pos) {
        return temp[0].users.indexOf(elem) == pos;
    })
    var nowDate = new Date().getTime();
    nowDate += (8 * 60 * 60 * 1000);
    var date = new Date(nowDate)
    let output = [`==========${date.getMonth() + 1}/${date.getDate()} ${args[0]}==========\n`];



    await temp2.forEach(function getOutput(elem) {
        let userTag = `<@${elem}>`;
        output.push(`x!give ${userTag}`);
    });

    console.log(output);
    const attachment = new Discord.MessageAttachment(Buffer.from(output.join('\n')), `${date.getMonth() + 1}-${date.getDate()}.txt`);
    client.channels.cache.get(sendChannel).send({ files: [attachment] });
    // client.channels.cache.get(sendChannel).send({ content: '```' + output.join('\n') + '```' });
}









const waitFor = (ms) => new Promise(r => setTimeout(r, ms))
async function getUser(client, id) {

    return new Promise(async (resolve, reject) => {
        let user = await client.users.cache.get(id);

        resolve(user)
    });
}


