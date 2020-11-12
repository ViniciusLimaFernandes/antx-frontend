import axios from 'axios'
import { apiUrl, apiUserID } from 'App/config'

/* local storage */
export const StorageKeys = {
    
}

/* http */
export function handleError (error) {
    
}

export function createURL (service) {
    let url = apiUrl

    url += service
    url += '/'
    url += apiUserID

    return url
}

export const http = axios.create({
    crossdomain: true,
    headers: {                  
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization", 
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
        "Content-Type": "application/json;charset=UTF-8"                   
    },
})