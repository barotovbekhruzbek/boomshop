import  Jwt  from "jsonwebtoken";
const generateJwtToken = userId => {
 const accessToken = Jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'30d'})
 return accessToken
}
export {generateJwtToken}