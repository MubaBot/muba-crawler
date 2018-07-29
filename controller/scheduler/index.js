const pm2 = require('pm2');

const parser = require('../parser');

pm2.describe(process.env.pm_id, (err, describe) => {
  if (err) return;

  switch (describe[0].name) {
    case 'Load Balancer':
      require('./pm2');
      break;
    case 'Muba Crawler':
      onMessage();
      break;
    default:
      return;
  }
});

function onMessage() {
  process.on('message', async function (packet) {
    let parsing = function () { };
    let callback = function () { };
    switch (packet.topic) {
      case 'LIST':
        parsing = parser.search;
        // callback = 
        break;
      default:
        parsing = console.log;
    }

    let html = await parser.request(packet.data.url, console.log);
    const result = await parsing(packet.data.engine, html);

    parser.removeOrUpdateById(packet.data.id, packet.topic, result.success);

    pm2.sendDataToProcessId({
      type: 'process:msg',
      data: { id: process.env.pm_id },
      id: packet.data.parent,
      topic: 'DONE'
    }, function (err, res) {
      // console.log('end', packet.data.parent, err, res);
    });
  });
}
