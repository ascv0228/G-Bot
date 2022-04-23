const { getVideoID } = require('ytdl-core');
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');

const { prefix } = require('../../config/config.json');

module.exports = {
    name: "queue",
    aliases: ["q"],

    async execute(client, msg, args) {
        if (client.musicDict.get(guildID).length < 1) return;
        let info;
        let queueMessage = new Array();
        for (i = 0; i < client.musicDict.get(guildID).length && i < 5; i++) {
            //從連結中獲取歌曲資訊 標題 總長度等
            info = await ytdl.getInfo(client.musicDict.get(guildID)[i]);
            //歌曲標題
            title = info.videoDetails.title;
            //串字串
            queueMessage.push(`${i + 1}.  ${title}`);
        }
        //把最前面的\n拿掉

        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')    // 顏色
            .setTitle('🎶 隊列清單')      // 標題
            .setDescription(queueMessage.join('\n')); //描述
        msg.channel.send({ embeds: [embed] });
        msg.channel.send(`目前僅顯示前5首，共有${client.musicDict.get(guildID2).length}首歌!`);

    }
};






if (musicDict.get(guildID2).length > 0) {

}