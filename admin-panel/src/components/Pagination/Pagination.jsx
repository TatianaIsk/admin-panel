import React from 'react';
import './Pagination.scss';

const Pagination = ({users, usersPerPage, setCurrentPage, currentPage}) => {
    const renderPagination = () => {
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <nav>
                <button className="pageLink" onClick={() => setCurrentPage(pageNumbers - 1)}>
                    назад
                </button>
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        className={`pageItem${number === currentPage ? ' active' : ''}`}
                    >
                        <button className="pageLink" onClick={() => setCurrentPage(number)}>
                            {number}
                        </button>
                    </button>
                ))}
                <button className="pageLink" onClick={() => setCurrentPage(pageNumbers + 1)}>
                    вперед
                </button>
            </nav>
        );
    };

    return <div className="pagination">{renderPagination()}</div>;
};

export default Pagination;