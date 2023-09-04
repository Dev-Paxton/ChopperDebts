import winston, { level } from "winston"
import Config from "./Config"
const { combine, printf, timestamp, colorize } = winston.format

const customFormat = printf(({ timestamp, level, message }) => {
    let head = `[${timestamp}] ${level}:`

    let space = ""
    while (head.length - 11 + space.length < 30) {
        space = space + " "
    }
    return head + space + message
})

function timeFormat() {
    let date: any = new Date().toLocaleString("de-DE", {
        timeZone: "Europe/Berlin",
    })

    date = date.replace(",", "")
    date = date.split(".")
    date[0] = date[0].padStart(2, "0") + "."
    date[1] = date[1].padStart(2, "0") + "."
    let dateString = ""
    for (const i of date) {
        dateString = dateString + i
    }
    return dateString
}

export default function () {
    winston.add(new winston.transports.Console({
        level: Config.logger.level,
        format: combine(colorize(), timestamp({ format: timeFormat}), customFormat),
    }))

    winston.add(new winston.transports.File({
        filename: "./logs/ChopperDebts.log",
        level: "debug",
        format: combine(timestamp({ format: timeFormat}), customFormat)
    }))

    winston.addColors({
        error: "red",
        warn: "yellow",
        info: "cyan",
        debug: "green"
    })
}
