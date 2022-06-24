import { Request, Response, NextFunction } from "express";

interface UserRequest extends Request {
  username?: string;
}

export const landingPage = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).render("posts/welcome", {
    path: "/posts/welcome",
    pageTitle: "Welcome",
    token: null,
    isAuthenticated: req.username,
  });
};
