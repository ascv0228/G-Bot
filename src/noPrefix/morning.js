module.exports = {
    name: "早安",
    member: ["411895879935590411"],
    channels: ['863086136180342804'],
    execute(client, msg) {
        if (!this.member.includes(msg.author.id)) return;
        if (!this.channels.includes(msg.channel.id) &&
            !(msg.channel.isThread() && this.channels.includes(msg.channel.parentId))) return;
        switch (msg.author.id) {
            case this.member[0]:
                return msg.reply({ content: '棗安' });
        }

    }
};