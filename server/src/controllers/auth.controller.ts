import { Request, Response } from "express";
import { User } from "../models/user.model";

export const createOrUpdateUser = async (req: Request, res: Response) => {
  const { name, picture, email } = req.user;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { email, name: name ? name : email.split("@")[0], picture },
      { returnOriginal: true, upsert: true }
    );

    res.json(user);
  } catch (err) {
    console.log("auth.controller.ts => createOrUpdateUser()", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const { email } = req.user;
  try {
    // No need to check the user exists or not,
    // because we are accessing the email from
    // the decoded token
    const user = await User.findOne({ email }).lean().exec();

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
