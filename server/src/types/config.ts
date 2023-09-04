export interface userSettings {
    name: string
    password: string
}

export interface serverSettings {
    port: number
    sessionSecret: string
    secureCookies: boolean
    authentication: boolean
    cors: [string]
}

export interface databaseSettings {
    uri: string
}

export interface loggerSettings {
    level: "info" | "debug"
}