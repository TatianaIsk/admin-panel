import React from 'react';
import icon from './../../assets/icon-users.png';
import Dropdown from '..//Users/Dropdown/Dropdown.jsx';
import {useTheme} from "../../ThemeContext.jsx";
import iconDark from './../../assets/darkAssets/icon-close-dark-th.png'

const User = ({user, selectedUserId, isMenuOpen, toggleMenu, usersPerPage, currentPage}) => {
    const { isDarkMode } = useTheme();
    const formatAddress = (address) => {
        return `${address.street}, ${address.city}, ${address.zipcode}`;
    }

    return (
        <>
            {user.id === selectedUserId && isMenuOpen && (
                <tr>
                    <td className="tdDrop" colSpan="3">
                        <Dropdown
                            onClose={() => toggleMenu(user.id)}
                            toView={`/users/view/${user.id}`}
                            toEdit={`/users/edit/${user.id}`}
                            selectedUserId={selectedUserId}
                            isMenuOpen={isMenuOpen}
                        />
                    </td>
                </tr>
            )}
            <tr key={user.id}>
                <td className={`tdUser ${isDarkMode ? 'tdUserDark' : ''}`}>
                    <img
                        className={`imgTr ${isDarkMode ? 'imgTrDark' : ''}`}
                        onClick={() => toggleMenu(user.id)}
                        src={`${isDarkMode ? iconDark : icon}`}
                        alt=""
                    />
                </td>
                <td className={`tdUser ${isDarkMode ? 'tdUserDark' : ''}`}>{user.id}</td>
                <td className={`tdUser ${isDarkMode ? 'tdUserDark' : ''}`}>{user.name}</td>
                <td className={`tdUser ${isDarkMode ? 'tdUserDark' : ''}`}>{user.username}</td>
                <td className={`tdUser ${isDarkMode ? 'tdUserDark' : ''}`}>{user.email}</td>
                <td className={`tdUser ${isDarkMode ? 'tdUserDark' : ''}`} style={{width: 400 + 'px'}}>
                    {formatAddress(user.address)}
                </td>
                <td className={`tdUser ${isDarkMode ? 'tdUserDark' : ''}`}>{user.phone}</td>
                <td className={`tdUser ${isDarkMode ? 'tdUserDark' : ''}`}>{user.website}</td>
                <td className={`tdUser ${isDarkMode ? 'tdUserDark' : ''}`}>{user.company.name}</td>
            </tr>
        </>
    );
};

export default User;