import { ZodError, ZodSchema } from 'zod';

import { ValidationSchemaError } from '../../../errors/validation-schema.error';

type ErrorSchema = {
    field: (string | number)[];
    message: string;
}

function validatorSchema(schema: ZodSchema, payload: any) {
    try {
        schema.parse(payload);
    } catch(err: any) {
        const typedError = err as ZodError;
        const errors: ErrorSchema[] = [];

        typedError.errors.forEach(error => {
            errors.push({
                field: error.path,
                message: error.message,
            });
        });

        throw new ValidationSchemaError('ERROR_SCHEMA', errors);
    }
}

export { ErrorSchema, validatorSchema }
