class CustomError extends Error{
    name: string;
    statusCode?: number;

    constructor(message: string, statusCode = 500, name = '') {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }
}

export { CustomError }
