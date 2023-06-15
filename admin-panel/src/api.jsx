import axios from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const getUsers = async () => {
    const response = await axios.get(`${BASE_URL}/users`)
    return response.data
}

export const getUserById = async (username) => {
    const response = await axios.get(`${BASE_URL}/users?username=${username}`);
    return response.data[0];
};

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

export const getPostById = async (postTitle) => {
    const response = await axios.get(`${BASE_URL}/posts?title=${postTitle}`);
    return response.data[0];
};

export const getComments = async () => {
    const response = await axios.get(`${BASE_URL}/comments`)
    return response.data
}

export const getCommentId = async () => {
    const response = await axios.get(`${BASE_URL}/comments/${id}`)
    return response.data
}

export const getAlbums = async () => {
    const response = await axios.get(`${BASE_URL}/albums`)
    return response.data
}

export const getAlbumById = async (albumTitle) => {
    const response = await axios.get(`${BASE_URL}/albums?title=${albumTitle}`);
    return response.data[0];
};

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
