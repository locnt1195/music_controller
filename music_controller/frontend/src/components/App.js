import React from 'react';
import { render } from 'react-dom';
import HomePage from './HomePage';


export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="center">
                <HomePage/>
            </div>
        )
    }
}

const appDiv = document.getElementById('app');
render(<App/>, appDiv);