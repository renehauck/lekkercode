import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../config/config";

interface UserPayload {
  id: string;
  name: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET_KEY) as UserPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.sendStatus(403);
  }
}
