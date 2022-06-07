
module.exports = {
    name: "ping",

    async execute(client, msg, args) {
        const resMsg = await msg.channel.send({ content: 'Ping...' });
        await resMsg.edit({ content: `Ping: ${resMsg.createdTimestamp - msg.createdTimestamp}ms | Websocket: ${client.ws.ping}ms` });
    }
};