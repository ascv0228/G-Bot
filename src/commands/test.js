const { prefix } = require('../../config/config.json');
const { token } = require('../../config/token.json');
const Discord = require('discord.js');

var XMLHttpRequest = require('xhr2');
var FileReader = require('filereader');
// import { Buffer } from 'buffer';

module.exports = {
    name: "test",

    async execute(client, msg, args) {
        if (!msg.author.id == '411895879935590411') return;
        // msg.reply(`${msg.member.permissions}`)
        // msg.reply(`${typeof msg.member.permissions}`)
        // msg.reply(`${getHashDataFromUrl(args[0])}`)
        //message.guild.members.cache.get('id')
        // const user = await msg.guild.members.fetch('411895879935590411');
        // let id = '411895879935590411'
        // const fetchUser = async id => client.users.fetch(id)
        // let user = await fetchUser(id)
        // msg.reply(`${user}`);
        // msg.reply('`' + `${user.username}` + '`');
        // msg.reply('`' + `${user.tag}` + '`');

        const guildid = '829673608791851038';
        let guild = await client.guilds.cache.get(guildid);
        let members = await guild.members.fetch({ user: ['411895879935590411', '765629373084074064'], withPresences: true })
        // .then(console.log)


        for (const [id, member] of members) {
            // console.log(member.user);
            msg.reply(`${member.user.username}`)
            msg.reply(`${member.user.discriminator}`)
        }
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