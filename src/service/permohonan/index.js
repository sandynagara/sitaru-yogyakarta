import { useMainServiceFetch } from "../base"

async function getMany(page) {
    const res = await useMainServiceFetch(`/permohonan?page=${page}&limit=10`, {
        method: "GET",
    })
    return res
}

export const PermohonanService = { getMany }
