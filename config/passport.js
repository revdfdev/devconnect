const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const models = require("../models");
const keys = require("./keys");

const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await models.User.findOne({
          where: { id: jwt_payload.id }
        });
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (error) {
        console.log("Error", error);
      }
    })
  );
};
