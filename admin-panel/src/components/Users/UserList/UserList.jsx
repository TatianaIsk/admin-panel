import React, {useReducer} from "react";
import './UserList.scss'

import thIcon from '../../../assets/icon-mainUsers.png'
import thIconDark from '../../../assets/darkAssets/icon-close-dark-th.png'

import Header from "../../Header/Header.jsx";
import Menu from "../../Menu/Menu.jsx";
import User from "../User.jsx";
import {useState, useEffect} from "react";
import store from "../../../store.jsx";
import Pagination from "../../Pagination/Pagination.jsx";
import Loader from "../../Loading/Loading.jsx";
import {useTheme} from "../../../ThemeContext.jsx";
import ModalDelete from "../../Modal/ModalDelete.jsx";


const UserList = () => {
    const [users, setUsers] = useState(store.state.users);
    const [loading, setLoading] = useState(true);
    const {isDarkMode} = useTheme();
    const [searchName, setSearchName] = useState('');

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchName.toLowerCase()));

    const handleSearch = (event) => {
        setSearchName(event.target.value);
    };

    console.log(users)

    useEffect(() => {
        async function fetchData() {
            await store.fetchUsers();
            setUsers(store.state.users);
            setLoading(false);
        }

        fetchData();
    }, []);

    useEffect(() => {
        const unsubscribe = store.onStateChange(state => {
            setUsers(state.users);
        });
        setLoading(false);
        return unsubscribe;
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

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);

    const toggleMenu = (userId) => {
        if (selectedUserId === userId) {
            setIsMenuOpen(!isMenuOpen);
        } else {
            setSelectedUserId(userId);
            setIsMenuOpen(true);
        }
    };

    const toggleDeleteModal = (userId) => {
        setUserIdToDelete(userId);
        setIsOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setIsOpenDeleteModal(false);
    };

    const handleDeleteUser = async () => {
        try {
            await store.deleteUser(userIdToDelete);
            setUsers((prevState) => prevState.filter((user) => user.id !== userIdToDelete));
            console.log('Пользователь удален');
        } catch (error) {
            console.error(error);
        }
        setIsOpenDeleteModal(false);
    };

    const renderUsers = () => {
        if (filteredUsers.length === 0) {
            return <tr>
                <td className={`errorMess ${isDarkMode ? 'errorMessDark' : ''}`} colSpan="3">Записи не найдены</td>
            </tr>
        }

        return filteredUsers.map(user => (
            <User
                key={user.id}
                user={user}
                selectedUserId={selectedUserId}
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}
                toggleDeleteModal={toggleDeleteModal}
            />
        ));
    };

    return (
        <div>
            {loading ? (
                <Loader/>
            ) : (
                <div>
                    <Header/>
                    <Menu/>
                    <div className={`wrapper ${isDarkMode ? 'wrapperDark' : ''}`}>
                        <div className="searhcing">
                            <label className={`titleUser ${isDarkMode ? 'titleUserDark' : ''}`}
                                   htmlFor="searchUser">
                                пользователи
                            </label>
                            <a href="/users/create" className={`btnCreate ${isDarkMode ? 'btnCreateDark' : ''}`}>Создать
                                нового пользователя</a>
                            <input type="text"
                                   className={`searchUser ${isDarkMode ? 'searchUserDark' : ''}`}
                                   id="searchUser"
                                   placeholder="Поиск"
                                   value={searchName}
                                   onChange={handleSearch}
                            />
                        </div>
                        <div className="tableWrapper" style={{height: '700px', overflow: 'auto'}}>
                            <table className="tableUser">
                                <thead className="theadUser">
                                <tr className="trUser">
                                    <th className="thUser">
                                        <img
                                            className={`imgTh ${isDarkMode ? 'imgThDark' : ''}`}
                                            src={`${isDarkMode ? thIconDark : thIcon}`}
                                            alt=""
                                        />
                                    </th>
                                    <th className="thUser">
                                        ID
                                        <button className={`btnTh ${isDarkMode ? 'btnThDark' : ''}`}></button>
                                    </th>
                                    <th className="thUser">
                                        имя
                                        <button className={`btnTh ${isDarkMode ? 'btnThDark' : ''}`}></button>
                                    </th>
                                    <th className="thUser">
                                        никнейм (eng)
                                        <button className={`btnTh ${isDarkMode ? 'btnThDark' : ''}`}></button>
                                    </th>
                                    <th className="thUser">
                                        e-mail
                                        <button className={`btnTh ${isDarkMode ? 'btnThDark' : ''}`}></button>
                                    </th>
                                    <th className="thUser">
                                        адрес
                                        <button className={`btnTh ${isDarkMode ? 'btnThDark' : ''}`}></button>
                                    </th>
                                    <th className="thUser">
                                        телефон
                                        <button className={`btnTh ${isDarkMode ? 'btnThDark' : ''}`}></button>
                                    </th>
                                    <th className="thUser">
                                        сайт
                                        <button className={`btnTh ${isDarkMode ? 'btnThDark' : ''}`}></button>
                                    </th>
                                    <th className="thUser">
                                        компания
                                        <button className={`btnTh ${isDarkMode ? 'btnThDark' : ''}`}></button>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {renderUsers()}
                                </tbody>
                            </table>
                            {isOpenDeleteModal && (
                                <ModalDelete
                                    isOpen={isOpenDeleteModal}
                                    onClose={handleCloseDeleteModal}
                                    onDelete={handleDeleteUser}
                                />)}
                    </div>
                        <div className="paginationCount">
                            <Pagination users={users} usersPerPage={usersPerPage} setCurrentPage={setCurrentPage}
                                        currentPage={currentPage}/>
                            <p className="countRows">Строк на странице: {currentUsers.length}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserList