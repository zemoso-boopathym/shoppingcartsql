import { Request, Response, NextFunction } from "express";
import { RowDataPacket } from "mysql2";
import Post from "../models/posts";

export const getPosts = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const username = req.body.email;
    if (!username) {
      throw new Error("Unauthorized!");
    }
    const result = await Post.fetchAllByMail(username);
    return res.status(200).json(result);
  } catch (err) {
    const error = err as Error;
    return res.status(401).json({
      message: error.message,
      error,
    });
  }
};

export const createPostForm = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.sendStatus(200);
};

export const createPost = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { title, description } = req.body;
    const createdAt = new Date();
    const email = req.body.username;
    if (email && title && description) {
      const postModel: Post = new Post(title, description, createdAt, email);
      const result = await postModel.save();
      if ((result[0] as RowDataPacket).affectedRows === 1) {
        return res.status(200).json(result[0]);
      }
    }
    throw new Error("No data created!");
  } catch (err) {
    const error = err as Error;
    return res.status(401).json({
      message: error.message,
      error,
    });
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { id } = req.body;

  try {
    const result = await Post.deleteByID(id);

    if ((result as RowDataPacket)[0].affectedRows === 1) {
      return res.status(200).json(result[0]);
    }

    throw new Error("Data not found!");
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

export const getAllPosts = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const username = req.body.username;
  try {
    if (username !== "admin@admin.com") {
      throw new Error("Unauthorized!");
    } else {
      const result = await Post.adminFetchAll();
      return res.status(200).json({
        posts: result[0],
      });
    }
  } catch (err) {
    res.status(401).json({
      error: err,
    });
  }
};
