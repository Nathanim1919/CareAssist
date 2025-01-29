import { IUser, User } from "../model/user.model";

export const register = async (userData: Partial<IUser>) => {
  try {
    if (await User.findOne({ email: userData.email })) {
      throw new Error("Email already in use");
    }
    
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An error occurred while registering the user");
  }
};


export const login = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email }) as IUser;

    if (!user || !user.comparePassword) {
      throw new Error("User not found");
    }

    const isValidPassword = user.comparePassword(password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An error occurred while logging in the user");
  }
};


