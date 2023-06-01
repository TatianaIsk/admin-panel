import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"

import UserList from "./components/Users/UserList/UserList.jsx"
import MainPage from "./components/MainPage/MainPage.jsx"
import Error from "./components/Error/Error.jsx"
import Login from "./components/Login/Login.jsx"
import CreateUser from "./components/Users/CreateUser/CreateUser.jsx"
import UserView from "./components/Users/UserView/UserView.jsx"
import EditUser from "./components/Users/EditUser/EditUser.jsx"
import store from "./store.jsx";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users/create" element={<CreateUser />} />
                <Route path="/users/view/:userId" element={<UserView />} />
                <Route path="/users/edit/:userId" element={<EditUser />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    );
}

export default App