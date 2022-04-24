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
        let id = '411895879935590411'
        let user = fetchUser(id)
        msg.reply(`${user}`);
        msg.reply(`${user.username}`);
    }
};


const fetchUser = async id => client.users.fetch(id)

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