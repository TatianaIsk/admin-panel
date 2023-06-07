import {getUsers, getUserById, createUser, updateUser, deleteUser, getTodos, getPosts, getComments} from './api'

const store = {
    state: {
        users: [],
        selectedUser: null,
        todos: [],
        selectedTodo: null,
        posts: [],
        selectedPost: null,
        comments: [],
        selectedComment: null
    },

    async fetchUsers() {
        try {
            const users = await getUsers()
            this.state.users = users
        } catch (error) {
            console.error(error)
        }
    },

    async fetchUser(userId) {
        try {
            const user = await getUserById(userId)
            this.state.selectedUser = user
        } catch (error) {
            console.error(error)
        }
    },

    async addUser(userData) {
        try {
            const newUser = await createUser(userData)
            this.state.users.push(newUser)
        } catch (error) {
            console.error(error)
        }
    },

    async updateUser(userId, userData) {
        try {
            const updatedUser = await updateUser(userId, userData)
            const index = this.state.users.findIndex((user) => user.id === updatedUser.id)
            this.state.users.splice(index, 1, updatedUser)
        } catch (error) {
            console.error(error)
        }
    },

    async deleteUser(userId) {
        try {
            await deleteUser(userId)
            this.state.users = this.state.users.filter((user) => user.id !== userId)
        } catch (error) {
            console.error(error)
        }
    },

    async fetchTodos() {
        try {
            const todos = await getTodos()
            this.state.todos = todos
        } catch (error) {
            console.error(error)
        }
    },

    async fetchPosts() {
        try {
            const posts = await getPosts()
            this.state.posts = posts
        } catch (error) {
            console.error(error)
        }
    },

    async fetchComments() {
        try {
            const comments = await getComments()
            this.state.comments = comments
        } catch (error) {
            console.error(error)
        }
    }
}

export default store