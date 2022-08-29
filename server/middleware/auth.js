import jwt from "jsonwebtoken";
import config from "config";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const localAuth = token.length < 500;

    let decodedData;

    if (token && localAuth) {
      decodedData = jwt.verify(token, config.get("jwtKey"));
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
