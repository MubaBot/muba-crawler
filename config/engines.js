const engines = {
  naver: {
    url: 'https://search.naver.com/search.naver',
    query: 'query',
    mode: {
      blog: {
        param: 'where',
        value: 'post'
      },
      cafe: {
        param: 'where',
        value: 'article'
      },
      kin: {
        param: 'where',
        value: 'kin'
      }
    },
    page: {
      param: 'start',
      count: 10,
      start: 1
    }
  },

  google: {
    url: 'https://www.google.co.kr/search',
    query: 'q',
    page: {
      param: 'start',
      count: 10,
      start: 0
    }
  }
}

module.exports = engines;