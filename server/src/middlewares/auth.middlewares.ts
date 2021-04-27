import { NextFunction, Request, Response } from "express";
import fbAdmin from "../firebase";

const { admin } = fbAdmin;

type DecodedUserType = {
  name?: string;
  picture?: string;
  email: string;
  uid: string;
  email_verified: true;
  iat: number;
  exp: number;
};

declare global {
  namespace Express {
    interface Request {
      user: DecodedUserType;
    }
  }
}

export const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.headers);
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authorization!);

    console.log("FIREBASE USER DURING AUTH CHECK", firebaseUser);

    req.user = firebaseUser as DecodedUserType;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Invalid or expired token",
    });
  }
};
