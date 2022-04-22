const { getVideoID } = require('ytdl-core');
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');

const { prefix } = require('../../config/config.json');

module.exports = {
    name: "play",


    async execute(client, msg, args) {
        if (!msg.content.startsWith(`${prefix}`)) return;
        const resMsg = await msg.channel.send({ content: 'Ping...' });
        await resMsg.edit({ content: `Ping: ${resMsg.createdTimestamp - msg.createdTimestamp}ms | Websocket: ${client.ws.ping}ms` });
    }
};
/*
async function playMusic(msg) {
    let contents = msg.content;
    let guildID = msg.guild.id;
    const urlED = contents[1];
    try {
        if (urlED.substring(0, 4) !== 'http') return msg.reply('The link is not working.1');

        const validate = await ytdl.validateURL(urlED);
        if (!validate) return msg.reply('The link is not working.2');

        const info = await ytdl.getInfo(urlED);

        if (!info.videoDetails) return msg.channel.send('輸入錯誤');

        if (!msg.member.voice.channel) return msg.reply('親,你還沒進去呢:3');

        if (!client.voice.connections.get(msg.guild.id)) {
            musicDict.set(guildID, new Array())
            musicDict.get(guildID).push(urlED)
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
            musicDict.get(guildID2).push(urlED)
            msg.channel.send('已將歌曲加入歌單!');
        }
    } catch (err) {
        console.log(err, 'playMusicError');
    }
}*/