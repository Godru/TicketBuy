import React, { Component } from 'react';
import '../App.css';



class App extends Component {
    constructor(props){
        super(props);
        this.state ={
            priceText: 100
        };

    }
    componentWillReceiveProps(nextProps){
        this.setState({priceText: nextProps.priceText})
    }
    render() {
        const priceTitle = this.props.priceTitle;
        return (
            <div className="price">
                <h2 className="menu__title">{priceTitle}</h2>
                <div className="price__text">{this.state.priceText} руб</div>
            </div>
        );
    }
}

export default App;