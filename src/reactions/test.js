module.exports = {
    name: "test",
    message_Id: ["991267187660693504"],

    async execute(client, event, reaction, user) {
        switch (event) {
            case 'messageReactionAdd':
                reaction.message.channel.send(`${user.username || user.id || user} Add ${reaction.emoji.name}`)
                break;
            case 'messageReactionRemove':
                reaction.message.channel.send(`${user.username || user.id || user} Remove ${reaction.emoji.name}`)
                break;

        }
    }
};
