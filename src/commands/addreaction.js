const { prefix } = require('../../config/config.json');
module.exports = {
    name: "addreaction",
    aliases: ["ar"],
    member: ["411895879935590411", "832777502848974920"],
    async execute(client, msg, args) {
        if (!this.member.includes(msg.author.id)) return;
        switch (msg.author.id) {
            case this.member[0]:
                return myAddReaction(client, msg, args);
            case this.member[1]:
                return catAddReaction(client, msg, args);
        }

    }
};

async function myAddReaction(client, msg, args) {
    if (msg.type === 'REPLY') {
        if (!args || args.length < 1) {
            return msg.reply('`1.(using reply)` ' + `${prefix}${this.name}  <reaction>\n`
                + '`2.` ' + `${prefix}${this.name} <channel_Id> <msg_Id> <reaction>`)
        }
        let msg1 = await msg.fetchReference();
        let reaction = args[0];
        msg1.react(reaction)
        // msg1.react(reaction).catch(() => { });
        msg.delete();
        return;
    }
    if (!args || args.length < 3) {
        return msg.reply(`${prefix}${this.name} <channel_Id> <msg_Id> <reaction>`)
    }
    let channelID = args[0];
    let msg_id = args[1];
    let reaction = args[2];
    let channel = await client.channels.fetch(channelID);
    let message = await channel.messages.fetch(msg_id);
    message.react(reaction);
    // message.react(reaction).catch(() => { });
}

async function catAddReaction(client, msg, args) {
    if (msg.type !== 'REPLY') {
        if (!args || args.length < 1) {
            return msg.reply('`(using reply)`  ' + `${prefix}${this.name}  <reaction>`)
        }
        let msg1 = await msg.fetchReference();
        let reaction = args[0];
        msg1.react(reaction).catch(() => { });
        msg.delete();
        return;
    }
}
