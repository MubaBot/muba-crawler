const parser = {
  'm.cafe.naver.com': {
    path: 'naver/cafe',
    title: '.post_title .tit',
    content: '#postContent',
    comments: '.section_comment'
  },
  'm.blog.naver.com': {
    path: 'naver/blog',
    title: '.se_title',
    content: '.__se_component_area',
    comments: '.section_comment'
  },
  '*.tistory.com': {
    path: 'tistory',
    title: 'td',
    content: [
      'article',
      '.area_view',
      '.article',
      '#article',
      '.jb-article',
      '.entry',
      '.article_body',
      '.blogview_content',
      '.tt_article_useless_p_margin',
    ].join(','),
    comments: '#cmt_list li:not(.board-box-line-dashed)'
  },
  
  'store.naver.com': {
    path: 'naver/place'
  }
}

module.exports = parser;