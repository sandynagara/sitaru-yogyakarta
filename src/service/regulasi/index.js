import { useMainServiceFetch } from "../base"

async function getMany() {
    const res = await useMainServiceFetch('regulasi', {
        method: "GET",
    })
    return res.data
}

async function upload(body) {
    const res = await useMainServiceFetch('regulasi', {
        method: "POST",
        body: body
    })
    return res.data
}

async function deleteFile(id) {
    const res = await useMainServiceFetch(`regulasi/${id}`, {
        method: "DELETE"
    })
    return res
}

export const RegulasiService = { upload, deleteFile, getMany }
