import express, { Router, Request, Response, NextFunction } from "express"
import passport from "passport"
import winston from "winston"

const router = express.Router()

router.post("/login", passport.authenticate("local"), (req: Request, res: Response, next: NextFunction) => {
    res.send({ message: "Authenticated" })
    next()
})

router.post("/logout", (req: Request, res: Response, next: NextFunction) => {
    req.logOut( err => {
        if (err) return next(err)
    })
    res.status(200).end()
    winston.debug("User logged out")
})

export default router