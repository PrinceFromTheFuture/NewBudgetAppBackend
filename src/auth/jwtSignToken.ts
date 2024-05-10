import jwt from "jsonwebtoken";

const jwtSignToken = (userId: string) => {
  const jwtSecret = process.env.TOKETSECRET;
  const token = jwt.sign({ userId }, jwtSecret!, {
    expiresIn: 60 * 60 * 24 * 5,
  });
  return token;
};
export default jwtSignToken;
