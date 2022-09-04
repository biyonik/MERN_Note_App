const catchError = (error, requestObject, responseObject, nextFunction) => {
    const statusCode = responseObject.statusCode ? responseObject.statusCode : 500;
    responseObject.status(statusCode);

    responseObject.json({
        message: error.message,
        description: process.env.NODE_ENV !== 'production' ? error.stack : null
    });

    nextFunction();
}

module.exports = {
    catchError
}
