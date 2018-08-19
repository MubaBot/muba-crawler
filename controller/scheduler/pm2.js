const config = require("../../config");
const pm2 = require("pm2");
const urlencode = require("urlencode");

const works = require("../databases/works");
const queue = require("../databases/crawl-queue");

let crawlers = [];
let running = {};
let length = 1;

new Promise(resolve =>
  pm2.list((err, list) => {
    for (let i in list) if (list[i].name == "Muba Crawler") crawlers.push(list[i].pm_id);

    resolve(crawlers);
  })
)
  .then(c => {
    for (let i in c) running[c[i]] = 0;
    length = c.length;

    setInterval(getList, 15000);
    setInterval(getUrlContent, 10000 / length);
  })
  .catch(err => console.log(err));

function getList() {
  works.getAllWorks().then(ws => {
    for (var i = 0; i < ws.length && i < length; i++) {
      run(makeListUrl(ws[i].searchEngine, ws[i].mode, ws[i].keyword, ws[i].page), ws[i].searchEngine, "LIST", ws[i]._id);
    }
  });
}

function getUrlContent() {
  queue.dequeueUrl().then(u => {
    if (u == null) return;
    const id = u._id;
    const url = u.url;
    const referer = u.referer;

    run(url, referer, "DATA", id);
  });
}

function makeListUrl(engine, mode, keyword, page) {
  const e = config.engines[engine];
  const param = e.page.param;
  const query = e.query;

  if (/^`(.*)`$/.test(e.url)) return eval(e.url);

  return `${e.url}?${param}=${page}&${query}=${urlencode(keyword)}` + (mode ? `&${e.mode[mode].param}=${e.mode[mode].value}` : "");
}

// mode 'LIST', 'DATA'
function run(url, engine, mode, id) {
  if (isRun(id)) return false;
  for (let pid in running) {
    if (running[pid] == 0) {
      running[pid] = id;
      runParser(pid, url, engine, mode, id);
      break;
    }
  }
}

function isRun(id) {
  for (let pid in running) if (running[pid].toString() == id) return true;

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
});
