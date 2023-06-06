import React from 'react';
import './Pagination.scss';
import {useTheme} from "../../ThemeContext.jsx";

const Pagination = ({users, usersPerPage, setCurrentPage, currentPage}) => {
    const { isDarkMode } = useTheme();
    const renderPagination = () => {
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <nav>
                <button className={`pageLink ${isDarkMode ? 'pageLinkDark' : ''}`} onClick={() => setCurrentPage(pageNumbers - 1)}>
                    назад
                </button>
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        className={`pageItem${number === currentPage ? ' active' : ''} ${isDarkMode ? 'pageItemDark' : ''}`}
                    >
                        <button className={`pageLink ${isDarkMode ? 'pageLinkDark' : ''}`} onClick={() => setCurrentPage(number)}>
                            {number}
                        </button>
                    </button>
                ))}
                <button className={`pageLink ${isDarkMode ? 'pageLinkDark' : ''}`} onClick={() => setCurrentPage(pageNumbers + 1)}>
                    вперед
                </button>
            </nav>
        );
    };

    return <div className="pagination">{renderPagination()}</div>;
};

export default Pagination;