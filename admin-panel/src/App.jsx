import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom"

import UserList from "./components/Users/UserList/UserList.jsx"
import MainPage from "./components/MainPage/MainPage.jsx"
import Error from "./components/Error/Error.jsx"
import Login from "./components/Login/Login.jsx"
import CreateUser from "./components/Users/CreateUser/CreateUser.jsx"
import UserView from "./components/Users/UserView/UserView.jsx"
import EditUser from "./components/Users/EditUser/EditUser.jsx"
import TaskList from "./components/Tasks/TaskList/TaskList.jsx";
import CreateTask from "./components/Tasks/CreateTask/CreateTask.jsx";
import Pictures from "./components/Pictures/Pictures.jsx";
import {ThemeProvider, useTheme} from "./ThemeContext.jsx";
import {useEffect} from "react";

function App() {
    return (
        <ThemeProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/users" element={<UserList/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/users/create" element={<CreateUser/>}/>
                    <Route path="/users/view/:userId" element={<UserView/>}/>
                    <Route path="/users/edit/:userId" element={<EditUser/>}/>
                    <Route path="/todos" element={<TaskList/>}/>
                    <Route path="/todos/create" element={<CreateTask/>}/>
                    <Route path="/picture" element={<Pictures/>}/>
                    <Route path="*" element={<Error/>}/>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App