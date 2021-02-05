import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';

export const PrivateRoute = ({
    isAuthenticated,
    component: Component, // Renaming destructured prop component to Component
    ...restOfTheProps
}) => (
    <Route {...restOfTheProps} component={(props /* Router will provide some props to Route, like 'history' */) => (
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props} />
            </div>
         ) : (
            <Redirect  to="/" />
         )
    )} />
)
    


const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.userId
})

export default connect(mapStateToProps)(PrivateRoute);