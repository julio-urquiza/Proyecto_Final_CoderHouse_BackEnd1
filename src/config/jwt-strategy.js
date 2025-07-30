import passport from "passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import "dotenv/config"

const strategyConfig = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.CLAVE
}

const strategyConfigRecoveryToken = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.CLAVE_RECUPERACION
}

const verifyToken = async (jwt_payload, done) => {
    if (!jwt_payload) return done(null, false, { messages: "Invalid Token" })
    return done(null, jwt_payload)
}


passport.use("current", new Strategy(strategyConfig, verifyToken))
passport.use("recovery", new Strategy(strategyConfigRecoveryToken, verifyToken))

export default passport