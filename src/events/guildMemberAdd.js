const client = require("../../bot.js");

client.on('guildMemberAdd', member => {
    if (member.guild.id == '829673608791851038') {
        member.roles.add('986888997538246748');
    }
    if (member.guild.id == '1002583252923596820') {
        member.roles.add('1004332619971956777')
    }
});