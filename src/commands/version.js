module.exports = {
    name: "version",

    execute(client, msg, args) {
        let temp = ["分檔中...",
            "play、playnext重複"]
        msg.reply({ content: temp.join("\n") });
        return
    }
};
