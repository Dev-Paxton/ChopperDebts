import express, { Request, Response, NextFunction } from "express"
import { checkAuthenticated } from "../utils/checkAuthenticated"
import DBClient from "../utils/DBClient"
import winston from "winston"

const router = express.Router()

router.get("/:type?", checkAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    let query = {}
    if (req.params.type) {
        if (req.params.type === "debts") query = { type: "debt" }
        if (req.params.type === "claims") query = { type: "claim" }
    }

    res.send(await DBClient.getTransfer(query))
})

router.post("/add", checkAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    req.body["created"] = Date.now()
    req.body["lastEdit"] = Date.now()
    DBClient.addTransfer(req.body)
    res.status(200).end()
})

router.post("/edit", checkAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    req.body["lastEdit"] = Date.now()
    DBClient.editTransfer(req.body["id"], req.body)
})

router.delete("/delete", checkAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    winston.debug(JSON.stringify(req.body))
    DBClient.deleteTransfer(req.body.id)
})

export default router