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
                    works.create({ searchEngine: engine, keyword: keyword });
                    return keyword;
                } else {
                    return null;
                }
            });
        }
    }
}