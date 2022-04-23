const { prefix } = require('../../config/config.json');

module.exports = {
    name: "disconnect",
    aliases: ["di"],

    async execute(client, msg, args) {
        let guildID = msg.guild.id;
        let channelID = msg.channel.id
        if (client.voice.connections.get(guildID)) {
            client.musicDict.set(guildID, new Array());
            client.voice.connections.get(guildID).disconnect();

            client.channels.fetch(channelID).then(channel => channel.send('音樂歌單已播放完畢'));
        } else client.channels.fetch(channelID).then(channel => channel.send('我還沒進去呢:3'))

    }
};