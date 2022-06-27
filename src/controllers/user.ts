import { Request, Response, NextFunction } from "express";
import bcryptjs from "bcryptjs";
import signJWT from "../util/signJWT";
import User from "../models/user";

interface UserRequest extends Request {
  username?: string | null;
}

interface error extends Error {
  httpStatusCode?: number;
}

export const loginPage = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: "",
    oldInput: {
      email: "",
      password: "",
    },
    validationErrors: [],
  });
};

export const signupPage = (req: Request, res: Response, next: NextFunction) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: "",
    oldInput: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationErrors: [],
  });
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const hashPassword = await bcryptjs.hash(password, 10);
      const userModel: any = new User(email, hashPassword);
      const result = await userModel.save();
      console.log("result");
      console.log(result);
      if (result[0].affectedRows === 1) {
        return res.status(201).render("auth/login", {
          path: "/login",
          pageTitle: "Login",
          errorMessage: "",
          oldInput: {
            email: "",
            password: "",
          },
          validationErrors: [],
        });
      }
    }
    throw new Error("Server Error!");
  } catch (err) {
    const error = err as Error;
    return res.status(403).json({
      message: error.message,
      error,
    });
  }
};

const postLogin = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const userModel: any = new User(email, password);
    const userData = await userModel.findByMail(email);
    const result = await bcryptjs.compare(password, userData[0][0].password);
    if (result) {
      const token = signJWT(userData[0][0]);
      if (token) {
        return res.status(200).json({
          token: token,
          username: userData[0][0].email,
        });
      }
    }
  } catch (err) {
    const error = err as Error;
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

const logoutUser = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  req.body.username = null;
  res.locals.isAuthenticated = false;
  res.status(200).render("auth/login", {
    path: "/auth/login",
    pageTitle: "Login",
    errorMessage: "",
    oldInput: {
      email: "",
      password: "",
    },
    validationErrors: [],
  });
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const userModel: any = new User(null, null);
  const userData = await userModel.fetchAll();
  res.status(200).json({
    users: userData[0],
    count: userData[0].length,
  });
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    const userModel: any = new User(null, null);
    const result = await userModel.deleteByMail(email);
    if (result[0].affectedRows === 1) {
      return res.status(200).json(result[0]);
    }

    const error: error = new Error("Data not found!");
    error.httpStatusCode = 500;
    return next(error);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

export { postLogin, register, logoutUser, getAllUsers };
