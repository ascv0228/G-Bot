const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "nosex",
    permissions: [],
    member: [],

    async execute(client, msg, args) {
        let urls = [
            'https://c.tenor.com/NEl9pS8LFdUAAAAC/inawtf-%E5%B7%A5%E4%B8%89%E5%B0%8F.gif',
            'https://cdn.discordapp.com/attachments/964528474809323610/983338949038735411/7EFD54E2-971D-4EDB-A4F6-2D99AEF86EFC.gif',
            'https://media.discordapp.net/attachments/829678324150042684/972048166474092584/received_402828584784372.gif',
            'https://cdn.discordapp.com/attachments/964528474809323610/986532513419780096/image2.gif'
        ]
        msg.delete()
            .then(msg.channel.send({ content: urls[Math.random() * urls.length | 0] }));


    }
};