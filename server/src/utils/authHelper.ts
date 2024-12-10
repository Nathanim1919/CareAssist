import jwt from 'jsonwebtoken';


export const generateAccessTokenAndRefreshToken = (user: any) => {
    const accessSecret = process.env.JWT_ACCESS_SECRET_KEY;
    const refreshSecret = process.env.JWT_REFRESH_TOKEN_KEY;

    if (!accessSecret || !refreshSecret) {
        throw new Error('JWT secrets are not defined');
    }

    const accessToken = jwt.sign({ email: user.email }, accessSecret, {
        expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ email: user.email }, refreshSecret, {
        expiresIn: "7d",
    });

    return { accessToken, refreshToken };
};



export const verifyToken = (token: string, secretKey: string) => {
    return jwt.verify(token, secretKey);
};

export const decodeToken = (token: string) => {
    return jwt.decode(token);
};
