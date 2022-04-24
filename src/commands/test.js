const { prefix } = require('../../config/config.json');
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
        msg.reply(`${getHashDataFromUrl(args[0])}`)
    }
};


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

}