const { prefix } = require('../../config/config.json');
const Discord = require('discord.js');

module.exports = {
    name: "getDB",

    async execute(client, msg, args) {
        if (!msg.content.startsWith(`${prefix}`)) return;
        if (!['411895879935590411', '702385586941722654', '342604295520124939',
            '830469275528986695', '765629373084074064'].includes(msg.author.id)) return;
        if (args.includes('all'))
            getAll(client);
        if (args.includes('reward'))
            getReward(client, args);
        if (args.includes('check-msg'))
            getCheckMsg(client, args)

        return msg.reply('Finish!');
    }
};


async function getAll(client, msg, args) {
    let temp = await client.Mdbcollection.find({}).toArray();
    jsonString = JSON.stringify({ ...temp }, null, 4);
    const attachment = new Discord.MessageAttachment(Buffer.from(jsonString, 'utf-8'), 'log.json');
    msg.author.send({ files: [attachment] })
}

async function getReward(client, msg, args) {
    let temp = await client.Mdbcollection.find({ type: 'reward-ticket' }).toArray();
    jsonString = JSON.stringify({ ...temp }, null, 4);
    const attachment = new Discord.MessageAttachment(Buffer.from(jsonString, 'utf-8'), 'log.json');
    msg.author.send({ files: [attachment] })
}

async function getCheckMsg(client, msg, args) {
    let temp = await client.Mdbcollection.find({ type: 'check-msg' }).toArray();
    jsonString = JSON.stringify({ ...temp }, null, 4);
    const attachment = new Discord.MessageAttachment(Buffer.from(jsonString, 'utf-8'), 'log.json');
    msg.author.send({ files: [attachment] })
}
/*[
  'a',    'b',
  'c',    'd',
  'e',    '123',
  '8888'
]*/
//[ '<#966189840603414528>', '<@848194732143542324>' ]
/*[
  {
    _id: new ObjectId("625ff9e835e56372293440f0"),
    type: 'hashData',
    channelId: '963831403001307167',
    hash: [
    ]
  },
  {
    _id: new ObjectId("625ff9e835e56372293440f2"),
    type: 'hashData',
    channelId: '867811395474423838',
    hash: []
  },
  {
    _id: new ObjectId("625ff9e835e56372293440f8"),
    type: 'hashData',
    channelId: '863086136180342804',
    hash: []
  },
  {
    _id: new ObjectId("625ff9e835e56372293440f6"),
    type: 'hashData',
    channelId: '948120050458574878',
    hash: []
  },
  {
    _id: new ObjectId("625ff9e835e56372293440f4"),
    type: 'hashData',
    channelId: '886269472158138429',
    hash: []
  },
  {
    _id: new ObjectId("625ff9e835e56372293440fe"),
    type: 'check-msg',
    channelId: '867811395474423838',
    hash: [],
    users: [
      '895847048623050782', '947315612600909854',
      '747819452099198978', '832777502848974920',
      '832777502848974920', '908689933454180432',
      '601584574610276353', '682929023231459349',
      '480370748557623307', '712143365206179880',
      '740475461062230087', '832777502848974920',
      '832777502848974920', '481117275567685660',
      '959006743092928512', '881717237365485648',
      '682929023231459349', '854690565949620234',
      '473064408700944384', '731193222726156378',
      '558258440842117121', '554610160346202115',
      '515843873520484354', '721425888394215434',
      '958679303661441075', '548843759140601867',
      '218959772307816448', '859963425169080370',
      '639748720589799434', '470978558781816834',
      '689100428910133268', '844093549925892116',
      '889341769207128125', '889341769207128125',
      '514287200880427038', '514287200880427038',
      '737068033952055399', '928545072553795605',
      '579231390449795093', '715540596021919845',
      '881717237365485648', '476266597649088525',
      '958679303661441075', '481117275567685660'
    ]
  },
  {
    _id: new ObjectId("625ff9e835e5637229344100"),
    type: 'check-msg',
    channelId: '886269472158138429',
    hash: [],
    users: [
      '465862631899660308', '465862631899660308',
      '947315612600909854', '947676689801039892',
      '747819452099198978', '832777502848974920',
      '480370748557623307', '682929023231459349',
      '712143365206179880', '740475461062230087',
      '832777502848974920', '481117275567685660',
      '959006743092928512', '739329618586107994',
      '881717237365485648', '854690565949620234',
      '473064408700944384', '558258440842117121',
      '554610160346202115', '721425888394215434',
      '218959772307816448', '881717237365485648',
      '276581023490506752', '481117275567685660'
    ]
  },
  {
    _id: new ObjectId("625ff9e835e56372293440fc"),
    type: 'check-msg',
    channelId: '963831403001307167',
    hash: []
  },
  {
    _id: new ObjectId("625ff9e835e5637229344104"),
    type: 'check-msg',
    channelId: '863086136180342804',
    hash: []
  },
  {
    _id: new ObjectId("625ff9e835e5637229344102"),
    type: 'check-msg',
    channelId: '948120050458574878',
    hash: []
  },
  {
    _id: new ObjectId("62617f8a3779bee587d45963"),
    type: 'reward-ticket',
    msg: [
      '<@947315612600909854> 2',
      '<@601584574610276353> 2',
      '<@!854690565949620234> 2',
      '<@!569031573287075850> 2'
    ]
  }
]*/