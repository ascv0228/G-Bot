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
            // let msg_array = new Array()
            channel.send({ content: `ˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇ${guild[1]}ˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇ` })
            for (let [emoji_id, emoji] of await ((await dcUtil.getGuildByID(client, guild[0])).emojis.fetch(null, { force: true }))) {
                // msg_array.push(`${emoji}  ${emoji_id}`)
                // if (msg_array.length == 20) {
                //     await channel.send({ content: `${msg_array.join('\n')}` })
                //     msg_array = new Array()
                // }
                channel.send({ content: `${emoji}  ${emoji_id}` })
            }
            // if (msg_array.length) await channel.send({ content: `${msg_array.join('\n')}` })
            channel.send({ content: `^^^^^^^^^^^^^^^${guild[1]}^^^^^^^^^^^^^^^` })
        }
        // switch (args[0]) {a


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

