import { Request, Response } from "express";
import Joi, { ObjectSchema } from "joi";

export const bodyValidator = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: any) => {
    try {
      const { error } = await schema.validateAsync(req.body); 
      const valid = error == null; 
    
      if (valid) { 
        next(); 
      } else { 
        const details = Object.keys(error); 
        const message = details.map(i => error[i]).join(',');
        res.status(422).json({ message: message })
      } 
    }catch(e: any){
      res.status(422).json({ message: e.message })
    }
  }
}