const { getVideoID } = require('ytdl-core');
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const Discord = require('discord.js');

const { prefix } = require('../../config/config.json');

module.exports = {
    name: "playnext",
    aliases: ["pt"],

    async execute(client, msg, args) {
        if (!msg.content.startsWith(`${prefix}`)) return;
        const guildID = msg.guild.id;
        const urlED = args[0];
        if (urlED.substring(0, 4) !== 'http') return msg.channel.send('The link is not working.1');

        const validate = await ytdl.validateURL(urlED);
        if (!validate) return msg.reply('輸入錯誤');

        const info = await ytdl.getInfo(urlED);
        if (!info.videoDetails) return msg.reply('The link is not working.3');

        if (!msg.member.voice.channel) return msg.reply('請先進入頻道:3...');
        if (!client.voice.connections.get(msg.guild.id)) {
            client.musicDict.get(guildID).splice(1, 0, urlED);
            msg.member.voice.channel.join()
                .then(connection => {
                    msg.channel.send('已將歌曲加入歌單');
                    playMusic2(client, msg, args, connection);
                })
                .catch(err => {
                    msg.reply('bot進入語音頻道時發生錯誤，請再試一次');
                    console.log(err, 'playMusicError2');
                })
        } else {
            client.musicDict.get(guildID).splice(1, 0, urlED);
            msg.channel.send('已將歌曲插入下一首播放!');
        }
    }
};

async function playMusic2(client, msg, args, connection) {
    const guildID = msg.guild.id;
    const channelID = msg.channel.id;

    if (client.musicDict.get(guildID).length > 0) {
        const streamOptions = {
            seek: 0,
            volume: 0.5,
            Bitrate: 192000,
            Passes: 1,
            highWaterMark: 1
        };
        const stream = await ytdl(client.musicDict.get(guildID)[0], {
            filter: 'audioonly',
            quality: 'highestaudio',
            highWaterMark: 26214400 //25ms
        })

        client.dispatcher = connection.play(stream, streamOptions);
        client.dispatcher.on("finish", finish => {
            if (client.musicDict.get(guildID).length > 0) client.musicDict.get(guildID).shift();
            playMusic2(connection, guildID, channelID);
        })
    } else disconnectMusic(client, msg, args); //清空歌單並且退出語音頻道
}

function disconnectMusic(client, msg, args) {
    const guildID = msg.guild.id;
    const channelID = msg.channel.id;

    if (client.voice.connections.get(guildID)) {
        client.musicDict.set(guildID, new Array());
        client.voice.connections.get(guildID).disconnect();

        msg.channel.send('音樂歌單已播放完畢');
    } else msg.channel.send('我還沒進去呢:3');

}