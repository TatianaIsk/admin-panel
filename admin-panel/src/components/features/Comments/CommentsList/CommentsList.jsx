import { useTheme } from "../../../../ThemeContext.jsx";
import React, { useEffect, useState } from "react";
import styles from "./CommentsList.module.scss";
import store from "../../../../store.jsx";
import Comment from "../Comment.jsx";
import Pagination from "../../../ui/Pagination/Pagination.jsx";
import {Link} from "react-router-dom";
import classnames from "classnames";

const CommentsList = () => {
    const { isDarkMode } = useTheme();

    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [selectedPost, setSelectedPost] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchData() {
            await store.fetchComments();
            await store.fetchPosts();
            setComments(store.state.comments);
            setPosts(store.state.posts);
        }

        fetchData();
    }, []);

    const findPostName = (postId) => {
        const post = posts.find((post) => post.id === postId);
        return post ? post.title : "";
    }

    const [commentsPerPage] = useState(24)

    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment)

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedPost]);

    const filterComments = () => {
        let filteredComments = comments;

        if (selectedPost) {
            const postId = posts.find((post) => post.title === selectedPost)?.id;
            filteredComments = comments.filter(
                (comment) => comment.postId === postId
            );
        }

        return filteredComments;
    };

    const renderComments = () => {
        const filteredComments = filterComments();

        if (filteredComments.length === 0) {
            return (
                <tr>
                    <td className="errorMess" colSpan="3">
                        Записи не найдены
                    </td>
                </tr>
            );
        }

        return filteredComments
            .slice(indexOfFirstComment, indexOfLastComment)
            .map((comment) => {
                const postTitle = findPostName(comment.postId);
                return <Comment key={comment.id} comments={comment} postTitle={postTitle}/>;
            });
    };

    return (
        <>
            <div className={classnames(
                `wrapper ${isDarkMode ? "wrapperDark" : ""}`
            )}>
                <div className="searching">
                    <label
                        className={classnames(
                            `titleUser ${isDarkMode ? "titleUserDark" : ""}`
                        )}
                        htmlFor="searchUser"
                    >
                        Комментарии
                    </label>
                    <select
                        className={classnames(
                            `${styles.select} ${isDarkMode ? styles.selectDark : ""}`
                        )}
                        value={selectedPost}
                        onChange={(e) => setSelectedPost(e.target.value)}
                    >
                        <option value="">Пост</option>
                        {posts
                            .map((post) => post.title)
                            .filter(
                                (value, index, self) =>
                                    self.indexOf(value) === index && value !== ""
                            )
                            .map((title) => (
                                <option key={title} value={title}>
                                    {title}
                                </option>
                            ))}
                    </select>
                    <Link
                        to='/comments/create'
                        className={classnames(
                            `${styles.btnCreate} ${isDarkMode ? styles.btnCreateDark : ''}`
                        )}>
                        создать комментарий >>>
                    </Link>
                </div>
                <div
                    className={styles.tableWrapper}>
                    {renderComments()}
                </div>
                <div className="paginationCount">
                    <Pagination
                        users={comments}
                        usersPerPage={commentsPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                    <p className="countRows">
                        Строк на странице: {currentComments.length}
                    </p>
                </div>
            </div>
        </>
    );
};

export default CommentsList;