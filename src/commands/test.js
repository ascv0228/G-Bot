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
        // msg.reply(`${msg.member.permissions}`)
        // msg.reply(`${typeof msg.member.permissions}`)
        // msg.reply(`${getHashDataFromUrl(args[0])}`)
        // const guildid = '829673608791851038';
        // let guild = await client.guilds.cache.get(guildid);
        // let temp = await client.Mdbcollection.find({ type: 'reward-ticket' }).toArray();
        // const m = new Map(Object.entries(temp[0].msg))
        // user_ids = new Array();
        // tickets = new Array()

        // m.forEach((value, key) => {
        //     user_ids.push(key);
        //     tickets.push(value);
        // });

        // let members = await guild.members.fetch({ user: user_ids, withPresences: true })
        // // .then(console.log)

        // let output = new Array();
        // let i = 0;
        // for (const [id, member] of members) {
        //     let userTag = `@${member.user.username}#${member.user.discriminator}`;
        //     output.push(`x!ticket ${userTag} ${tickets[i]}`);
        //     ++i;
        //     // msg.reply(`${userTag}`)
        // }
        // const attachment = new Discord.MessageAttachment(Buffer.from(output.join('\n')), `test.txt`);
        // client.channels.cache.get('964516826811858984').send({ files: [attachment] });


        const guildid = '829673608791851038';
        let guild = await client.guilds.cache.get(guildid);
        getRecordText(client, guild, ["記錄區", "867811395474423838"])


    }
};


const sendChannel = '967986563260772352'

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

    for (const [id, member] of members) {
        let userTag = `@${member.user.username}#${member.user.discriminator}`;
        output.push(`x!award ${userTag}`);
        // msg.reply(`${userTag}`)
    }

    console.log(output);
    const attachment = new Discord.MessageAttachment(Buffer.from(output.join('\n')), `${date.getMonth() + 1}-${date.getDate()}.txt`);
    client.channels.cache.get(sendChannel).send({ files: [attachment] });
    // client.channels.cache.get(sendChannel).send({ content: '```' + output.join('\n') + '```' });
}
