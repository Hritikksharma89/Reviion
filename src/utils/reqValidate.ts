import { Request } from 'express';
import { ZodError, z } from 'zod';

interface IZObject {
  body?: z.AnyZodObject;
  params?: z.AnyZodObject;
  query?: z.AnyZodObject;
}

// const IsEmptyObject = (object: object | z.AnyZodObject | undefined): boolean =>
//   object !== undefined && Object.keys(object as object).length !== 0;

// const validateObject = (
//   data: object,
//   schema?: z.AnyZodObject,
// ): { isValid: boolean; errors?: any[] } => {
//   try {
//     if (IsEmptyObject(data) && schema !== undefined && IsEmptyObject(schema)) {
//       schema!.parse(data);
//       return { isValid: true };
//     } else {
//       return { isValid: false, errors: ['Invalid schema or empty data'] };
//     }
//   } catch (error) {
//     if (error instanceof ZodError) {
//       return { isValid: false, errors: error.errors.map((err) => err.message) };
//     } else {
//       return { isValid: false, errors: ['Unexpected error during validation'] };
//     }
//   }
// };

const reqValidate = async (req: Request, zObject: IZObject): Promise<{ status: boolean, message: string[] }> => {
  try {
    zObject.body?.parse(req.body)
    zObject.query?.parse(req.query)
    zObject.params?.parse(req.params)
    return { status: true, message: ["Validation success"] };
  } catch (error) {
    if (error instanceof ZodError) {
      return { status: false, message: error.errors.map((err) => err.message) };
    } else {
      return { status: false, message: ['Unexpected error during validation'] };
    }
  }
};

export default reqValidate;
