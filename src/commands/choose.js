module.exports = {
    name: "choose",
    aliases: [],

    async execute(client, msg, args) {
        return msg.reply({ content: `${args[args.length * Math.random() | 0]}` });
    }
}