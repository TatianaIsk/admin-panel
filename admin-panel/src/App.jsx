import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';
import {ThemeProvider} from "./ThemeContext.jsx";

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
import Header from "./components/ui/Header/Header.jsx";
import Menu from "./components/ui/Menu/Menu.jsx";

function Layout(props) {
    return (
        <>
            <Header />
            <Menu />
            {props.children}
        </>
    );
}

function App() {
    return (
        <ThemeProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout><MainPage/></Layout>}/>
                    <Route path="/users" element={<Layout><UserList/></Layout>}/>
                    <Route path="/login" element={<Layout><Login/></Layout>}/>
                    <Route path="/users/create" element={<Layout><CreateUser/></Layout>}/>
                    <Route path="/users/view/:userId" element={<Layout><UserView/></Layout>}/>
                    <Route path="/users/edit/:userId" element={<Layout><EditUser/></Layout>}/>
                    <Route path="/todos" element={<Layout><TaskList/></Layout>}/>
                    <Route path="/todos/create" element={<Layout><CreateTask/></Layout>}/>
                    <Route path="/albums" element={<Layout><AlbumList/></Layout>}/>
                    <Route path="/albums/view/:albumId" element={<Layout><AlbumView /></Layout>} />
                    <Route path="/pictures" element={<Layout><PictureList/></Layout>}/>
                    <Route path="/pictures/edit/:pictureId" element={<Layout><EditPicture/></Layout>}/>
                    <Route path="/posts" element={<Layout><PostList/></Layout>}/>
                    <Route path="/posts/view/:postId" element={<Layout><PostView/></Layout>}/>
                    <Route path="/comments" element={<Layout><CommentsList/></Layout>}/>
                    <Route path="/comments/create" element={<Layout><CreateComment/></Layout>}/>
                    <Route path="*" element={<Layout><Error/></Layout>}/>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
