import React from 'react'
import ReactDOM from 'react-dom';

// Higher order component (HOC) -> 

const Info = (props) => (
    <div>
        <p>Here is your data:</p>
        <p>Age: {props.age}</p>
        { props.isAuthenticated && <p>THIS IS PREVILAGED INFO</p>}
    </div>
);

const hof = (WrappedComponent) => {
    // Its job is to return a react component warpping the baby component
    return (props) => (
        <div>
            { !props.isAuthenticated && <p>Please authenticate first</p>}
            { props.isAuthenticated && <WrappedComponent {...props} /> } {/* This is the Info component */}
        </div>
    );
};

const Hoc = hof(Info);

ReactDOM.render( <Hoc isAuthenticated={true} age={24} />, document.getElementById('app'));
