import React from 'react';
import { Link } from 'react-router-dom';

function NavTabs() {
    return (
        <ul className="nav-tabs">
            <li className="nav-item">
                <Link to='/'>Home</Link>
            </li>
        <li className="nav-item">
            <Link to='/post'>Post</Link>
        </li>
        <li className="nav-item">
            <Link to='/quiz'>Quiz</Link>
        </li>
        <li className="nav-item">
            <Link to='/profile'>Profile</Link>
        </li>
    </ul>
    )
}

export default NavTabs;