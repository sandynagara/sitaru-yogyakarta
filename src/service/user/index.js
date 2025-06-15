import { useMainServiceFetch } from "../base"

async function getMany(keyword) {
    const res = await useMainServiceFetch(`user?keyword=${keyword}`, {
        method: "GET",
    })
    return res.data
}

async function getOne(id) {
    const res = await useMainServiceFetch(`user/${id}`, {
        method: "GET",
    })
    return res.data
}

async function getMyAccount() {
    const res = await useMainServiceFetch(`user/my-account`, {
        method: "GET",
    })
    return res.data
}


async function create(form) {
    const res = await useMainServiceFetch('user', {
        method: "POST",
        body: form
    })
    return res.data
}

async function deleteUser(id) {
    const res = await useMainServiceFetch(`user/${id}`, {
        method: "DELETE",
    })
    return res.data
}

async function updateProfile(id, form) {
    const res = await useMainServiceFetch(`user/${id}`, {
        method: "PATCH",
        body: form
    })
    return res.data
}

export const UserService = { getMany, create, updateProfile, deleteUser, getOne, getMyAccount }
