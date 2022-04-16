const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const { token } = require('./config/token.json');
const { prefix } = require('./config/config.json');
const fs = require('fs');
const target_channel = require('./config/channelId.json');
const hashDataJson = require('./hashData.json');
const { send } = require('process');
const image_hash = require('./bot/image-hash.js');
const base_command = require('./bot/base-command.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

process.on('uncaughtException', (err, origin) => {
    console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error(reason);
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', msg => {
    try {
        if (!msg.guild || !msg.member) return;
        if (!msg.member.user) return;
        if (msg.member.user.bot) return;
    } catch (err) {
        return;
    }
    if (msg.content.startsWith(`x!envelope`) ||
        msg.content.startsWith(`x!pasred`)) {
        base_command.redEnvelope(msg)
    }
    if (msg.channel.id == target_channel[0].channel_Id ||
        msg.channel.id == target_channel[1].channel_Id ||
        msg.channel.id == target_channel[2].channel_Id ||
        msg.channel.id == target_channel[3].channel_Id ||
        msg.channel.id == target_channel[4].channel_Id) {
        confirmReward(msg);
    }
    if ((msg.member.permissions.has('ADMINISTRATOR') ||
        msg.author.id == "942746613263245312") &&
        msg.content.startsWith(`${prefix}`)) {
        if (msg.content == `${prefix}help` ||
            msg.content == `${prefix}h`) {
            base_command.AdminHelp(msg);
        }
        else {
            AdminFunction(msg);
            baseFunction(msg);

        }
    } else if (msg.content.startsWith(`${prefix}`)) {
        if (msg.content == `${prefix}help` ||
            msg.content == `${prefix}h`) {
            base_command.BaseHelp(msg);
        }
        baseFunction(msg);
    }
    if (msg.author.id == "942746613263245312" && !msg.content.startsWith(`${prefix}`)) {
        cuteFunction(msg);
    }
});
async function AdminFunction(msg) {
    if (msg.content.startsWith(`${prefix}hash`)) {
        const url = msg.content.split(' ').splice(1).join(' ');
        if (!url.startsWith("http")) return;
        const hash = await image_hash.getHashDataFromUrl();
        msg.channel.send('`' + hash + '`');
    }
    else if (msg.content.startsWith(`${prefix}avatar`) ||
        msg.content.startsWith(`${prefix}avt`)) {
        base_command.getAvatar(msg);

    }
    else if (msg.content.startsWith(`${prefix}memberavatar`) ||
        msg.content.startsWith(`${prefix}memavt`)) {
        base_command.getMemberAvatar(msg);

    }/*
    else if (msg.content.startsWith(`${prefix}save`)) {
        const JsonStr = JSON.stringify(hashDataJson);
        fs.writeFile('./hashData.json', JsonStr, (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
        });

    }*/
    else if (msg.content == `${prefix}test` && msg.author.id == '411895879935590411') {
        client.users.fetch('411895879935590411', false).then((user) => {
            user.send('hello world');
            let person = client.members.cache.get('942746613263245312');
            /*const avatarEmbed = new Discord.MessageEmbed()
                .setImage(person.displayAvatarURL({ size: 4096, dynamic: true }))
                .setFooter({
                    text: msg.author.tag,
                    iconURL: msg.member.displayAvatarURL({ dynamic: true })
                });*/
            user.send(person.displayAvatarURL({ size: 4096, dynamic: true }));
        });
    }
}

async function baseFunction(msg) {
    if (msg.content == `${prefix}ping`) {
        base_command.getPing(msg);
    }
}

function cuteFunction(msg) {
    if (msg.content.includes("早安")) {
        msg.reply("小可愛早安~~");
    }
    if (msg.content.includes("晚安")) {
        msg.reply("晚安晚安早點休息~");
    }
    if (msg.content.includes("午安")) {
        msg.reply("要記得吃午餐唷~");
    }
}

/*
function cutImageUrl(url) {
    const subFiles = [".png", ".jpg", ".jpeg", ".webp"]

    for (let i = 0; i < subFiles.length; ++i) {
        let index = url.indexOf(subFiles[i], 40);
        if (index == -1) continue;
        //return 1;
        return url.slice(0, (index += (i < 2) ? 4 : 5))
    }
    return 0;
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
}*/

async function confirmReward(msg) {
    let ImageUrlArray = image_hash.getImageUrlArray(msg)
    for (let i = 0; i < ImageUrlArray.length; ++i) {
        const hash = await image_hash.getHashDataFromUrl(ImageUrlArray[i]);
        client.channels.cache.get('863086136180342804').send('`' + hash + '`')
    }
}




client.login(token);
