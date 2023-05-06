import { Response, Router } from "express";
import { Request as JWTRequest } from "express-jwt";
import { jwtVerify } from "../middlewares/jwt.middleware";
import todoRepo from "../repository/todo";
import { bodyValidator } from "../middlewares/body-validator.middleware";
import Joi from "joi";

const router = Router();

const taskSaveSchema = Joi.object({
  task: Joi.string().label('Task').required()
})
const taskStatusSchema = Joi.object({
  status: Joi.number().label('Status').required()
})

router.get('/me/todos', jwtVerify, async (req: JWTRequest, res: Response) => {
  try {
    const todos = await todoRepo.getAllByUser(req.auth?.sub)
    return res.send(todos)
  }catch(e: any) {
    console.log(e);
    return res.status(400).send({
      message: e.details || e.message
    })
  }
})

router.patch('/me/todos/:taskId', jwtVerify, bodyValidator(taskSaveSchema), async (req: JWTRequest, res: Response) => {
  const data = await todoRepo.updateTask(req.params.taskId, req.body, req.auth?.sub)
  return res.send(data)
})

router.delete('/me/todos/:taskId', jwtVerify, async (req: JWTRequest, res: Response) => {
  const data = await todoRepo.removeTask(req.params.taskId, req.auth?.sub)
  return res.send(data)
})

router.patch('/me/todos/:taskId/status', jwtVerify, bodyValidator(taskStatusSchema), async (req: JWTRequest, res: Response) => {
  const data = await todoRepo.updateTaskStatus(req.params.taskId, req.body.status, req.auth?.sub)
  return res.send(data)
})

export default router;