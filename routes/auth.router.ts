import { Request, Response, Router } from "express";
import Joi from 'joi';
import bcrypt from "bcrypt";
import { bodyValidator } from "../middlewares/body-validator.middleware";
import userRepo from "../repository/user";
import tokenRepo from "../repository/token";

const router: Router = Router();

const signinValidationSchema = Joi.object({
  email: Joi.string().label('Email').email().required(),
  password: Joi.string().label('Password').required()
})

const signupValidationSchema = Joi.object({
  email: Joi.string().label('Email').email().required(),
  password: Joi.string().label('Password').required()
})

router.post('/signin', bodyValidator(signinValidationSchema), async (req: Request, res: Response) => {
  const user: any = await userRepo.findOneByEmail(req.body.email);
  if(!user) return res.status(401).send({
    message: 'Email/password not matched'
  })

  if(! await bcrypt.compare(req.body.password, user.password)) {
    return res.status(401).send({
      message: 'Email/password not matched'
    })
  }
  
  const token = tokenRepo.getEncryptedJwt({
    sub: user.id,
    email: user.email
  })
  res.send({
    success: true,
    token,
    email: user.email
  })
})

router.post('/signup', bodyValidator(signupValidationSchema), async (req: Request, res: Response) => {
  req.body.email = req.body.email.trim();
  req.body.password = await bcrypt.hash(req.body.password, 10)
  const existingUser = await userRepo.findOneByEmail(req.body.email);
  if(existingUser) {
    return res.status(400).send({
      message: 'Email already exists'
    })
  }
  
  const user: any = await userRepo.addUser(req.body)
  const token = tokenRepo.getEncryptedJwt({
    sub: user.id,
    email: req.body.email
  })
  res.send({
    success: true,
    token,
    email: req.body.email
  })
})

router.post('/signout', async (req: Request, res: Response) => {
  return res.status(501).send()
})

export default router;