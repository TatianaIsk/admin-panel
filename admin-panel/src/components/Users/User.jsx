import React from 'react';
import icon from './../../assets/icon-users.png';
import Dropdown from '..//Users/Dropdown/Dropdown.jsx';

const User = ({user, selectedUserId, isMenuOpen, toggleMenu, usersPerPage, currentPage}) => {

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
                <td className="tdUser">
                    <img
                        onClick={() => toggleMenu(user.id)}
                        src={icon}
                        style={{width: 16 + 'px', cursor: 'pointer'}}
                        alt=""
                    />
                </td>
                <td className="tdUser">{user.id}</td>
                <td className="tdUser">{user.name}</td>
                <td className="tdUser">{user.username}</td>
                <td className="tdUser">{user.email}</td>
                <td className="tdUser" style={{width: 400 + 'px'}}>
                    {formatAddress(user.address)}
                </td>
                <td className="tdUser">{user.phone}</td>
                <td className="tdUser">{user.website}</td>
                <td className="tdUser">{user.company.name}</td>
            </tr>
        </>
    );
};

export default User;