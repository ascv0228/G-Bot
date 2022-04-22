const { getVideoID } = require('ytdl-core');
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const Discord = require('discord.js');

const { prefix } = require('../../config/config.json');

module.exports = {
    name: "nowplaying",
    aliases: ["np"],

    async execute(client, msg, args) {
        if (!msg.content.startsWith(`${prefix}`)) return;
        const guildID = msg.guild.id;
        const urlED = args[0];
        let currentIndex = client.musicDict.get(guildID).length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [client.musicDict.get(guildID)[currentIndex], client.musicDict.get(guildID)[randomIndex]] =
                [client.musicDict.get(guildID)[randomIndex], client.musicDict.get(guildID)[currentIndex]];
        }
        const message = `已將 ${client.musicDict.get(guildID).length}首歌打亂!`;
        msg.channel.send(message);
        return;

    }
};

async function musicListShuffle(channelID, guildID2) {

}