import { BASE } from "./urlBase"

export async function getData(api) {
    const url = BASE.url + "api/" + api
    const request = new Request(url, { method: "GET" })
    const response = await fetch(request)
    return response
}