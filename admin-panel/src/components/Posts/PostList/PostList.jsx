import Header from "../../Header/Header.jsx";
import Menu from "../../Menu/Menu.jsx";
import { useTheme } from "../../../ThemeContext.jsx";
import React, { useEffect, useState } from "react";
import store from "../../../store.jsx";
import Loading from "../../Loading/Loading.jsx";
import Post from "../Post.jsx";

const PostList = () => {
    const { isDarkMode } = useTheme();

    const [posts, setPosts] = useState(store.state.posts);
    const [users, setUsers] = useState(store.state.users);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            await store.fetchPosts();
            setPosts(store.state.posts);
            await store.fetchUsers();
            setUsers(store.state.users);
            setLoading(false);
        }

        fetchData();
    }, []);

    const findUsername = (userId) => {
        const user = users.find((user) => user.id === userId);
        return user ? user.name : "";
    };

    return (
        <>
            <Header />
            <Menu />
            <div className={`wrapper ${isDarkMode ? "wrapperDark" : ""}`}>
                <div className="searhcing">
                    <label
                        className={`titleUser ${isDarkMode ? "titleUserDark" : ""}`}
                        htmlFor="searchUser"
                    >
                        посты
                    </label>
                    <input
                        type="text"
                        className={`searchUser ${isDarkMode ? "searchUserDark" : ""}`}
                        id="searchUser"
                        placeholder="Поиск"
                    />
                </div>
                {loading ? (
                    <Loading />
                ) : (
                    <div>
                        {posts.map((post) => (
                            <Post key={post.id} post={post} findUsername={findUsername} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default PostList;