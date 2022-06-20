module.exports = {
    name: "早安",
    member: ["411895879935590411"],
    execute(client, msg) {
        if (!this.member.includes(msg.author.id)) return;
        switch (msg.author.id) {
            case this.member[0]:
                return msg.reply({ content: '棗安' });
        }

    }
};