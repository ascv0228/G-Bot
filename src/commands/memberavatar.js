const { prefix } = require('../../config/config.json');

module.exports = {
    name: "memberavatar",
    aliases: ["memavt"],

    async execute(client, msg, args) {
        if (!msg.content.startsWith(`${prefix}`)) return;
        let user = msg.mentions.members.first() || msg.member;
        const avatarEmbed = new Discord.MessageEmbed()
            .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
            .setFooter({
                text: msg.author.tag,
                iconURL: msg.member.displayAvatarURL({ dynamic: true })
            });
        msg.channel.send({ embeds: [avatarEmbed] });
    }
};
