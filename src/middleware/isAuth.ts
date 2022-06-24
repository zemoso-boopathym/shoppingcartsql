import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { config } from "../util/config";

interface UserRequest extends Request {
  username?: string;
}

interface JwtPayload {
  username: string;
}

const isAuthenticated = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(404).render("404", {
      path: "/404",
      pageTitle: "404 - Page Not found",
      isAuthenticated: req.username,
    });
  }
  const token = authHeader?.split(" ")[1];
  if (token) {
    try {
      const { username } = jwt.verify(token, config.JWT_KEY!) as JwtPayload;
      req.username = username;
      res.locals.isAuthenticated = req.username;
      next();
    } catch (err) {
      const error = err as Error;
      return res.status(404).json({
        message: error.message,
      });
    }
  } else {
    return res.status(401).json({
      message: "Unauthorized!",
    });
  }
};

export default isAuthenticated;
