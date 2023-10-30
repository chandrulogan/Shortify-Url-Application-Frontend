import API from "./Api"
import { deleteTheUrlEndpoint, getUrlbyIdEndpoint, getUserUrlEndpoint, shorternNewUrlEndpoint, updateTheUrlEndpoint } from "./EndPoints"

export const shorternNewUrl = (data) => {
    return API.post(`${shorternNewUrlEndpoint}`, data)
}

export const getUserUrl = (userId) => {
    return API.get(`${getUserUrlEndpoint}${userId}`)
}

export const getUrlbyId = (id) => {
    return API.get(`${getUrlbyIdEndpoint}${id}`)
}

export const updateTheUrl = (id, data) => {
    return API.post(`${updateTheUrlEndpoint}${id}`, data)
}

export const deleteUrlbyId = (id) => {
    return API.delete(`${deleteTheUrlEndpoint}${id}`)
}