import React from 'react';
import navbar from './Nav.module.css'
import { NavLink } from 'react-router-dom'
import Friends from './friends/friends';

const Nav: React.FC = () => {
    return <nav className={navbar.nav}>
        <ul>
            <li className={navbar.item}>
                <NavLink to="/Profile" activeClassName={navbar.active}>Profile</NavLink>
            </li>
            <li className={navbar.item}>
                <NavLink to="/Messages" activeClassName={navbar.active}>Message</NavLink>
            </li>
            <li className={navbar.item}>
                <NavLink to="/News" activeClassName={navbar.active}>News</NavLink>
            </li>
            <li className={navbar.item}>
                <NavLink to="/Music" activeClassName={navbar.active}>Music</NavLink>
            </li>
            <li className={navbar.item}>
                <NavLink to="/Friends" activeClassName={navbar.active}>Find friens</NavLink>
            </li>
            <li className={navbar.item}>
                <NavLink to="/Settings" activeClassName={navbar.active}>Settings</NavLink>
            </li>
        </ul>
        <Friends />
    </nav>
}

export default Nav;