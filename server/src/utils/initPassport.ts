import passport from "passport"
import passportLocal from "passport-local"
import Config from "./Config"
import bcrypt from "bcrypt"
import winston from "winston"

export function initPassport() {
    winston.debug("Initializing passport")

    passport.use(new passportLocal.Strategy(async (username, password, done) => {
        winston.debug(`Authentication of ${username} started`)
        if (Config.user.name === username) {
            if(await bcrypt.compare(password, Config.user.password)) {
                winston.debug(`Authentication of ${username} complete`)
                return done(null, Config.user)
            } 
        }

        winston.debug(`Authentication of ${username} failed`)
        done(null, false)
    }))

    passport.serializeUser((user, done) => {
        done(null, user)
    })
    passport.deserializeUser((id: any, done) => {
        done(null, id)
    })
}
