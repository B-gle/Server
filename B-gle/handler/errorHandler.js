const errorHandler = function (err, req, res, next) {
    res.status(err.code || 500);
    res.send("Oops, something went wrong.");
};

module.exports = errorHandler;