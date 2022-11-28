class ParameterRequiredError extends Error{
    statusCode?: number;
    
    constructor(message: string, statusCode?: number) {
        super(message);
        this.name = 'Parameter_Required_Error';
        this.statusCode = statusCode;
    }
}

export { ParameterRequiredError }
