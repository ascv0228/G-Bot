const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "getEmojis",
    aliases: ['ge'],

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        // console.log(client.emojis)
        let channel_id = (args[0] == 'a') ? '991628130336907315' : '991629663900270632'
        let channel = (args[0] == 'b') ? (await client.channels.fetch(channel_id)) : msg.channel;


        for (let guild of client.Guilds) {
            for (let emoji of await ((await dcUtil.getGuildByID(client, guild[0])).emojis.fetch())) {
                channel.send({ content: `${emoji}  ${emoji.id}` })
            }
        }
        // switch (args[0]) {


        //     case 'd':
        //         msg.guild.emojis.fetch()
        //             .then(emojis => console.log(`${emojis.size}`))
        //             .catch(console.error);
        //         break

        // }
        // for (let emoji of await msg.guild.emojis.fetch({ force: true })) {
        //     console.log(emoji)
        // }
        // }
    }
};

