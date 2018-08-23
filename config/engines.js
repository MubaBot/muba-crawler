const engines = {
  naver: {
    url: "https://search.naver.com/search.naver",
    query: "query",
    mode: {
      blog: {
        name: "네이버 블로그",
        param: "where",
        value: "post"
      },
      cafe: {
        name: "네이버 카페",
        param: "where",
        value: "article"
      }
    },
    page: {
      param: "start",
      count: 10,
      start: 1
    }
  },

  naverPlace: {
    url: "https://store.naver.com/restaurants/list",
    query: "query",
    name: "네이버 플레이스",
    page: {
      param: "page",
      count: 1,
      start: 1
    }
  },

  google: {
    url: "https://www.google.co.kr/search",
    query: "q",
    name: "구글",
    page: {
      param: "start",
      count: 10,
      start: 0
    }
  },

  daum: {
    url: "https://search.daum.net/search",
    query: "q",
    mode: {
      blog: {
        name: "다음 블로그",
        param: "w",
        value: "blog"
      }
    },
    page: {
      param: "page",
      count: 1,
      start: 1
    }
  },

  dcinside: {
    url: "`http://search.dcinside.com/post/${param}/${page}/${query}/${urlencode(keyword)}`",
    query: "q",
    name: "디시인사이드",
    page: {
      param: "p",
      count: 1,
      start: 1
    }
  }
};

module.exports = engines;
