import { Request, Response, NextFunction } from "express";
import * as yup from "yup";

export function validateSchema(schema: yup.ObjectSchema<any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      const errorMessage = error.inner.map(
        (e: yup.ValidationError) => e.message
      );
      return res.status(400).json({ message: errorMessage });
    }
  };
}
