// custom reusable error class to capture errors/codes and send custom messages 

class AppError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}
module.exports = AppError;