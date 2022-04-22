const { getVideoID } = require('ytdl-core');
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const Discord = require('discord.js');

const { prefix } = require('../../config/config.json');

module.exports = {
    name: "nowplaying",
    aliases: ["np"],

    async execute(client, msg, args) {
        guildID = msg.guild.id;
        if (dispatcher !== undefined && client.musicDict.get(guildID).length > 0) {
            const info = await ytdl.getInfo(client.musicDict.get(guildID)[0]);
            const title = info.videoDetails.title;
            const songLength = info.videoDetails.lengthSeconds;
            const nowSongLength = Math.floor(dispatcher.streamTime / 1000);
            const npembed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Now Play Music')
                .setDescription(`${title}\n${streamString(songLength, nowSongLength)}`); //描述

            msg.reply({ embeds: [npembed] });
        }
    }
};

//▬▬▬▬▬▬▬▬▬🔘▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
function streamString(songLength, nowSongLength) {
    let mainText = '🔘';
    const secondText = '▬';
    const whereMain = Math.floor((nowSongLength / songLength) * 100);
    let message = '';
    for (i = 1; i <= 30; i++) {
        if (i * 3.3 + 1 < whereMain) {
            message += secondText;
        } else {
            message += mainText;
            mainText = secondText;
        }
    }
    return message;
}