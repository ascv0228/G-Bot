const client = require("../../bot.js");

client.on('guildMemberAdd', member => {
    if (member.guild.id == '829673608791851038') {
        member.roles.add('986888997538246748');
    }
});