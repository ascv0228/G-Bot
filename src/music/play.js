const { getVideoID } = require('ytdl-core');
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');

const { prefix } = require('../../config/config.json');

module.exports = {
    name: "play",
    aliases: ["h"],


    async execute(client, msg, args) {
        if (!msg.content.startsWith(`${prefix}`)) return;
        let guildID = msg.guild.id;
        const urlED = args[0];
        if (urlED.substring(0, 4) !== 'http') return msg.reply('The link is not working.1');

        const validate = await ytdl.validateURL(urlED);
        if (!validate) return msg.reply('The link is not working.2');

        const info = await ytdl.getInfo(urlED);

        if (!info.videoDetails) return msg.channel.send('輸入錯誤');

        if (!msg.member.voice.channel) return msg.reply('親,你還沒進去呢:3');

        if (!client.voice.connections.get(msg.guild.id)) {
            client.musicDict.set(guildID, new Array())
            client.musicDict.get(guildID).push(urlED)
            msg.member.voice.channel.join()
                .then(connection => {
                    msg.channel.send('已加入語音頻道');
                    const guildID = msg.guild.id;
                    const channelID = msg.channel.id;
                    playMusic2(connection, guildID, channelID);
                })
                .catch(err => {
                    msg.channel.send('bot進入語音頻道時發生錯誤，請再試一次');
                    console.log(err, 'playMusicError2');
                })
        } else {
            client.musicDict.get(guildID).push(urlED)
            msg.channel.send('已將歌曲加入歌單!');
        }

    }
};

async function playMusic2(connection, guildID, channelID) {

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

        dispatcher = connection.play(stream, streamOptions);
        dispatcher.on("finish", finish => {
            if (client.musicDict.get(guildID).length > 0) client.musicDict.get(guildID).shift();
            playMusic2(connection, guildID, channelID);
        })
    } else disconnectMusic(guildID, channelID); //清空歌單並且退出語音頻道
}

function disconnectMusic(guildID, channelID) {

    if (client.voice.connections.get(guildID)) {
        client.musicDict.set(guildID, new Array());
        client.voice.connections.get(guildID).disconnect();

        client.channels.fetch(channelID).then(channel => channel.send('音樂歌單已播放完畢'));
    } else client.channels.fetch(channelID).then(channel => channel.send('我還沒進去呢:3'))

}