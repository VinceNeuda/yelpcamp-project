//  modulised try-catch error handler 
module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}