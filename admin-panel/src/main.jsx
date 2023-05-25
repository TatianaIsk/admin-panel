import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import './index.css'

import Users from "./components/Users/Users.jsx";
import MainPage from "./components/MainPage/MainPage.jsx";
import Error from "./components/Error/Error.jsx";
import Login from "./components/Login/Login.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage/>,
        errorElement: <Error/>,
        children: [
            {
                path: "/users",
                element: <Users/>,
                errorElement: <Error/>
            }
        ]
    },
    {
        path: "/login",
        element: <Login/>,
        errorElement: <Error/>,
    },

])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
