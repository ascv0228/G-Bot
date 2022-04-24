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
    /*
    Object.keys(user_ids).forEach(async function (key) {
        console.log(key)
        let user = await client.users.fetch(key);
        let userTag = `@${user.username}#${user.discriminator}`
        console.log(userTag);
        output.push(`x!ticket ${userTag} ${user_ids[key]}`);
    });*/
    for (key in Object.keys(temp[0].msg)) {
        let user = await getUser(client, key);
        console.log(user);
        let userTag = `@${user.username}#${user.discriminator}`;
        console.log(userTag);
        output.push(`x!ticket ${userTag} ${temp[0].msg[key]}`);
    }
    await getOutput(client, temp[0].msg);
    console.log(output);
    const attachment = new Discord.MessageAttachment(Buffer.from(output.join('\n')), `${d.getMonth() + 1}-${d.getDate()}.txt`);
    client.channels.cache.get('964516826811858984').send({ files: [attachment] });
}
const waitFor = (ms) => new Promise(r => setTimeout(r, ms))
async function getUser(client, id) {

    return new Promise(async (resolve, reject) => {
        let user = await client.users.fetch(id);

        resolve(user)
    });
}
