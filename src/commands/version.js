module.exports = {
    name: "version",

    execute(client, msg, args) {
        let temp = ["avatar和memberavatar合在一起...",
            "banner新增中"]
        msg.reply({ content: temp.join("\n") });
        return
    }
};
