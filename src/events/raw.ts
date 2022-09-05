import auth from "../utils/auth";
import { ZClient } from "../structure/client";

export = {
    name: 'raw',

    async execute(client: ZClient, packet: any, id: number) {
        if (packet.d && !auth.isAuthGuild(packet.d.guild_id)) return;

        client.manager.updateVoiceState(packet);
    },
};