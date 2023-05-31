import React from "react";
import axios from "axios";

import './Users.scss'
import icon from './../../assets/icon-users.png'
import thIcon from '../../assets/icon-mainUsers.png'
import Header from "../Header/Header.jsx";
import Menu from "../Menu/Menu.jsx";
import Dropdown from "./Dropdown/Dropdown.jsx";

import { useState, useEffect } from "react";

const Users = () => {
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(24);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/users"
            );
            setUsers(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const formatAddress = (address) => {
        return `${address.street}, ${address.city}, ${address.zipcode}`;
    }

    const [selectedUserId, setSelectedUserId] = useState(null);

    const toggleMenu = (userId) => {
        setIsMenuOpen(!isMenuOpen);
        setSelectedUserId(userId);
    };

    const renderUsers = () => {
        if (currentUsers.length === 0) {
            return <tr>
                <td colSpan="3">Записи не найдены</td>
            </tr>
        }

        return currentUsers.map(user => (
            <>
                {user.id === selectedUserId && isMenuOpen && (
                    <tr>
                        <td className="tdDrop" colSpan="3">
                            <Dropdown onClose={() => toggleMenu(user.id)} to={`/users/view/${user.id}`}/>
                        </td>
                    </tr>
                )}
                <tr key={user.id}>
                    <td className="tdUser"><img onClick={() => toggleMenu(user.id)}
                             src={icon}
                             style={{width: 16 + 'px', cursor: "pointer"}}
                             alt=""
                    />
                    </td>
                    <td className="tdUser">{user.id}</td>
                    <td className="tdUser">{user.name}</td>
                    <td className="tdUser">{user.username}</td>
                    <td className="tdUser">{user.email}</td>
                    <td className="tdUser" style={{width: 400 + 'px'}}>{formatAddress(user.address)}</td>
                    <td className="tdUser">{user.phone}</td>
                    <td className="tdUser">{user.website}</td>
                    <td className="tdUser">{user.company.name}</td>
                </tr>
            </>
        ));
    };

    const renderPagination = () => {
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <nav>
                {pageNumbers.map(number => (
                    <button key={number} className={`pageItem${number == currentPage ? ' active' : ''}`}>
                        <button className="pageLink" onClick={() => setCurrentPage(number - 1)}>назад</button>
                        <button className="pageLink" onClick={() => setCurrentPage(number)}>{number}</button>
                        <button className="pageLink" onClick={() => setCurrentPage(number + 1)}>вперед</button>
                    </button>
                ))}
            </nav>
        );
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <Header/>
            <Menu/>
            <div className="wrapper">
                <div className="searhcing">
                    <label className="titleUser"
                           htmlFor="searchUser">
                        пользователи
                    </label>
                    <a href="/users/create" className="btnCreate">Создать нового пользователя</a>
                    <input type="text"
                           className="searchUser"
                           id="searchUser"
                           placeholder="Поиск"
                    />
                </div>
                <table className="tableUser">
                    <thead className="theadUser">
                    <tr className="trUser">
                        <th className="thUser">
                            <img
                                src={thIcon}
                                style={{width: 16 + 'px', cursor: "pointer"}}
                                alt=""
                            />
                        </th>
                        <th className="thUser">ID
                            <button className="btnTh"></button>
                        </th>
                        <th className="thUser">имя
                            <button className="btnTh"></button>
                        </th>
                        <th className="thUser">никнейм (eng)
                            <button className="btnTh"></button>
                        </th>
                        <th className="thUser">e-mail
                            <button className="btnTh"></button>
                        </th>
                        <th className="thUser">адрес
                            <button className="btnTh"></button>
                        </th>
                        <th className="thUser">телефон
                            <button className="btnTh"></button>
                        </th>
                        <th className="thUser">сайт
                            <button className="btnTh"></button>
                        </th>
                        <th className="thUser">компания
                            <button className="btnTh"></button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderUsers()}
                    </tbody>
                </table>
                <div className="paginationCount">
                    {renderPagination()}
                    <p className="countRows">Строк на странице: {currentUsers.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Users