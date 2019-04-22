import React, { Component } from 'react';
import '../App.css';

class MenuBlock extends Component {
    constructor(props){
        super(props);
        this.state = {
            blockDisplay: 'none',
            id: undefined
        };
        this.selectBlock = this.selectBlock.bind(this);
    }
    componentWillMount(){
        this.setState({
            blockDisplay: this.props.blockDisplay,
            id: this.props.id
        })
    }
    componentWillReceiveProps(nextProps){
        this.setState({blockDisplay: nextProps.blockDisplay});
    }
    selectBlock(){
        this.props.selectBlock(this.state.id);
    }
    render() {
        const menuBlockNames = this.props.menuBlockNames;
        return (
            <div onClick = {this.selectBlock} style = {{display: this.state.blockDisplay}} className="menu__block">
                {menuBlockNames}
            </div>
        );
    }
}

export default MenuBlock;