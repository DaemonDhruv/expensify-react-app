import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export const PublicRoute = ({
    isAuthenticated,
    component: Component, // Renaming destructured prop component to Component
    ...restOfTheProps
}) => (
    <Route {...restOfTheProps} component={(props /* Router will provide some props to Route, like 'history' */) => (
        isAuthenticated ? (
            <Redirect to="/dashboard" />
         ) : (
            <Component {...props} />
         )
    )} />
)
    


const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.userId
})

export default connect(mapStateToProps)(PublicRoute);