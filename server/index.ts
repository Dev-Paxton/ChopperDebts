import express from "express"
import cors from "cors"
import passport from "passport"
import session from "express-session"
import Config from "./src/utils/Config"
import { initPassport } from "./src/utils/initPassport"
import winston from "winston"
import winstonSetup from "./src/utils/winstonSetup"

import authRouter from "./src/routes/auth"
import transferRouter from "./src/routes/transfers"
import bodyParser from "body-parser"

export const app = express()
winstonSetup()
initPassport()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())
app.use(session({
    secret: Config.server.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: Config.server.secureCookies }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({ credentials: true, origin: Config.server.cors }))

app.use("/auth", authRouter)
app.use("/transfers", transferRouter)

app.listen(Config.server.port, () => {
    winston.info(`Server is listening on port ${Config.server.port}`)
})