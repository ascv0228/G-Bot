import { ZClient } from "../structure/client";
import Discord from "discord.js";
import mongoose from "mongoose"
import db from "../database/db"
import tools from "../utils/tools";

export = {
    name: 'ready',
    once: true,

    execute(client: ZClient) {
        console.log(`Logged in as ${client.user.tag}!`);
        client.user.setActivity(`GG的大GG`, { type: Discord.ActivityType.Playing });
        client.loadMessages();
        client.application?.commands.set(client.slashCommands.map(c => c));
        tools.setTimeZone(client);
        if (client.botStatus['timezone'] == 0) {
            ExecShedule(client);
        }
        else {
            console.log(`'timezone' : ${client.botStatus['timezone']}`)
        }
    },
};


function ExecShedule(client: ZClient) {
    for (let [n, s] of client.schedules) {
        s.execute(client);
    }
}


// async function loadMongodb(client: ZClient) {
//     if (!db.db.DB_URI) return;
//     mongoose.Promise = global.Promise;
//     await mongoose.connect(database, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }).then(() => {
//         console.log("The client is now connected to the database!")
//     }).catch((err) => {
//         console.log(err)
//     });
//     let db = await mongoose.connection;;
//     client.Mdbcollection = await db.collection('Clients');
// }

/*
*
*Playing = 0,
*Streaming = 1,
*Listening = 2,
*Watching = 3,
*Custom = 4,
*Competing = 5
*
*/