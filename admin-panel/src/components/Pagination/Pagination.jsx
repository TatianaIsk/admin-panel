import React from 'react';
import './Pagination.scss';

const Pagination = ({users, usersPerPage, setCurrentPage, currentPage }) => {
    const renderPagination = () => {
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <nav>
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        className={`pageItem${number === currentPage ? ' active' : ''}`}
                    >
                        <button className="pageLink" onClick={() => setCurrentPage(number - 1)}>
                            назад
                        </button>
                        <button className="pageLink" onClick={() => setCurrentPage(number)}>
                            {number}
                        </button>
                        <button className="pageLink" onClick={() => setCurrentPage(number + 1)}>
                            вперед
                        </button>
                    </button>
                ))}
            </nav>
        );
    };

    return <div className="pagination">{renderPagination()}</div>;
};

export default Pagination;