const config = require('../../config').config;

const queue = require('../../models/crawl-queue');

exports.enqueueUrl = (url) => {
    return queue.findOne({ url: url }).then((already) => {
        if (already == null) {
            queue.create({ url: url });
            return { status: 0 };
        } else {
            return { status: -1 };
        }
    });
}

exports.dequeueUrl = () => {
    return queue.findOneAndRemove({}, { sort: 'updatedAt' }).then(url => url).catch(err => console.log(err));
}