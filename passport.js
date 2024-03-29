const passport = require("passport"),
LocalStrategy = require("passport-local").Strategy,
Models = require("./models.js"),
passportJwt = require("passport-jwt");

let Users = Models.User,
JwtStrategy = passportJwt.Strategy,
ExtractJwt = passportJwt.ExtractJwt;

passport.use(new LocalStrategy({
    usernameField: "username",
    passwordField: "password"
}, (username, password, callback)=>{
    console.log(username + " " + password);
    Users.findOne({
        "username" : username
    }, (error, user)=>{
        if (error) {
            console.log(error);
            return callback(error);
        }
        if( !user ){
            console.log("Incorrect username");
            return callback(null, false, {message: "Incorrect username or password"});

        }

        if (!user.validatePassword(password)) {
            console.log('incorrect password');
            return callback(null, false, {message: 'Incorrect password.'});
        }
        console.log("Finished");
        return callback(null, user);
    });
}));


passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret_key'
  }, (jwtPayload, callback) => {
    return Users.findById(jwtPayload._id)
      .then((user) => {
        return callback(null, user);
      })
      /* .catch((error) => {
        return callback(error)
      }); */
  }));
