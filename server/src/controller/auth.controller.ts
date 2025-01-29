import { Request, Response } from "express";
import { login, register } from "../services/auth.service";
import {
  generateAccessTokenAndRefreshToken,
  decodeToken,
} from "../utils/authHelper";
import { User } from "../model/user.model";
import { JwtPayload } from "jsonwebtoken";

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;
    const user = await login(email, password);

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const { accessToken, refreshToken } =
      generateAccessTokenAndRefreshToken(user);

    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    res.status(200).json({ user });
  } catch (error) {
    console.log("Error occurred while logging in:", error);
    res
      .status(500)
      .json({ message: "An error occurred while logging in the user" });
  }
};

export const userLogout = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    console.log("Error occurred while logging out:", error);
    res
      .status(500)
      .json({ message: "An error occurred while logging out the user" });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const { accessToken } = req.cookies;
    const decoded = decodeToken(accessToken);

    if (typeof decoded === "string" || !(decoded as JwtPayload).email) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await User.findOne({ email: (decoded as JwtPayload).email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log("Error occurred while getting the current user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while getting the current user" });
    return;
  }
};

export const userRegister = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { fullName, password, email, role } = req.body;
    const user = await register({ fullName, password, email, role });
    res.status(200).json(user);
  } catch (error) {
    console.log("Error occurred while registering the user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while registering the user" });
  }
};
