const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "getEmojis",
    aliases: ['ge'],

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        // console.log(client.emojis)
        // for (let guildID of client.Guilds) {
        // for (let emoji of await ((await dcUtil.getGuildByID(client, guildID)).emojis.fetch({ force: true }))) {
        switch (args[0]) {
            case 'a':
                msg.guild.emojis.fetch({ force: true })
                    .then(emojis => {
                        for (let emoji of emojis) {
                            console.log(`${emoji}`)
                        }
                    })
                    .catch(console.error);
                break
            case 'b':
                msg.guild.emojis.fetch({ force: true })
                    .then(emojis => console.log(`${emojis}`))
                    .catch(console.error);
                break
            case 'c':
                const emojis = msg.guild.emojis.cache
                    .map((e) => `${e} **-** \`:${e.name}:\` and \`${e.id}\``)
                    .join(', ');
                console.log(emojis)

        }
        // for (let emoji of await msg.guild.emojis.fetch({ force: true })) {
        //     console.log(emoji)
        // }
        // }
    }
};

