import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <div>
        <header>
            <h1>Expensify</h1>
            <NavLink to="/" activeClassName="active-nav-link" exact>Dashboard</NavLink> 
            <NavLink to="/create" activeClassName="active-nav-link" >Add Expences</NavLink>
            {/* <NavLink to="/help" activeClassName="active-nav-link">Help</NavLink>  */}
        </header>
    </div>
);

export default Header;