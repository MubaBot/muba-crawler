exports.config = {
    engines: {
        naver: {
            url: 'https://search.naver.com/search.naver',
            query: 'query',
            mode: [
                { name: 'blog', params: 'where=post' },
                { name: 'cafe', params: 'where=article' },
                { name: 'kin', params: 'where=kin' }
            ],
            page: {
                param: 'start',
                count: 10,
                start: 1
            }
        }
    },
    parser: {

    }
}