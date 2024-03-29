/**
 * @module Authentication
 * @description api containing login
 */

const jwtSecret = "secret_key";
const jwt = require("jsonwebtoken"),
      passport = require("passport");

      require("./passport.js");
let generateJWTToken = (user)=>{
    return jwt.sign(user, jwtSecret, {
        subject: user.username,
        expiresIn: "7d",
        algorithm: "HS256"
    });
}
/**
 * @description Api to login user with credentials
 * @example 
 * Authentication: none
 * @name POST /login
 * @example
 * Request body format: a JSON object holding the user credentials
 * Response format: JSON object containing the user data 
 */
module.exports = (router) =>{
    router.post("/login", (req, res)=>{
        passport.authenticate('local', { session: false }, (error, user, info) => {
            if (error || !user) {
              return res.status(400).json({
                message: 'Something is not right',
                user: user
              });
            }
            req.login(user, { session: false }, (error) => {
              if (error) {
                res.send(error);
              }
              let token = generateJWTToken(user.toJSON());
              return res.json({ user, token });
            });
          })(req, res);
    });
}