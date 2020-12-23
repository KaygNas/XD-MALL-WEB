import { BASE } from "./urlBase"

export async function getDataByApi(api) {
    const url = BASE.url + "api/" + api
    const request = new Request(url, { method: "GET" })
    const response = await fetch(request)
    try {
        return await response.json()
    } catch (error) {
        return { success: false, msg: error }
    }
}

export async function postDataByApi(api, data) {
    const url = BASE.url + "api/" + api
    const request = new Request(url, {
        method: "POST",
        body: JSON.stringify(data)
    })
    const response = await fetch(request)
    return await response.json()
}
