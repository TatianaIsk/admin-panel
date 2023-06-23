import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { ThemeProvider } from "./ThemeContext.jsx";

import UserList from "#/Users/UserList/UserList.jsx";
import MainPage from "#/MainPage/MainPage.jsx";
import Error from "@/Error/Error.jsx";
import Login from "#/Login/Login.jsx";
import CreateUser from "#/Users/CreateUser/CreateUser.jsx";
import UserView from "#/Users/UserView/UserView.jsx";
import EditUser from "#/Users/EditUser/EditUser.jsx";
import TaskList from "#/Tasks/TaskList/TaskList.jsx";
import CreateTask from "#/Tasks/CreateTask/CreateTask.jsx";
import PostList from "#/Posts/PostList/PostList.jsx";
import CommentsList from "#/Comments/CommentsList/CommentsList.jsx";
import CreateComment from "#/Comments/CreateComment/CreateComment.jsx";
import AlbumList from "#/Albums/AlbumList/AlbumList.jsx";
import PostView from "#/Posts/PostView/PostView.jsx";
import AlbumView from "#/Albums/AlbumView/AlbumView.jsx";
import EditPicture from "#/Pictures/EditPicture/EditPicture.jsx";
import PictureList from "#/Pictures/PictureList/PictureList.jsx";
import Header from "@/Header/Header.jsx";
import Menu from "@/Menu/Menu.jsx";

function Wrapper() {
  return (
    <div className="wrapperApp">
      <Outlet />
    </div>
  );
}

function Layout() {
  return (
    <>
      <Header />
      <Menu />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router basename="/admin-panel">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<Wrapper />}>
              <Route path="/" element={<MainPage />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/users/create" element={<CreateUser />} />
              <Route path="/users/view/:userId" element={<UserView />} />
              <Route path="/users/edit/:userId" element={<EditUser />} />
              <Route path="/todos" element={<TaskList />} />
              <Route path="/todos/create" element={<CreateTask />} />
              <Route path="/albums" element={<AlbumList />} />
              <Route path="/albums/view/:albumId" element={<AlbumView />} />
              <Route path="/pictures" element={<PictureList />} />
              <Route
                path="/pictures/edit/:pictureId"
                element={<EditPicture />}
              />
              <Route path="/posts" element={<PostList />} />
              <Route path="/posts/view/:postId" element={<PostView />} />
              <Route path="/comments" element={<CommentsList />} />
              <Route path="/comments/create" element={<CreateComment />} />
              <Route path="*" element={<Error />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
