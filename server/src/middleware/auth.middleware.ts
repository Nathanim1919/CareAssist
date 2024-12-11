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
      res
        .status(401)
        .json({ message: "Unauthorized: No access token provided" });
      return;
    }

    const decoded = decodeToken(accessToken);

    if (typeof decoded === "string" || !(decoded as JwtPayload).email) {
      res.status(401).json({ message: "Unauthorized: Invalid token format" });
      return;
    }

    const email = (decoded as JwtPayload).email;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Unauthorized: User not found" });
      return;
    }

    req.user = user._id as string;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};
