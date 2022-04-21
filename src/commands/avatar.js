const { prefix } = require('../../config/config.json');

module.exports = {
    name: "avatar",
    aliases: ["avt"],

    async execute(client, msg, args) {/*
        if (!msg.content.startsWith(`${prefix}`)) return;
        let user = msg.mentions.users.first() || msg.author;
        const avatarEmbed = new Discord.MessageEmbed()
            .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
            .setFooter({
                text: msg.author.tag,
                iconURL: msg.member.displayAvatarURL({ dynamic: true })
            });
        msg.channel.send({ embeds: [avatarEmbed] });*/
    }
};