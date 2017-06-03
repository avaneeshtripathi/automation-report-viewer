import React from 'react';
import ReactDOM from 'react-dom';
import Container from './container/container';

const Main = React.createClass({
    render () {
        return (
            <Container />
        );
    }
});

ReactDOM.render(<Main />,  document.getElementById("main"));
