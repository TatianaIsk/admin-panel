import axios from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const getUsers = async () => {
    const response = await axios.get(`${BASE_URL}/users`)
    return response.data
}

export const getUserById = async (id) => {
    const response = await axios.get(`${BASE_URL}/users/${id}`)
    return response.data
}

export const createUser = async (userData) => {
    const response = await axios.post(`${BASE_URL}/users`, userData)
    return response.data
}

export const updateUser = async (id, userData) => {
    const response = await axios.put(`${BASE_URL}/users/${id}`, userData)
    return response.data
}

export const deleteUser = async (id) => {
    const response = await axios.delete(`${BASE_URL}/users/${id}`)
    return response.data
}

export const getTodos = async () => {
    const response = await axios.get(`${BASE_URL}/todos`)
    return response.data
}

export const getTodoById = async (id) => {
    const response = await axios.get(`${BASE_URL}/todos/${id}`)
    return response.data
}

export const getPosts = async () => {
    const response = await axios.get(`${BASE_URL}/posts`)
    return response.data
}

export const getPostById = async (id) => {
    const response = await axios.get(`${BASE_URL}/posts/${id}`)
    return response.data
}

export const getComments = async () => {
    const response = await axios.get(`${BASE_URL}/comments`)
    return response.data
}

export const getCommentId = async (id) => {
    const response = await axios.get(`${BASE_URL}/comments/${id}`)
    return response.data
}

export const getAlbums = async () => {
    const response = await axios.get(`${BASE_URL}/albums`)
    return response.data
}

export const getAlbumById = async (id) => {
    const response = await axios.get(`${BASE_URL}/albums/${id}`)
    return response.data
}

export const getPictures = async () => {
    const response = await axios.get(`${BASE_URL}/photos`)
    return response.data
}

export const getPictureById = async (id) => {
    const response = await axios.get(`${BASE_URL}/photos/${id}`)
    return response.data
}

export const updatePicture = async (id, userData) => {
    const response = await axios.put(`${BASE_URL}/photos/${id}`, userData)
    return response.data
}
