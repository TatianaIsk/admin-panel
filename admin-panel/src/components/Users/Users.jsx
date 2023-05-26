import axios from "axios";

import './Users.scss'
import icon from './../../assets/icon-users.png'
import thIcon from '../../assets/icon-mainUsers.png'
import Header from "../Header/Header.jsx";
import Menu from "../Menu/Menu.jsx";
import {useState, useEffect} from "react";

const Users = () => {
    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/users"
            );
            setUsers(response.data)
        } catch ( error ) {
            console.log(error)
        }
    }

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
                                <img src={thIcon} style={{width: 16 + 'px'}} alt=""/>
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
                    {users.map((user) => (
                      <tr key={user.id}>
                          <td><img src={icon} style={{width: 16 + 'px'}} alt=""/></td>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.address.city && user.address.street}</td>
                          <td>{user.phone}</td>
                          <td>{user.website}</td>
                          <td>{user.company.name}</td>
                      </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users