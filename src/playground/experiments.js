/* import React from 'react';
import ReactDOM from 'react-dom';

function Clock() {
    const state = {
        date: new Date()
    }

    const tick = () => {
      state.setState({date: new Date});
    }

    componentDidMount() {
      //state.setState({date: new Date})
      //setInterval(tick, 1000);
      console.log('hi');
    }
    

    return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {state.date.toLocaleTimeString()}.</h2>
        </div>
    );
}

ReactDOM.render(
    <Clock date={new Date()} />, document.getElementById('app')
);

 

/* 
class Toggle extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isToggleOn: true};
  
      // This binding is necessary to make `this` work in the callback    
      this.handleClick = this.handleClick.bind(this);  }
  
    handleClick() {    
        this.setState(state => ({      isToggleOn: !state.isToggleOn    }));  }
    render() {
      return (
        <button onClick={this.handleClick}>        {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
      );
    }
  }
  
  ReactDOM.render(
    <Toggle />,
    document.getElementById('root')
  ); */
/* 
const Conditional = () => {
    const count = false;  
    return (
      <div>
        { count && <h1>Messages: {count}</h1>}    
      </div>
    );
}

ReactDOM.render( <Conditional />, document.getElementById('app')); */

import React from 'react';
import ReactDOM from 'react-dom';

const numbers = [1, 2, 3, 4];

const listItems = numbers.map(
  number => <li key={number}>{number}</li>
);

console.log(listItems);

ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('app')
)
