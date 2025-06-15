import { useMainServiceFetch } from "../base"

async function getMany() {
    const res = await useMainServiceFetch('peta', {
        method: "GET",
    })
    return res.data
}

async function upload(body) {
    const res = await useMainServiceFetch('peta', {
        method: "POST",
        body: body
    })
    return res.data
}

async function deleteFile(id) {
    const res = await useMainServiceFetch(`peta/${id}`, {
        method: "DELETE"
    })
    return res
}

export const PetaService = { upload, deleteFile, getMany }
