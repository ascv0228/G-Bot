const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "dbPush",
    aliases: [],
    guilds: [],

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        if (args.length < 2) return msg.reply(`g!${this.name} <dbClass> <something> ...`);
        if (args[0] == 'reward-4000-ticket' || args[0] == 'reward-4000')
            Reward4000(client, args)

    }
}

async function Reward4000(client, args) {
    client.Mdbcollection.updateOne({ type: 'reward-4000-ticket' }, { "$set": { [`msg.${args[1]}`]: `${args[2]}` } });
}
