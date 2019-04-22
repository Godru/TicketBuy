import React, { Component } from 'react';
import Menu from './Components/Menu.js'
import Counter from './Components/Counter.js'
import Price from './Components/Price.js'
import './App.css';



class App extends Component {
    constructor(props){
        super(props);
        this.state ={
            firstOfferDisplay: 'flex',
            secondOfferDisplay: 'none',
            dayMenuBlockNames: ['Будни','Выходной'],
            ticketMenuBlockNames: ['билет на 5 проходов','билет на 10 проходов'],
            closeTab: false,
            activeTicket: 0,
            activeDay: 0,
            tickets: 1,
            finalPrice: 100,
            ticketPrice: [100,200],
            mail: '',
            mailConfirm: '',
            phone: '',
            mail_err: 'none'
        };
        this.menuSelect = this.menuSelect.bind(this);
        this.changeTicket = this.changeTicket.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.menuClose = this.menuClose.bind(this);
        this.openSecondOffer= this.openSecondOffer.bind(this);
        this.openFirstOffer = this.openFirstOffer.bind(this);
        this.tableMake = this.tableMake.bind(this);
        this.buyTicket = this.buyTicket.bind(this);
    }

    menuSelect(id,type){
        switch(type){
            case 'ticket':{
                this.setState({
                    activeTicket: id,
                    finalPrice: this.state.tickets*this.state.ticketPrice[id]+50*this.state.activeDay
                });
                break;
            }
            case 'day':{
                this.setState({
                    activeDay: id,
                    finalPrice: this.state.tickets*this.state.ticketPrice[this.state.activeTicket]+50*id
                });
                break;
            }
            default:{
                break;
            }
        }

    }
    changeTicket(number){
        this.setState({
            tickets: number,
            finalPrice: number*this.state.ticketPrice[this.state.activeTicket]+50*this.state.activeDay
        });

    }

    inputChange(e,key){
        switch(key) {
            case 'mail': {
                this.setState({
                    mail: e.target.value,
                    mail_err: 'none'
                });
                break;
            }
            case 'mailConfirm': {
                this.setState({
                    mailConfirm: e.target.value,
                    mail_err: 'none'
                });
                break;
            }
            case 'phone': {
                this.setState({
                    mail: e.target.value,
                    mail_err: 'none'
                });
                break;
            }
            default:{
                break;
            }
        }
    }
    menuClose(){
        this.setState({closeTab: false});
    }
    openSecondOffer(){
        this.setState({
            firstOfferDisplay: 'none',
            secondOfferDisplay: 'flex'
        })
    }
    openFirstOffer(){
        this.setState({
            firstOfferDisplay: 'flex',
            secondOfferDisplay: 'none',
            mail_err: 'none'
        })
    }
    tableMake(){
        let table = undefined;
        for(let i = 0 ; i < this.state.tickets.length; i++){
            if(this.state.tickets[i] > 0 ){
                table = table + <tr>
                                    <td className="ticket-table__row">Будни</td>
                                    <td className="ticket-table__row">Цена за билет на 10 проходов</td>
                                    <td className="ticket-table__row">1</td>
                                    <td className="ticket-table__row">100</td>
                                </tr>
            }
        }
    }
    buyTicket(){
        if(this.state.mail !== this.state.mailConfirm){
            this.setState({ mail_err: 'block' });
        }else{

        }
    }
  render() {
        return (
            <div onClick={this.menuClose} className="container">
                <h1 className="title">Покупка билета</h1>
                <div style = {{display: this.state.firstOfferDisplay}} className="offer__first">
                    <div>
                        <Menu menuSelect = {(id) => this.menuSelect(id,'day')}
                              menuBlockNames = {this.state.dayMenuBlockNames}
                              closeTab = {this.state.closeTab}
                              menuTitle = {'День недели'}/>
                        <Menu menuSelect = {(id) => this.menuSelect(id,'ticket')}
                              closeTab = {this.state.closeTab}
                              menuBlockNames = {this.state.ticketMenuBlockNames}
                              menuTitle = {'Тариф'}/>
                        <Counter changeTicket = {this.changeTicket}
                                 tickets = {this.state.tickets}
                                 counterTitle ={'Кол-во билетов'}/>
                        <Price priceText = {this.state.finalPrice} priceTitle = {'Цена билетов'}/>
                    </div>
                    <p className="hint-1">Цена за билет на 5 проходов 100р</p>
                    <p className="hint-1">Цена за билет на 10 проходов 200р</p>
                    <p className="hint-1">В выходные дни цена +50р</p>
                    <button onClick={this.openSecondOffer} className="buy-button">Купить</button>
                </div>
                <div style = {{display: this.state.secondOfferDisplay}} className="offer__second">
                    <button onClick={this.openFirstOffer} className="button">Назад</button>
                    <table className="ticket-table">
                        <tr>
                            <td className="ticket-table__row table-header">День недели</td>
                            <td className="ticket-table__row table-header">Тариф</td>
                            <td className="ticket-table__row table-header">Количество</td>
                            <td className="ticket-table__row table-header">Цена</td>
                        </tr>
                        <tr>
                            <td className="ticket-table__row">{this.state.dayMenuBlockNames[this.state.activeDay]}</td>
                            <td className="ticket-table__row">{this.state.ticketMenuBlockNames[this.state.activeTicket]}</td>
                            <td className="ticket-table__row">{this.state.tickets}</td>
                            <td className="ticket-table__row">{this.state.finalPrice} руб</td>
                        </tr>
                    </table>
                    <div>
                        <input onChange={(e) => this.inputChange(e,'mail')} type="email" className="offer__input" placeholder="введите e-mail"/>
                        <input onChange={(e) => this.inputChange(e,'phone')} type="tel" className="offer__input phone__input" placeholder="введите телефон"/>
                        <input onChange={(e) => this.inputChange(e,'mailConfirm')} type="email" className="offer__input" placeholder="подтвердите e-mail"/>
                    </div>
                    <p style = {{display: this.state.mail_err}} className="mail-err">Адреса электронной почты не совпадают</p>
                    <button onClick={this.buyTicket} className="buy-button">Оплатить</button>
                    <p className="hint-2">Обязательно распечатайте самостоятельно и предоставьте при входе полученный после оплаты билет (PDF).</p>
                </div>
            </div>
        );
  }
}

export default App;
