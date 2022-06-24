import jwt from "jsonwebtoken";

interface User {
  email: string;
  password: string;
}

const signJWT = (
  user: User,
  callback: (error: Error | null, token: string | null) => void
): void => {
  try {
    jwt.sign(
      {
        username: user.email,
      },
      "basicauthjwttoken",
      {
        issuer: "Boopathy",
        algorithm: "HS256",
        expiresIn: "1h",
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (err) {
    const error = err as Error;
    callback(error, null);
  }
};

export default signJWT;
