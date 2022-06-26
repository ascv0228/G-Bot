const Discord = require('discord.js');
var os = require('os');

module.exports = {
    name: "bot",
    member: ['411895879935590411'],
    async execute(client, msg, args) {
        const totalram = ((os.totalmem() / 10 ** 6 + " ").split('.')[0]);
        const freeram = ((os.freemem() / 10 ** 6 + " ").split('.')[0]);
        const usedram = (((os.totalmem() - os.freemem()) / 10 ** 6 + " ").split('.')[0]);
        const prctfreeram = (((os.freemem() * 100) / os.totalmem + " ").split('.')[0]);
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle("Statistics")
            .setDescription("Stats of the bot")
            .addFields(
                { name: 'Memory (RAM)', value: `Total Memory: ${totalram}MB\nUsed Memory: ${usedram}MB\nFree Memory: ${freeram}MB\nPercentage Of Free Memory: ${prctfreeram}%`, inline: false },
            )
            .setTimestamp()
            .setFooter(`Requested by ${msg.author.username}`, msg.author.displayAvatarURL({ dynamic: true }))

        msg.channel.send({ embeds: [embed] })
    }
};