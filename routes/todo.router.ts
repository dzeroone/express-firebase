import { Response, Router } from "express";
import { Request as JWTRequest } from "express-jwt";
import Joi from "joi";
import { bodyValidator } from "../middlewares/body-validator.middleware";
import { jwtVerify } from "../middlewares/jwt.middleware";
import todoRepo from "../repository/todo";

const router: Router = Router();
const taskSaveSchema = Joi.object({
  task: Joi.string().label('Task').required()
})

router.post('/', jwtVerify, bodyValidator(taskSaveSchema), async (req: JWTRequest, res: Response) => {
  const data = await todoRepo.newTask(req.body, req.auth?.sub)
  return res.send(data)
})

export default router;