import axios from "axios";

import './Users.scss'
import icon from './../../assets/icon-users.png'
import thIcon from '../../assets/icon-mainUsers.png'
import Header from "../Header/Header.jsx";
import Menu from "../Menu/Menu.jsx";
import {useState, useEffect} from "react";

const Users = () => {
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(24);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/users"
            );
            setUsers(response.data)
            setCount(response.data.length)
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

    const renderUsers = () => {
        if (currentUsers.length === 0) {
            return <tr>
                <td colSpan="3">Записи не найдены</td>
            </tr>
        }

        return currentUsers.map(user => (
            <tr key={user.id}>
                <td><img src={icon} style={{width: 16 + 'px', cursor: "pointer"}} alt=""/></td>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td style={{width: 400 + 'px'}}>{formatAddress(user.address)}</td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
                <td>{user.company.name}</td>
            </tr>
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
                <table>
                    <thead>
                    <tr>
                        <th>
                            <img src={thIcon} style={{width: 16 + 'px', cursor: "pointer"}} alt=""/>
                        </th>
                        <th>ID
                            <button className="btnTh"></button>
                        </th>
                        <th>имя
                            <button className="btnTh"></button>
                        </th>
                        <th>никнейм (eng)
                            <button className="btnTh"></button>
                        </th>
                        <th>e-mail
                            <button className="btnTh"></button>
                        </th>
                        <th>адрес
                            <button className="btnTh"></button>
                        </th>
                        <th>телефон
                            <button className="btnTh"></button>
                        </th>
                        <th>сайт
                            <button className="btnTh"></button>
                        </th>
                        <th>компания
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

