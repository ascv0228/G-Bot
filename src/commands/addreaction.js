const { prefix } = require('../../config/config.json');
module.exports = {
    name: "addreaction",
    aliases: ["ar"],

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        if (!args || args.length < 3) {
            return msg.reply(`${prefix}${this.name} <channel_Id> <msg_Id> <reaction>`)
        }
        let channelID = args[0];
        let msg_id = args[1];
        let reaction = args[2];
        let channel = await client.channels.fetch(channelID);
        let message = await channel.messages.fetch(msg_id);
        message.react(reaction);
    }
};
