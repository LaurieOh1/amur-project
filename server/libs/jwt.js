import jwt from "jsonwebtoken";

export const createSendToken = (res, statusCode, user) => {
  const { JWT_SECRET, JWT_EXP, COOKIE_EXP, NODE_ENV } = process.env;

  const token = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXP,
  });

  const isProduction = NODE_ENV === "production";

  const cookieOptions = {
    expires: new Date(Date.now() + COOKIE_EXP * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: isProduction, 
    sameSite: isProduction ? "None" : "Lax", // a
  };


  res.cookie("jwtToken", token, cookieOptions);


   
  user.password = undefined;

 
  res.status(statusCode).json({
    success: true,
    statusCode,
    user,
  });
};
