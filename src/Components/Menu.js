import React, { Component } from 'react';
import MenuBlock from './MenuBlock.js'
import '../App.css';

class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuOpen: false,
            selectedBlock: 0,
            menuBlockNames: [],
            blockDisplay: [],
            menuHeight: 40,
        };
        this.menuChange= this.menuChange.bind(this);
        this.selectBlock = this.selectBlock.bind(this);
        this.menuOpen = this.menuOpen.bind(this);
        this.menuClose = this.menuClose.bind(this);
    }
    menuChange() {
        if (!this.state.menuOpen) {
            this.menuOpen();
           }else{
            this.menuClose();
        }
    }
    menuOpen(){
        let blockDisplay = [...this.state.blockDisplay];
        for (let i = 0; i < this.props.menuBlockNames.length; i++) {
            blockDisplay[i] = 'block';
        }
        //   this.props.menuChange(true);
        this.setState({
            menuHeight: 40+40*this.props.menuBlockNames.length,
            blockDisplay: blockDisplay,
            menuOpen: !this.state.menuOpen,

        });

    }
    menuClose(){
        let blockDisplay = [...this.state.blockDisplay];
        for (let i = 0; i < this.props.menuBlockNames.length; i++) {
            blockDisplay[i] = 'none';
        }
        // this.props.menuChange(false);
        this.setState({
            menuHeight: 40,
            blockDisplay: blockDisplay,
            menuOpen: !this.state.menuOpen
        });
    }
    componentWillMount(){
        let blockDisplay = [...this.state.blockDisplay];
        for(let i = 0; i<this.props.menuBlockNames.length;i++ ){
            blockDisplay[i] = 'none';
        }
        this.setState({
            blockDisplay: blockDisplay,
            menuBlockNames: this.props.menuBlockNames
        });
    }
    componentWillReceiveProps(nextProps){
        if(this.state.menuOpen) {
            this.setState({menuOpen: false});
            this.menuClose();
        }

    }
    selectBlock(id){
        if(this.state.menuOpen) {
            let blockDisplay = [...this.state.blockDisplay];
            for (let i = 0; i < this.props.menuBlockNames.length; i++) {
                blockDisplay[i] = 'none';
            }
            this.props.menuSelect(id);
            this.setState({
                menuHeight: 40,
                selectedBlock: id,
                blockDisplay: blockDisplay,
                menuOpen: !this.state.menuOpen
            });
        }
    }
    render() {
        const menuTitle = this.props.menuTitle;
        const menuBlockNames = this.props.menuBlockNames;
        const MenuBlocks = menuBlockNames.map((item, i) =>
        { return <MenuBlock key ={i} id={i} selectBlock = {this.selectBlock}
                            blockDisplay={this.state.blockDisplay[i]}
                            menuBlockNames={item}/>});

        return (
            <div className="menu">
                <h2 className="menu__title">{menuTitle}</h2>
                <div className="menu__main" style = {{height: this.state.menuHeight}} onClick={this.menuChange}>
                    <div className="menu__selected">
                        {menuBlockNames[this.state.selectedBlock]}
                    </div>
                    {MenuBlocks}
                    <div className="triangle-down"/>
                </div>
            </div>
        );
    }
}

export default Menu;