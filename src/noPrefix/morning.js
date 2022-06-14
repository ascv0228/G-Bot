module.exports = {
    name: "早安",
    member: ["927937812605595739"],
    execute(client, msg) {
        if (!this.member.includes(msg.author.id)) return;
        switch (msg.author.id) {
            case this.member[0]:
                return msg.reply({ content: '窩可愛ㄉ寶貝，早安😘' });
        }

    }
};