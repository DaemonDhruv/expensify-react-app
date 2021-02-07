import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({startLogout}) => (
    <div>
        <header>
            <h1>Expensify</h1>
            <NavLink to="/dashboard" activeClassName="active-nav-link" >Dashboard</NavLink> 
            <NavLink to="/create" activeClassName="active-nav-link" >Add Expences</NavLink>
            {/* <NavLink to="/help" activeClassName="active-nav-link">Help</NavLink>  */}
            <button onClick={startLogout}>Logout</button>
        </header>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header);