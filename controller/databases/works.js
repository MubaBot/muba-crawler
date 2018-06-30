const config = require('../../config').config;

const works = require('../../models/works');

exports.getAllWorks = () => {
    console.log(works);
    return works.find({}).then(works => works).catch(err => console.log(err));
}

exports.insertWork = async (engine, keyword) => {
    const engines = config.engines;

    for (var e in engines) {
        if (e == engine) {
            return works.findOne({ searchEngine: engine, keyword: keyword }).then((already) => {
                if (already == null) {
                    works.create({ searchEngine: engine, keyword: keyword, page: engines[e].page.start });
                    return { status: 0, msg: keyword };
                } else {
                    return { status: -1 };
                }
            });
        }
    }

    return { status: -2 };
}