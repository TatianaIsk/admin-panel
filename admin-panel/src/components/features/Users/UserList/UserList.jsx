import './UserList.scss'

import thIcon from '../../../../assets/icon-mainUsers.png'
import thIconDark from '../../../../assets/darkAssets/icon-close-dark-th.png'

import User from "../User.jsx";
import {useState, useEffect} from "react";
import store from "../../../../store.jsx";
import Pagination from "../../../ui/Pagination/Pagination.jsx";
import Loader from "../../../ui/Loading/Loading.jsx";
import {useTheme} from "../../../../ThemeContext.jsx";
import ModalDelete from "../../../ui/Modal/ModalDelete.jsx";
import {Link} from "react-router-dom";
import classnames from "classnames";
import Title from "../../../ui/Title/Title.jsx";
import Searching from "../../../ui/Searching/Searching.jsx";


const UserList = () => {
    const [users, setUsers] = useState(store.state.users);
    const [loading, setLoading] = useState(true);
    const {isDarkMode} = useTheme();
    const [searchName, setSearchName] = useState('');

    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    const toggleSortOrder = (field) => {
        if (field === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

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
            return (
                <tr>
                    <td className={` ${isDarkMode ? 'errorMessDark' : ''}`} colSpan="3">
                        Записи не найдены
                    </td>
                </tr>
            );
        }

        const sortedUsers = [...filteredUsers].sort((a, b) => {
            if (sortBy === 'name') {
                return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            } else if (sortBy === 'id') {
                return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
            } else if (sortBy === 'username') {
                return sortOrder === 'asc' ? a.username.localeCompare(b.username) : b.username.localeCompare(a.username);
            } else if (sortBy === 'email') {
                return sortOrder === 'asc' ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email);
            }
        });

        return sortedUsers.map((user) => (
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
                    <div className={classnames(
                        `wrapper ${isDarkMode ? 'wrapperDark' : ''}`
                    )}>
                        <div className="searhcing">
                            <Title
                                isDarkMode={isDarkMode}
                                title="Пользователи"
                                htmlFor="searchUser"
                            />
                            <Link
                                to="/users/create"
                                className={classnames(
                                    `btnCreate ${isDarkMode ? 'btnCreateDark' : ''}`
                                )}>
                                Создать нового пользователя
                            </Link>
                            <Searching
                                isDarkMode={isDarkMode}
                                value={searchName}
                                onChange={handleSearch}
                                id="searchUser"
                            />
                        </div>
                        <div className="tableWrapper">
                            <table className="tableUser">
                                <thead className="theadUser">
                                <tr className="trUser">
                                    <th className="thUser">
                                        <img
                                            className={`imgTh ${isDarkMode ? 'imgThDark' : ''}`}
                                            src={`${isDarkMode ? thIconDark : thIcon}`}
                                            alt=""
                                            onClick={() => toggleSortOrder('id')}
                                        />
                                    </th>
                                    <th className="thUser">
                                        ID
                                        <button className={classnames(
                                            `btnTh ${isDarkMode ? 'btnThDark' : ''}`)}
                                                onClick={() => toggleSortOrder('id')}
                                        ></button>
                                    </th>
                                    <th className="thUser">
                                        имя
                                        <button className={classnames(
                                            `btnTh ${isDarkMode ? 'btnThDark' : ''}`)}
                                                onClick={() => toggleSortOrder('name')}
                                        ></button>
                                    </th>
                                    <th className="thUser">
                                        никнейм (eng)
                                        <button className={classnames(
                                            `btnTh ${isDarkMode ? 'btnThDark' : ''}`)}
                                                onClick={() => toggleSortOrder('username')}
                                        ></button>
                                    </th>
                                    <th className="thUser">
                                        e-mail
                                        <button className={classnames(
                                            `btnTh ${isDarkMode ? 'btnThDark' : ''}`)}
                                                onClick={() => toggleSortOrder('email')}
                                        ></button>
                                    </th>
                                    <th className="thUser">
                                        адрес
                                        <button className={classnames(
                                            `btnTh ${isDarkMode ? 'btnThDark' : ''}`)}
                                        ></button>
                                    </th>
                                    <th className="thUser">
                                        телефон
                                        <button className={classnames(
                                            `btnTh ${isDarkMode ? 'btnThDark' : ''}`)}
                                        ></button>
                                    </th>
                                    <th className="thUser">
                                        сайт
                                        <button className={classnames(
                                            `btnTh ${isDarkMode ? 'btnThDark' : ''}`)}
                                        ></button>
                                    </th>
                                    <th className="thUser">
                                        компания
                                        <button className={classnames(
                                            `btnTh ${isDarkMode ? 'btnThDark' : ''}`)}
                                        ></button>
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