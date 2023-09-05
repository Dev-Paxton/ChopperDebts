import { databaseSettings, loggerSettings, serverSettings, userSettings } from "../types/config"
import fs from "fs"

const configDirPath = __dirname + "/../../config"

export default class Config {
    static env: string
    static user: userSettings
    static server: serverSettings
    static database: databaseSettings
    static logger: loggerSettings
    static [key: string]: any

    constructor() {
        const configDirFiles = fs.readdirSync(configDirPath).filter(f => f.endsWith(".json"))

        var configFileName = ""
        if (configDirFiles.length === 0) {
            throw new Error("No config file provided")
        } else if (configDirFiles.length === 1) {
            configFileName = configDirFiles[0]
        } else if (process.env.NODE_ENV) {
            configFileName = process.env.NODE_ENV + ".json"
        } else {
            configFileName = "prod.json"
        }

        const configJson = JSON.parse(fs.readFileSync(`${configDirPath}/${configFileName}`, "utf-8"))

        for (const setting in configJson) {
            Config[setting] = configJson[setting]
        }

        Config.env = configFileName.split(".")[0]
   }
}

new Config