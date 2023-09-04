import router from "@/router"
import axios from "axios"

export const API = axios.create({
    baseURL: "https://URL:PORT",              // URL of the api
    withCredentials: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
})

API.interceptors.response.use( response => {
    return response
}, error => {
    if (error) {
        if (error.response.status === 401) {
            if(!window.location.href.endsWith("/login")) window.location.href="/login"
        } else console.log(error)
    }
    
})