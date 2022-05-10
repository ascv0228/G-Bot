const { prefix } = require('../../config/config.json');
const { token } = require('../../config/token.json');
const Discord = require('discord.js');

var XMLHttpRequest = require('xhr2');
var FileReader = require('filereader');
// import { Buffer } from 'buffer';

module.exports = {
    name: "test",

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;


        let d2 = new Date();
        if (d2.getHours() < 2 || d2.getHours() > 14)
            return msg.reply({ content: '23:00 ~ 10:00 請勿打擾' });

        msg.channel.send(`${d2.getHours()}、${d2}`)


    }
};


const sendChannel = '964516826811858984'

async function getRecordText(client, guild, args) {
    let temp = await client.Mdbcollection.find({ type: "check-msg", channelId: args[1] }).toArray();
    let user_ids = temp[0].users.filter(function (elem, pos) {
        return temp[0].users.indexOf(elem) == pos;
    })
    var nowDate = new Date().getTime();
    nowDate += (8 * 60 * 60 * 1000);
    var date = new Date(nowDate)
    let output = [`==========${date.getMonth() + 1}/${date.getDate()} ${args[0]}==========\n`];

    let members = await guild.members.fetch({ user: user_ids, withPresences: true })
    let order_userTag = new Map()

    // // console.log(members)
    for (const [id, member] of members) {
        let userTag = `@${member.user.username}#${member.user.discriminator}`;
        order_userTag.set(id, userTag);
        // output.push(`x!award ${userTag}`);
    }
    for (let user_id of user_ids) {
        console.log(user_id);
        output.push(`x!award ${order_userTag.get(user_id)}`);
    }
    console.log(output);
    const attachment = new Discord.MessageAttachment(Buffer.from(output.join('\n')), `${date.getMonth() + 1}-${date.getDate()}.txt`);
    client.channels.cache.get(sendChannel).send({ files: [attachment] });
    // client.channels.cache.get(sendChannel).send({ content: '```' + output.join('\n') + '```' });
}
