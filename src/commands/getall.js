const { prefix } = require('../../config/config.json');
//const mongoose = require('mongoose');
/*
mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("The client is now connected to the database!")
}).catch((err) => {
    console.log(err)
});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
let collection = db.collection('Clients');*/


module.exports = {
    name: "getall",

    async execute(client, msg, args) {/*
        if (!msg.content.startsWith(`${prefix}`)) return;
        if (!msg.author.id == '411895879935590411') return;
        let temp = await collection.find({}).toArray();
        console.log(temp)
        msg.reply('Finish!');*/
        return;
    }
};
