import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Users from "./components/Users/Users.jsx";
import MainPage from "./components/MainPage/MainPage.jsx";
import Error from "./components/Error/Error.jsx";
import Login from "./components/Login/Login.jsx";
import CreateUser from "./components/Users/CreateUser/CreateUser.jsx";
import UserView from "./components/Users/UserView/UserView.jsx";

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => setUsers(data));
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/users" element={<Users users={users} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users/create" element={<CreateUser />} />
                <Route path="/users/view/:userId" element={<UserView users={users} />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    );
}

export default App;