import React from "react";
import './UserList.scss'
import thIcon from '../../../assets/icon-mainUsers.png'
import Header from "../../Header/Header.jsx";
import Menu from "../../Menu/Menu.jsx";
import User from "../User.jsx";
import {useState, useEffect} from "react";
import store from "../../../store.jsx";
import Pagination from "../../Pagination/Pagination.jsx";


const UserList = () => {
    const [users, setUsers] = useState(store.state.users);

    useEffect(() => {
        async function fetchData() {
            await store.fetchUsers();
            setUsers(store.state.users);
        }

        fetchData();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(24);

    const [isMenuOpen, setIsMenuOpen] = useState(false);


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
            <User
                key={user.id}
                user={user}
                selectedUserId={selectedUserId}
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}
                formatAddress={formatAddress}
                usersPerPage={usersPerPage}
                currentPage={currentPage}
            />
        ));
    };

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
                    <Pagination users={users} usersPerPage={usersPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                    <p className="countRows">Строк на странице: {currentUsers.length}</p>
                </div>
            </div>
        </div>
    )
}

export default UserList