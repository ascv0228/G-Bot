const { prefix } = require('../../config/config.json');

module.exports = {
    name: "getall",

    async execute(client, msg, args) {
        if (!msg.content.startsWith(`${prefix}`)) return;
        if (!msg.author.id == '411895879935590411') return;
        let temp = await collection.find({}).toArray();
        console.log(temp)
        msg.reply('Finish!');
        return;
    }
};
