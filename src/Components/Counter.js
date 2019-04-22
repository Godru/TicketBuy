import React, { Component } from 'react';
import '../App.css';

class Counter extends Component {
    constructor(props){
        super(props);
        this.state = {
            number: 1
        };
        this.counterPlus = this.counterPlus.bind(this);
        this.counterMinus = this.counterMinus.bind(this);
    }
    counterPlus(){
        this.props.changeTicket(this.state.number + 1);
    }
    counterMinus(){
        if(this.state.number - 1 > 0) {
            this.props.changeTicket(this.state.number - 1);
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({number: nextProps.tickets})
    }

    render() {
        const counterTitle = this.props.counterTitle;
        return (
            <div className="counter">
                <h2 className="counter__title">{counterTitle}</h2>
                <div className="counter__main">
                    <div onClick={this.counterMinus} className="counter__block"><div className="triangle-right"/></div>
                    <div className="counter__number">{this.state.number}</div>
                    <div onClick={this.counterPlus} className="counter__block"><div className="triangle-left"/></div>
                </div>
            </div>
        );
    }
}

export default Counter;