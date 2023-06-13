import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom"
import { ThemeProvider } from "./ThemeContext.jsx";

import UserList from "./components/Users/UserList/UserList.jsx"
import MainPage from "./components/MainPage/MainPage.jsx"
import Error from "./components/Error/Error.jsx"
import Login from "./components/Login/Login.jsx"
import CreateUser from "./components/Users/CreateUser/CreateUser.jsx"
import UserView from "./components/Users/UserView/UserView.jsx"
import EditUser from "./components/Users/EditUser/EditUser.jsx"
import TaskList from "./components/Tasks/TaskList/TaskList.jsx";
import CreateTask from "./components/Tasks/CreateTask/CreateTask.jsx";
import PostList from "./components/Posts/PostList/PostList.jsx";
import CommentsList from "./components/Comments/CommentsList/CommentsList.jsx";
import CreateComment from "./components/Comments/CreateComment/CreateComment.jsx";
import AlbumList from "./components/Albums/AlbumList/AlbumList.jsx";
import PostView from "./components/Posts/PostView/PostView.jsx";
import AlbumView from "./components/Albums/AlbumView/AlbumView.jsx";
import EditPicture from "./components/Pictures/EditPicture/EditPicture.jsx";
import PictureList from "./components/Pictures/PictureList/PictureList.jsx";

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
                    <Route path="/albums" element={<AlbumList/>}/>
                    <Route path="/albums/view/:albumId" element={<AlbumView/>}/>
                    <Route path="/pictures" element={<PictureList/>}/>
                    <Route path="/pictures/edit/:pictureId" element={<EditPicture/>}/>
                    <Route path="/posts" element={<PostList/>}/>
                    <Route path="/posts/view/:postId" element={<PostView/>}/>
                    <Route path="/comments" element={<CommentsList/>}/>
                    <Route path="/comments/create" element={<CreateComment/>}/>
                    <Route path="*" element={<Error/>}/>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App