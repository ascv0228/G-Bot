const Discord = require('discord.js');

module.exports = {
    name: "dbGetReward",
    aliases: ["dbGR"],

    execute(client, msg, args) {
        getRewardText(client, msg, args);

        return;
    }
};


async function getRewardText(client, msg, args) {
    let temp = await client.Mdbcollection.find({ type: 'reward-ticket' }).toArray();
    const fetchUser = async id => client.users.fetch(id);
    var d = new Date();
    let output = [`==========${d.getMonth() + 1}/${d.getDate()} 輔助獎勵區==========\n`];

    Object.keys(temp[0].msg).forEach(function (key) {
        let user = client.users.cache.get(key);
        console.log(user);
        console.log(user.tag);
        output.push(`x!ticket ${user} ${temp[0].msg[key]}`);
    });/*
    await temp[0].msg.forEach((value, key) => {
        let user = fetchUser(key);
        output.push(`x!ticket ${user.tag} ${value}`);
    });*/

    const attachment = new Discord.MessageAttachment(Buffer.from(output.join('\n')), `${d.getMonth() + 1}-${d.getDate()}.txt`);
    client.channels.cache.get('964516826811858984').send({ files: [attachment] });
}

/*
async function getCheckMsg(client, msg, args) {
    let temp = await client.Mdbcollection.find({ type: 'check-msg' }).toArray();
    jsonString = JSON.stringify({ ...temp }, null, 4);
    const attachment = new Discord.MessageAttachment(Buffer.from(jsonString, 'utf-8'), 'log.json');
    msg.author.send({ files: [attachment] });
}*/