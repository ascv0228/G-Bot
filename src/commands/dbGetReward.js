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
    //const fetchUser = async id => client.users.fetch(id);
    var d = new Date();
    let output = [`==========${d.getMonth() + 1}/${d.getDate()} 輔助獎勵區==========\n`];
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
    // client.channels.cache.get('964516826811858984').send({ files: [attachment] });
    client.channels.cache.get('964516826811858984').send({ content: '```' + output.join('\n') + '```' });
}
const waitFor = (ms) => new Promise(r => setTimeout(r, ms))
async function getUser(client, id) {

    return new Promise(async (resolve, reject) => {
        let user = await client.users.cache.get(id);

        resolve(user)
    });
}
