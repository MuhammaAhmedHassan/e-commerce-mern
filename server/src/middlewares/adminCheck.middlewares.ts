import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";

export const adminCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.user;

    const adminUser = await User.findOne({ email }).lean().exec();

    if (adminUser?.role !== "admin") {
      return res.status(403).json({
        error: "Admin resource. Access denied.",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Something went wrong, please try again." });
  }
};
