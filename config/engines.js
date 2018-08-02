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
  },

  daum: {
    url: 'https://search.daum.net/search',
    query: 'q',
    mode: {
      blog: {
        param: 'w',
        value: 'blog'
      }
    },
    page: {
      param: 'page',
      count: 1,
      start: 1
    }
  },
  
  dcinside: {
    url: '`http://search.dcinside.com/post/${param}/${page}/${query}/${urlencode(keyword)}`',
    query: 'q',
    page: {
      param: 'p',
      count: 1,
      start: 1
    }
  },
}

module.exports = engines;