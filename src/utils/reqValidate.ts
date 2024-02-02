import { Request } from 'express';
import { z, ZodError } from 'zod';

interface IZObject {
    body?: z.AnyZodObject;
    params?: z.AnyZodObject;
    query?: z.AnyZodObject;
}

const IsEmptyObject = (object: object | z.AnyZodObject | undefined): boolean =>
    object !== undefined && Object.keys(object as object).length !== 0;

const validateObject = (data: object, schema?: z.AnyZodObject): { isValid: boolean; errors?: any[] } => {
    try {
        if (IsEmptyObject(data) && schema !== undefined && IsEmptyObject(schema)) {
            schema!.parse(data);
            return { isValid: true };
        } else {
            return { isValid: false, errors: ['Invalid schema or empty data'] };
        }
    } catch (error) {
        if (error instanceof ZodError) {
            return { isValid: false, errors: error.errors.map((err) => err.message) };
        } else {
            return { isValid: false, errors: ['Unexpected error during validation'] };
        }
    }
};

const reqValidate = async (req: Request, zObject: IZObject): Promise<{ error?: any }> => {
    const bodyValidation = validateObject(req.body, zObject.body);
    const queryValidation = validateObject(req.query, zObject.query);
    const paramsValidation = validateObject(req.params, zObject.params);

    if (bodyValidation.isValid && queryValidation.isValid && paramsValidation.isValid) {
        return {};
    } else {
        const error = { error: (bodyValidation.errors || [], queryValidation.errors || [], paramsValidation.errors || []) }
        return error;
    }
};

export default reqValidate;
