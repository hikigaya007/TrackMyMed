// A function to create and return a custom error object with a status code and message

interface CustomError extends Error {
    statusCode?: number;
}

export const errorHandler = (statusCode: number, message: string): CustomError => {
    const error: CustomError = new Error();
    error.message = message;
    error.statusCode = statusCode;
    return error;
}