const config = require('../../config');
const pm2 = require('pm2');
const urlencode = require('urlencode');

const works = require('../databases/works');

let cralwers = [];
let running = {};
let length = 1;

new Promise((resolve) => pm2.list((err, list) => {
  for (let i in list)
    if (list[i].name == 'Muba Crawler')
      cralwers.push(list[i].pm_id);

  resolve(cralwers);
})).then((c) => {
  for (let i in c) running[c[i]] = 0;
  length = c.length;

  setInterval(getList, 15000);
  // setInterval(getList, 15000);
}).catch(err => console.log(err));


function getList() {
  works.getAllWorks().then((ws) => {
    for (var i = 0; i < ws.length && i < length; i++)
      run(makeListUrl(ws[i].searchEngine, ws[i].mode, ws[i].keyword, ws[i].page), ws[i].searchEngine, 'LIST', ws[i]._id);
  });
};

function makeListUrl(engine, mode, keyword, page) {
  const e = config.engines[engine];
  let m = '';

  if (mode) m = `&${e.mode[mode].param}=${e.mode[mode].value}`

  return `${e.url}?${e.page.param}=${page}&${e.query}=${urlencode(keyword)}${m}`;
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
  for (let pid in running)
    if (running[pid] == id) return true;
  
  return false;
}

function runParser(pid, url, engine, mode, id) {
  pm2.sendDataToProcessId({
    type: 'process:msg',
    data: { url, engine, id, parent: process.env.pm_id },
    id: pid,
    topic: mode
  }, function (err, res) {
  });
}

process.on('message', async function (packet) {
  running[packet.data.id] = 0;
});