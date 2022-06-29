import { Request, Response, NextFunction } from "express";
import bcryptjs from "bcryptjs";
import signJWT from "../util/signJWT";
import User from "../models/user";
import { RowDataPacket } from "mysql2";

interface ErrorWithStatusCode extends Error {
  httpStatusCode?: number;
}

export const loginPage = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
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

export const signupPage = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
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

const register = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const hashPassword = await bcryptjs.hash(password, 10);
      const userModel: User = new User(email, hashPassword);
      const result = await userModel.save();
      if ((result as RowDataPacket)[0].affectedRows === 1) {
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

const postLogin = async (req: Request, res: Response, _next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const userData = await User.findByMail(email);
    const result = await bcryptjs.compare(
      password,
      (userData as RowDataPacket)[0][0].password
    );
    if (result) {
      const token = signJWT((userData as RowDataPacket)[0][0]);
      if (token) {
        return res.status(200).json({
          token: token,
          username: (userData as RowDataPacket)[0][0].email,
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

const logoutUser = async (req: Request, res: Response, _next: NextFunction) => {
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

const getAllUsers = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const userData = await User.fetchAll();
  res.status(200).json({
    users: userData[0],
    count: (userData as RowDataPacket)[0].length,
  });
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    const result = await User.deleteByMail(email);
    if ((result as RowDataPacket)[0].affectedRows === 1) {
      return res.status(200).json((result as RowDataPacket)[0]);
    }

    const error: ErrorWithStatusCode = new Error("Data not found!");
    error.httpStatusCode = 500;
    return next(error);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

export { postLogin, register, logoutUser, getAllUsers };
