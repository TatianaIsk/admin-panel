import { useEffect, useState } from "react";
import Header from "../../Header/Header.jsx";
import Menu from "../../Menu/Menu.jsx";
import { useTheme } from "../../../ThemeContext.jsx";
import { useParams } from "react-router-dom";
import store from "../../../store.jsx";

const PostComments = () => {
    const { isDarkMode } = useTheme();
    const { postId } = useParams();
    const [comments, setComments] = useState(store.state.comments);

    useEffect(() => {
        async function fetchData() {
            const newComments = await store.fetchComments(postId);
            setComments(store.state.comments);
        }
        fetchData();
    }, [postId]);

    return (
        <div>
            <Header />
            <Menu />
            <div className={`wrapper ${isDarkMode ? "wrapperDark" : ""}`}>
                <ul>
                    {comments?.map((comment) => (
                        <li key={comment.id}>
                            <h4>{comment.name}</h4>
                            <p>{comment.body}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PostComments;
