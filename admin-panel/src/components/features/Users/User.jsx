import React, {useState} from 'react';
import icon from './../../../assets/icon-users.png';
import Dropdown from '..//Users/Dropdown/Dropdown.jsx';
import {useTheme} from "../../../ThemeContext.jsx";
import iconDark from './../../../assets/darkAssets/icon-close-dark-th.png'
import classnames from "classnames";


const User = ({user, selectedUserId, isMenuOpen, toggleMenu, usersPerPage, currentPage, toggleDeleteModal}) => {
    const { isDarkMode } = useTheme();

    const formatAddress = (address) => {
        const street = user.address?.street || '';
        const city = user.address?.city || '';
        const zipcode = user.address?.zipcode || '';
        return `${street}, ${city}, ${zipcode}`;
    }

    const formatCompany = (company) => {
        const compName = user.company?.name || '';
        const compCatchPhrase = user.company?.catchPhrase || '';
        return `${compName} ${compCatchPhrase}`
    }

    return (
        <>
            {user.id === selectedUserId && isMenuOpen && (
                <tr>
                    <td className="tdDrop" colSpan="3">
                        <Dropdown
                            onClose={() => toggleMenu(user.id)}
                            toView={`/users/view/${user.username}`}
                            toEdit={`/users/edit/${user.username}`}
                            selectedUserId={selectedUserId}
                            isMenuOpen={isMenuOpen}
                            toggleDeleteModal={() => toggleDeleteModal(user.id)}
                        />
                    </td>
                </tr>
            )}
            <tr key={user.id}>
                <td className={classnames(
                    `tdUser ${isDarkMode ? 'tdUserDark' : ''}`
                )}>
                    <img
                        className={classnames(
                            `imgTr ${isDarkMode ? 'imgTrDark' : ''}`
                        )}
                        onClick={() => toggleMenu(user.id)}
                        src={`${isDarkMode ? iconDark : icon}`}
                        alt=""
                    />
                </td>
                <td className={classnames(
                    `tdUser ${isDarkMode ? 'tdUserDark' : ''}`
                )}>
                    {user.id}
                </td>
                <td className={classnames(
                    `tdUser ${isDarkMode ? 'tdUserDark' : ''}`
                )}>
                    {user.name}
                </td>
                <td className={classnames(
                    `tdUser ${isDarkMode ? 'tdUserDark' : ''}`
                )}
                    style={{width: 190 + 'px'}}>
                    {user.username}
                </td>
                <td className={classnames(
                    `tdUser ${isDarkMode ? 'tdUserDark' : ''}`
                )}>
                    {user.email}
                </td>
                <td className={classnames(
                    `tdUser ${isDarkMode ? 'tdUserDark' : ''}`
                )}
                    style={{width: 400 + 'px'}}>
                    {formatAddress(user.address)}
                </td>
                <td className={classnames(
                    `tdUser ${isDarkMode ? 'tdUserDark' : ''}`
                )}>
                    {user.phone}
                </td>
                <td className={classnames(
                    `tdUser ${isDarkMode ? 'tdUserDark' : ''}`
                )}>
                    {user.website}
                </td>
                <td className={classnames(
                    `tdUser ${isDarkMode ? 'tdUserDark' : ''}`
                )}
                    style={{width: 300 + 'px'}}>
                    {formatCompany(user.company)}
                </td>
            </tr>
        </>
    );
};

export default User;