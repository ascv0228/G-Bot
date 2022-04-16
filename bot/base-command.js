const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const { token } = require('../config/token.json');
const { prefix } = require('../config/config.json');
const fs = require('fs');
const target_channel = require('../config/channelId.json');
const hashDataJson = require('../hashData.json');
const { send } = require('process');
const image_hash = require('./image-hash.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

function getPing(msg) {
    msg.channel.send(`Ping is ${Date.now() - msg.createdTimestamp}ms. API Ping is ${Math.round(client.ws.ping)}ms`);
}

function getAvatar(msg) {
    let user = msg.mentions.users.first() || msg.author;
    const avatarEmbed = new Discord.MessageEmbed()
        .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
        .setFooter({
            text: msg.author.tag,
            iconURL: msg.member.displayAvatarURL({ dynamic: true })
        });
    msg.channel.send({ embeds: [avatarEmbed] });
}
function getMemberAvatar(msg) {
    let user = msg.mentions.members.first() || msg.member;
    const avatarEmbed = new Discord.MessageEmbed()
        .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
        .setFooter({
            text: msg.author.tag,
            iconURL: msg.member.displayAvatarURL({ dynamic: true })
        });
    msg.channel.send({ embeds: [avatarEmbed] });
}
function redEnvelope(msg) {
    if (msg.content.startsWith(`x!envelope`)) {
        client.channels.cache.get('964699991601995787').send(msg.url);
        client.channels.cache.get('964699991601995787').send("無口令");
        return;
    }
    client.channels.cache.get('964699991601995787').send(msg.url);
    client.channels.cache.get('964699991601995787').send("口令:");
    client.channels.cache.get('964699991601995787').send(msg.content.split(' ').splice(3, 3, '').join(' '));

}


function AdminHelp(msg) {
    contentArray = [
        '`' + 'avatar, avt' + '`' + " : 查看頭像",
        '`' + 'memberavatar, memavt' + '`' + " : 查看伺服器頭像",
        '`' + 'ping' + '`' + " : 顯示延遲"
    ]
    msg.reply({ content: contentArray.join("\n") });
}
function BaseHelp(msg) {
    contentArray = [
        '`' + 'ping' + '`' + " : 顯示延遲"
    ]
    msg.reply({ content: contentArray.join("\n") });
}