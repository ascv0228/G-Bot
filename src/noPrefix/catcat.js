module.exports = {
    name: "臭貓貓",
    aliases: ["臭喵喵"],
    guilds: ['829673608791851038', '988795992667193395'],

    execute(client, msg) {
        return msg.reply({ content: `<@832777502848974920>` })
            .catch(() => { })
    }

};