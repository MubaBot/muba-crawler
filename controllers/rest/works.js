const work = require("@databases/works");

exports.getAllWorks = (req, res, next) => {
  (async () => {
    const works = await work.getAllWorks();
    return res.send(works);
  })();
};
