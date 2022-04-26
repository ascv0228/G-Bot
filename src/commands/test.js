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
        const guildid = '829673608791851038';
        let guild = await client.guilds.cache.get(guildid);
        let temp = await client.Mdbcollection.find({ type: 'reward-ticket' }).toArray();
        const m = new Map(Object.entries(temp[0].msg))
        user_ids = new Array();
        tickets = new Array()

        m.forEach((value, key) => {
            user_ids.push(key);
            tickets.push(value);
        });

        let members = await guild.members.fetch({ user: user_ids, withPresences: true })
        // .then(console.log)

        let output = new Array();
        let i = 0;
        for (const [id, member] of members) {
            let userTag = `@${member.user.username}#${member.user.discriminator}`;
            output.push(`x!ticket ${userTag} ${tickets[i]}`);
            ++i;
            // msg.reply(`${userTag}`)
        }
        const attachment = new Discord.MessageAttachment(Buffer.from(output.join('\n')), `test.txt`);
        client.channels.cache.get(sendChannel).send({ files: [attachment] });
        //let user = await getUser(client, key);
        //console.log(user);
        //let userTag = `@${user.username}#${user.discriminator}`;
        // let userTag = `<@${key}>`;
        //console.log(userTag);
        // output.push(`x!ticket ${userTag} ${value}`);
        // console.log(users['411895879935590411'].user)
        // console.log(users['411895879935590411'].user.username)
        // console.log(users['411895879935590411'].user.discriminator)
        // user.username
        // console.log(user)
        // msg.reply(`${user.tag}`)
        // msg.reply(`${user.author}`)
        // msg.reply(`${user.username}`)

    }
};



//const fetch = require('node-fetch')

// You might want to store this in an environment variable or something
/*
const fetchUser = async id => {
    const response = await fetch(`https://discord.com/api/v9/users/${id}`, {
        headers: {
            Authorization: `Bot ${token}`
        }
    })
    if (!response.ok) throw new Error(`Error status code: ${response.status}`)
    return JSON.parse(await response.json())
}
*/

/*
function getHashDataFromUrl(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
        if (this.status === 200) {
            // 获得二进制
            var blob = this.response;
            var reader = new FileReader();
            reader.onload = function (e) {
                var spark = new SparkMD5.ArrayBuffer()
                spark.append(e.target.result)
                console.log("md5:", spark.end())
            }
            //转换成FileReader对象
            reader.readAsArrayBuffer(blob);
        }
    }
    xhr.send();

}*/