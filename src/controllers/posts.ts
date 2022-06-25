import { Request, Response, NextFunction } from "express";
import Post from "../models/posts";

interface UserRequest extends Request {
  username?: string;
}

export const getPosts = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const postModel: any = new Post(null, null, null, null);
    const username = req.body.username;
    const result = await postModel.fetchAllByMail(username);
    return res.status(200).json({
      posts: result[0],
      length: result[0].length,
    });
    // render("posts/showposts", {
    //   path: "/posts/showposts",
    //   pageTitle: "Posts",
    //   posts: result[0],
    // });
  } catch (err) {
    const error = err as Error;
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

export const createPostForm = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).render("posts/createpost", {
    path: "/posts/createpost",
    pageTitle: "Create Post",
    errorMessage: "",
  });
};

export const createPost = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const { title, description } = req.body;
  const createdAt = new Date();
  const email = req.body.username;
  if (!email) {
    return res.status(401).json({
      message: "Unauthorized!",
    });
  }
  const postModel: any = new Post(title, description, createdAt, email);
  try {
    const result = await postModel.save();
    return res.status(200).json(result[0]);
  } catch (err) {
    const error = err as Error;
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;

  try {
    const postModel: any = new Post(null, null, null, null);
    const result = await postModel.deleteByID(id);

    if (result[0].affectedRows === 1) {
      return res.status(200).json(result[0]);
    }

    return res.status(404).json({
      message: result[0],
    });
  } catch (err) {
    const error = err as Error;
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

export const getAllPosts = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const postModel: any = new Post(null, null, null, null);
  const username = req.body.username;
  if (username !== "admin@admin.com") {
    return res.status(401).render("401", {
      path: "/401",
      pageTitle: "401 - Unauthorized!",
    });
  }
  try {
    const result = await postModel.adminFetchAll();
    return res.status(200).json({
      posts: result[0],
    });
  } catch (err) {
    const error = err as Error;
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};
