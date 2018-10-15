const Config = require("@databases/config");
const pm2 = require("pm2");
const urlencode = require("urlencode");

const works = require("@databases/works");
const queue = require("@databases/queue");

let crawlers = [];
let running = {};
let runcount = {};
let length = 1;

const MAX_RUNCOUNT = 500;

new Promise(resolve =>
  pm2.list((err, list) => {
    for (let i in list) if (list[i].name == "Muba Crawler") crawlers.push(list[i].pm_id);

    resolve(crawlers);
  })
)
  .then(c => {
    for (let i in c) {
      running[c[i]] = 0;
      runcount[c[i]] = 0;
    }

    length = c.length;

    setInterval(getList, 15000);
    setInterval(getUrlContent, 300000 / length);
  })
  .catch(err => console.log(err));

function getList() {
  works.getAllWorks().then(async ws => {
    for (var i = 0; i < ws.length && i < length; i++) {
      run(await makeListUrl(ws[i].searchEngine, ws[i].mode, ws[i].keyword, ws[i].page), ws[i].searchEngine, "LIST", ws[i]._id);
    }
  });
}

function getUrlContent() {
  queue.deQueueUrl().then(u => {
    if (u == null) return;
    const id = u._id;
    const url = u.url;
    const referer = u.referer;

    run(url, referer, "DATA", id);
  });
}

async function makeListUrl(engine, mode, k, page) {
  const config = await Config.getSearchConfig();
  const e = config[engine];
  const param = e.page.param;
  const query = e.query;
  const keyword = urlencode(k);

  if (/^`(.*)`$/.test(e.url)) return eval(e.url);

  return `${e.url}?${param}=${page}&${query}=${keyword}` + (mode ? `&${e.mode[mode].param}=${e.mode[mode].value}` : "");
}

// mode 'LIST', 'DATA'
function run(url, engine, mode, id) {
  addRunCount();
  if (isRun(id)) return false;
  for (let pid in running) {
    if (running[pid] === 0) {
      running[pid] = id;
      runcount[pid] = 0;
      runParser(pid, url, engine, mode, id);
      break;
    }
  }
}

function addRunCount() {
  for (let pid in runcount) {
    if (running[pid].toString() !== "0") {
      runcount[pid]++;
      if (runcount[pid] > MAX_RUNCOUNT) {
        pm2.restart(pid, (err, apps) => console.log(err));

        runcount[pid] = 0;
        running[pid] = 0;
      }
    }
  }
}

function isRun(id) {
  for (let pid in running) {
    if (running[pid].toString() === id) {
      return true;
    }
  }

  return false;
}

function runParser(pid, url, engine, mode, id) {
  pm2.sendDataToProcessId(
    {
      type: "process:msg",
      data: { url, engine, id, parent: process.env.pm_id },
      id: pid,
      topic: mode
    },
    function(err, res) {}
  );
}

process.on("message", async function(packet) {
  running[packet.data.id] = 0;
  runcount[packet.data.id] = 0;
});
