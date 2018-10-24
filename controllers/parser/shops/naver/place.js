const cheerio = require("cheerio");

const shops = require("@databases/shops");

module.exports = async (config, info, html) => {
  const $ = cheerio.load(html);

  const $name = $(".ct_box_area .biz_name_area strong.name");
  const names = $name.text().split(" ");
  // const name = names.filter((v, i) => !(i === names.length - 1 && /점$/.test(v))).join(" ");
  const name = names.join(" ");
  // console.log(name);

  const $addr = $(".list_bizinfo .list_address .addr");
  const addr1 = $addr.length >= 1 ? $addr[0].children[0].data.split(" ") : [];
  const addr2 = $addr.length >= 2 ? $addr[1].children[0].data.split(" ") : [];
  const state = addr1[0];
  const city = addr1[1];

  const address =
    $addr.length === 0 ? [] : [state, city, [addr1[2], addr1[3]].join(" "), [addr2[0], addr2[1]].join(" "), [...addr1.slice(4), ...addr2.slice(2)].join(" ")];
  // console.log($addr.length === 2 ? "" : address);

  const $time = $(".list_bizinfo .list_item_biztime .biztime > span > span");

  let t = [];
  $time.map((i, v) => t.push(v.children[0].data));

  const days = {
    매일: ["월", "화", "수", "목", "금", "토", "일"],
    평일: ["월", "화", "수", "목", "금"],
    주말: ["토", "일"],
    토요일: ["토"],
    일요일: ["일"]
  };

  let times = {};

  for (let i in t) {
    if (!/[\d][\d]:[\d][\d] - [\d][\d]:[\d][\d]$/.test(t[i])) {
      // console.log("요일", t[i]);
      continue;
    }
    const dates = t[i].split(" ");
    const day = dates[0];
    const open = { hour: dates[1].split(":")[0], minute: dates[1].split(":")[1] };
    const close = { hour: dates[3].split(":")[0], minute: dates[3].split(":")[1] };

    for (let dt in days[day]) {
      const d = days[day][dt];
      times[d] = {
        day: d,
        open: open,
        close: close
      };
    }
  }
  // console.log(times);

  const $tel = $(".list_item_biztel .txt");
  const tel = $tel.text();
  // console.log(tel);

  const $menus = $(".list_bizinfo ul.list_menu li .list_menu_inner");
  let menus = [];

  let prices = [];
  let mnames = [];

  const $prices = $menus.children(".price");
  const $mnames = $menus.find(".menu .name");

  if ($prices.length !== $mnames.length) console.log($prices.length, $mnames.length);
  else {
    $prices.map((i, v) => prices.push(v.children[0].data));
    $mnames.map((i, v) => mnames.push(v.children[0].data));

    for (let i = 0; i < $prices.length; i++) {
      const p = prices[i].replace(/,/gi, "").replace("원", "");
      if (!/^(\d)*$/.test(p)) {
        // console.log("가격", p);
        continue;
      }

      menus.push({
        name: mnames[i],
        price: p
      });
    }
  }

  if (shops.createShop(info, name, { state: address[0], city: address[1], address1: address[2], address2: address[3], options: address[4] }, times, tel, menus))
    return { success: true };
  return { success: false };
};
