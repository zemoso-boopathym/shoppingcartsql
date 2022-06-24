import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Page not found!");

  return res.status(404).json({
    message: error.message,
  });
});

export default router;
