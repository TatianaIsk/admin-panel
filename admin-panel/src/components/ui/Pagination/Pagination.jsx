import React, {useState} from 'react';
import './Pagination.scss';
import {useTheme} from '../../../ThemeContext.jsx';
import classnames from "classnames";
import styles from "../Menu/Menu.module.scss";

const Pagination = ({users, usersPerPage, setCurrentPage, currentPage}) => {
    const {isDarkMode} = useTheme();
    const [showCurrentPage, setShowCurrentPage] = useState(false);

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
        const firstPage =
            currentPage > Math.floor(visiblePages / 2) && pageNumbers.length > visiblePages ? (
                <button
                    key={1}
                    className={classnames(
                        `pageItem ${currentPage === 1 ? 'active' : ''} ${isDarkMode ? 'pageItemDark' : ''}`
                    )}
                >
                    <span className={classnames(
                        `pageLink ${isDarkMode ? 'pageLinkDark' : ''}`
                    )} onClick={() => setCurrentPage(1)}>
                        1
                    </span>
                </button>
            ) : null;
        const lastPage =
            currentPage < pageNumbers.length - Math.floor(visiblePages / 2) && pageNumbers.length > visiblePages ? (
                <button
                    key={pageNumbers.length}
                    className={classnames(
                        `pageItem ${currentPage === pageNumbers.length ? 'active' : ''} ${isDarkMode ? 'pageItemDark' : ''}`
                    )}
                >
                    <span
                        className={classnames(
                            `pageLink ${isDarkMode ? 'pageLinkDark' : ''}`
                        )}
                        onClick={() => setCurrentPage(pageNumbers.length)}
                    >
                        {pageNumbers.length}
                    </span>
                </button>
            ) : null;
        return (
            <nav>
                <button className={classnames(
                    `pageLink ${isDarkMode ? 'pageLinkDark' : ''}`
                )}
                        onClick={() => setCurrentPage(currentPage - 1)}>
                    назад
                </button>
                {firstPage}
                {startPage > 0 && pageNumbers.length > visiblePages ? (
                    <button key="ellipsis-start" className={classnames(
                        `pageItem ${isDarkMode ? 'pageItemDark' : ''}`
                    )}>
                        <span className={classnames(
                            `pageLink ${isDarkMode ? 'pageLinkDark' : ''}`
                        )}
                              onClick={() => setCurrentPage(startPage - 1)}>
                            &hellip;
                        </span>
                    </button>
                ) : null}
                {pageNumbers.slice(startPage, endPage).map((number) => (
                    <button
                        key={number}
                        onClick={() => {
                            setCurrentPage(number);
                            setShowCurrentPage(true);
                            setTimeout(() => setShowCurrentPage(false), 3000);
                        }}
                        className={classnames(
                            `pageLink ${isDarkMode ? 'pageLinkDark' : ''}`
                        )}
                    >
                        {number === currentPage ? 'Текущая страница' : number}
                    </button>
                ))}
                {endPage < pageNumbers.length && pageNumbers.length > visiblePages ? (
                    <button key="ellipsis-end" className={classnames(
                        `pageItem ${isDarkMode ? 'pageItemDark' : ''}`
                    )}>
                        <span className={classnames(
                            `pageLink ${isDarkMode ? 'pageLinkDark' : ''}`
                        )} onClick={() => setCurrentPage(endPage + 1)}>
                            &hellip;
                        </span>
                    </button>
                ) : null}
                {lastPage}
                <button className={classnames(
                    `pageLink ${isDarkMode ? 'pageLinkDark' : ''}`
                )}
                        onClick={() => setCurrentPage(currentPage + 1)}>
                    вперед
                </button>
            </nav>
        );
    };

    return (
        <div className="pagination">
            {renderPagination()}
            {showCurrentPage && <div className="currentPage">Текущая страница: {currentPage}</div>}
        </div>
    );
};

export default Pagination;