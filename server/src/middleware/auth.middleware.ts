import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../utils/authHelper";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../model/user.model";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      res.status(401).json({
        message: "unAuthorized",
      });
    }

    const decode = decodeToken(accessToken);
    const email = (decode as JwtPayload).email;

    if (!email) {
      res.status(401).json({
        message: "unAuthorized",
      });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({
        message: "unAuthorized",
      });
      return;
    }

    req.user = user?._id as string;
    console.log("User authenticated");
    next();
  } catch (error) {
    res.status(401).json({
      message: "unAuthorized",
    });
    return;
  }
};
