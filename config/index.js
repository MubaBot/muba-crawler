exports.config = {
    engines: {
        naver: {
            url: 'https://search.naver.com/search.naver',
            query: 'query',
            mode: [
                {
                    name: 'blog',
                    params: {
                        key: 'where',
                        value: 'post'
                    },
                }
                // { name: 'cafe', params: 'where=article' },
                // { name: 'kin', params: 'where=kin' }
            ],
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
    },
    parser: {

    }
}