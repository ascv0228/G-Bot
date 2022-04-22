const { prefix } = require('../../config/config.json');

module.exports = {
    name: "test",

    async execute(client, msg, args) {
        if (!msg.content.startsWith(`${prefix}`)) return;
        if (!msg.author.id == '411895879935590411') return;
        msg.reply('Finish!');
        console.log(args)
        return;
    }
};