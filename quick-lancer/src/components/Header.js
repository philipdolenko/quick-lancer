import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import '../styles/header.css';
const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Проверяем, вошел ли пользователь при загрузке страницы
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedInStatus === 'true');
    }, []);
    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('authToken');
    };
    const rendersLink = () => {
        if (location.pathname === '/') {
            return isLoggedIn ? (
                <Link className='header-link' to="/profile">Profile</Link>
            ) : (
                <Link className='header-link' to="/login">Sign In</Link>
            )
        } else if (location.pathname === '/login') {
            return null;
        } else if (location.pathname === '/profile') {
            return <Link className='header-link' to="/" onClick={handleLogout}>Sign out</Link>
        }
    }
    
    return (
        <div className='header-container'>
            <Link to='/'>
                <h1 className="quicklancer-title">
                    <span className="quick">Quick</span>
                    <span className="lancer">lancer</span>
                </h1>
            </Link>
            {rendersLink()}
        </div>
    )
}
export default Header;