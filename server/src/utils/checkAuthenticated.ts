import { Request, Response, NextFunction } from "express"
import Config from "./Config"

export function checkAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (!Config.server.authentication) return next()

    if (req.isAuthenticated()) {
        return next()
    }
    
    res.status(401).end()
}