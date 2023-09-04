declare global { 
    namespace Express {
        interface User {
            name: string
            password: string
        }
    }
}

export{}