module.exports = {
    name: "早安",
    aliases: ["早ㄢ", "早ㄤ", "棗安", "棗ㄢ", "棗ㄤ", "澡ㄢ"],
    member: ["411895879935590411", "832777502848974920"],
    execute(client, msg) {
        if (!this.member.includes(msg.author.id)) return;
        switch (msg.author.id) {
            case this.member[0]:
                return msg.reply({ content: '棗安' });
            case this.member[1]:
                return msg.reply({ content: '臭GG 澡ㄢ' });
        }

    }
};