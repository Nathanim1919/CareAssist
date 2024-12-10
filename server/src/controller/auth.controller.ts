import { Request, Response } from "express";
import { register, login } from "../services/auth.service";
import { decodeToken, generateAccessTokenAndRefreshToken } from "../utils/authHelper";
import { User } from "../model/user.model";
import { JwtPayload } from "jsonwebtoken";

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;
    const user = await login(email, password);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const {accessToken, refreshToken} = generateAccessTokenAndRefreshToken(user);

    res.cookie("accessToken", accessToken, { httpOnly: false });
    res.cookie("refreshToken", refreshToken, { httpOnly: false });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An error occurred while logging in the user");
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const { accessToken, refreshToken } = req.cookies;
    const decoded = decodeToken(accessToken);
    const user = await User.findOne({ email: (decoded as JwtPayload).email });
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json({ user });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An error occurred while getting the current user");
  }
};

export const userRegister = async (req: Request, res: Response) => {
  // register logic
  try {
    const { fullName, password, email, role } = req.body;
    const user = await register({ fullName, password, email, role });
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown Error has Occured while regisitering the user");
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  // forgot password logic
};

export const resetPassword = async (req: Request, res: Response) => {
  // reset password logic
};

export const logout = async (req: Request, res: Response) => {
  // logout logic
};

export const updatePassword = async (req: Request, res: Response) => {
  // update password logic
};

export const protect = async (req: Request, res: Response) => {
  // protect logic
};

export const sendMessages = async (req: Request, res: Response) => {
  // send messages logic
};

export const getMessages = async (req: Request, res: Response) => {
  // get messages logic
};
