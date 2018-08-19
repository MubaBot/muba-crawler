const pm2 = require("pm2");

const parser = require("../parser");

pm2.describe(process.env.pm_id, (err, describe) => {
  if (err) return;

  switch (describe[0].name) {
    case "Load Balancer":
      require("./pm2");
      break;
    case "Muba Crawler":
      onMessage();
      break;
    default:
      return;
  }
});

function onMessage() {
  process.on("message", async function(packet) {
    let parsing = function() {};
    let getConfig = function(domain) {
      return true;
    };

    switch (packet.topic) {
      case "LIST":
        parsing = parser.search;
        getConfig = parser.getSearchConfig;
        flag = packet.data.engine;
        break;
      case "DATA":
        parsing = parser.getContent;
        getConfig = parser.getParserConfig;
        flag = parser.makeDomainByUrl(packet.data.url);
        break;
      default:
      // parsing = console.log;
    }

    let result = { success: true };
    let c = getConfig(flag);
    if (c) {
      const html = await parser.request(packet.data.url, { referer: packet.data.engine, iframe: c.iframe });
      result = await parsing(packet.data, html);
    }

    parser.removeOrUpdateById(packet.data.id, packet.topic, result);

    pm2.sendDataToProcessId(
      {
        type: "process:msg",
        data: { id: process.env.pm_id },
        id: packet.data.parent,
        topic: "DONE"
      },
      function(err, res) {}
    );
  });
}
