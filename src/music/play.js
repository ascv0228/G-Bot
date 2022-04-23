const { getVideoID } = require('ytdl-core');
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');

const { prefix } = require('../../config/config.json');

module.exports = {
    name: "play",
    aliases: ["p"],

    async execute(client, msg, args) {
        msg.reply("這是play")
        if (args[0].includes('playlist')) {
            playListMusic(client, msg, args);
            return;
        }
        playMusic(client, msg, args);
        return;
    }
};

async function playListMusic(client, msg, args) {
    const play_list_URL = args[0];
    const guildID = msg.guild.id;
    const canPlay = await ytpl.validateID(play_list_URL);
    //讀取到幾首歌，上限默認100首
    let a = 0;
    //幾首成功放入歌單
    let b = 0;
    if (!canPlay) return msg.channel.send(`This Url isn\'t working in function.`);

    msg.channel.send('正在讀取歌單');
    const listED = await ytpl(play_list_URL);
    if (!client.voice.connections.get(guildID)) {
        //將歌曲加入歌單
        client.musicDict.set(guildID, new Array())
    }
    let tempArray = new Array()
    await listED.items.forEach(async function song(element) {
        a += 1;
        //if(a%20==0)msg.channel.send(a);
        if (element.title !== '[Deleted video]')
            info = await ytdl.validateURL(element.url);
        if (info) {
            //直接加進去管他能不能播
            b += 1;
            tempArray.push(element.url);
        }
    });
    msg.channel.send("Finish");
    client.musicDict.set(guildID, client.musicDict.get(guildID).concat(tempArray));

    msg.channel.send("Finish2");
    //回傳統計資訊

    msg.channel.send(`歌單 ${listED.title}\n 共載入${b}首歌曲\n${a - b}首歌曲載入失敗`);

    if (!client.voice.connections.get(guildID)) {
        msg.member.voice.channel.join()
            .then(connection => {
                msg.channel.send('已加入語音頻道');
                const guildID = msg.guild.id;
                const channelID = msg.channel.id;
                //播放歌曲
                playMusic2(connection, guildID, channelID);
            })
            .catch(err => {
                msg.channel.send('bot進入語音頻道時發生錯誤，請再試一次');
                console.log(err, 'playMusicError2');
            })
    }
    //網址

}

async function playMusic(client, msg, args) {
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
                playMusic2(client, msg, args, connection);
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