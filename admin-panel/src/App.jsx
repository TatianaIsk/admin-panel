import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom"
import { ThemeProvider } from "./ThemeContext.jsx";

import UserList from "./components/features/Users/UserList/UserList.jsx"
import MainPage from "./components/features/MainPage/MainPage.jsx"
import Error from "./components/ui/Error/Error.jsx"
import Login from "./components/features/Login/Login.jsx"
import CreateUser from "./components/features/Users/CreateUser/CreateUser.jsx"
import UserView from "./components/features/Users/UserView/UserView.jsx"
import EditUser from "./components/features/Users/EditUser/EditUser.jsx"
import TaskList from "./components/features/Tasks/TaskList/TaskList.jsx";
import CreateTask from "./components/features/Tasks/CreateTask/CreateTask.jsx";
import PostList from "./components/features/Posts/PostList/PostList.jsx";
import CommentsList from "./components/features/Comments/CommentsList/CommentsList.jsx";
import CreateComment from "./components/features/Comments/CreateComment/CreateComment.jsx";
import AlbumList from "./components/features/Albums/AlbumList/AlbumList.jsx";
import PostView from "./components/features/Posts/PostView/PostView.jsx";
import AlbumView from "./components/features/Albums/AlbumView/AlbumView.jsx";
import EditPicture from "./components/features/Pictures/EditPicture/EditPicture.jsx";
import PictureList from "./components/features/Pictures/PictureList/PictureList.jsx";

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
                    <Route path="/albums/view/:albumId" element={<AlbumView />} />
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