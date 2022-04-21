module.exports = {
    name: "ping",
    // channels: ["xxxx", "xxxxx"],

    async execute(client, msg, args) {
        if (!msg.content.startsWith(`${prefix}`)) return;
        const resMsg = await msg.channel.send({ content: 'Ping...' });
        await resMsg.edit({ content: `Ping: ${resMsg.createdTimestamp - msg.createdTimestamp}ms | Websocket: ${client.ws.ping}ms` });
    }
};