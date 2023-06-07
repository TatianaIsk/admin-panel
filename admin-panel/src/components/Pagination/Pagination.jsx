import React from 'react';
import './Pagination.scss';
import {useTheme} from "../../ThemeContext.jsx";

const Pagination = ({users, usersPerPage, setCurrentPage, currentPage}) => {
    const { isDarkMode } = useTheme();
    const renderPagination = () => {
        const visiblePages = 5;
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
            pageNumbers.push(i);
        }
        let startPage = currentPage <= Math.floor(visiblePages / 2) ? 0 : currentPage - Math.floor(visiblePages / 2);
        let endPage = startPage + visiblePages;
        if (endPage > pageNumbers.length) {
            endPage = pageNumbers.length;
            startPage = endPage - visiblePages;
        }
        const firstPage = currentPage > Math.floor(visiblePages / 2) && pageNumbers.length > visiblePages ? (
            <button key={1} className={`pageItem${currentPage === 1 ? ' active' : ''} ${isDarkMode ? 'pageItemDark' : ''}`}>
                <button className={`pageLink ${isDarkMode ? 'pageLinkDark' : ''}`} onClick={() => setCurrentPage(1)}>1</button>
            </button>
        ) : null;
        const lastPage = currentPage < pageNumbers.length - Math.floor(visiblePages / 2) && pageNumbers.length > visiblePages ? (
            <button key={pageNumbers.length} className={`pageItem${currentPage === pageNumbers.length ? ' active' : ''} ${isDarkMode ? 'pageItemDark' : ''}`}>
                <button className={`pageLink ${isDarkMode ? 'pageLinkDark' : ''}`} onClick={() => setCurrentPage(pageNumbers.length)}>{pageNumbers.length}</button>
            </button>
        ) : null;
        return (
            <nav>
                <button className={`pageLink ${isDarkMode ? 'pageLinkDark' : ''}`} onClick={() => setCurrentPage(currentPage - 1)}>
                    назад
                </button>
                {firstPage}
                {startPage > 0 && pageNumbers.length > visiblePages ? (
                    <button key={`ellipsis-start`} className={`pageItem ${isDarkMode ? 'pageItemDark' : ''}`}>
                        <button className={`pageLink ${isDarkMode ? 'pageLinkDark' : ''}`} onClick={() => setCurrentPage(startPage - 1)}>&hellip;</button>
                    </button>
                ) : null}
                {pageNumbers.slice(startPage, endPage).map((number) => (
                    <button
                        key={number}
                        className={`pageItem${number === currentPage ? ' active' : ''} ${isDarkMode ? 'pageItemDark' : ''}`}
                    >
                        <button className={`pageLink ${isDarkMode ? 'pageLinkDark' : ''}`} onClick={() => setCurrentPage(number)}>
                            {number}
                        </button>
                    </button>
                ))}
                {endPage < pageNumbers.length && pageNumbers.length > visiblePages ? (
                    <button key={`ellipsis-end`} className={`pageItem ${isDarkMode ? 'pageItemDark' : ''}`}>
                        <button className={`pageLink ${isDarkMode ? 'pageLinkDark' : ''}`} onClick={() => setCurrentPage(endPage + 1)}>&hellip;</button>
                    </button>
                ) : null}
                {lastPage}
                <button className={`pageLink ${isDarkMode ? 'pageLinkDark' : ''}`} onClick={() => setCurrentPage(currentPage + 1)}>
                    вперед
                </button>
            </nav>
        );
    };

    return <div className="pagination">{renderPagination()}</div>;
};

export default Pagination;