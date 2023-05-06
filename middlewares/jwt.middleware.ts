import { expressjwt } from "express-jwt";

export const jwtVerify = expressjwt({
  secret: process.env.JWT_SECRET || '',
  algorithms: ["HS256"],
});