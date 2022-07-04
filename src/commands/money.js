const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "money",
    aliases: [],
    guilds: [],

    async execute(client, msg, args) {
        if (!args.length) return msg.reply({ content: '輸入n個數字' });
        let moneys_array = args.map((wave) => getMoney(wave));
        let output_string = moneys_array.join('+') + '\n';
        const sum = moneys_array.reduce((partialSum, a) => partialSum + a, 0);
        output_string += `總共: ${sum > 4000 ? 4000 : sum}`

        msg.reply({ content: output_string })


    }
};

function getMoney(wave) {
    if (wave < 55) return 0;
    if (wave >= 500) return 4000;
    if (wave >= 90) return 1000;
    return 300 + Math.floor((wave - 55) / 5) * 100
}
