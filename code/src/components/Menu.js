import React from "react";
import Logout from "./Logout";
import { slide as Burger } from 'react-burger-menu'

class Menu extends React.Component {

    styles = {
        bmBurgerButton: {
            position: 'fixed',
            width: '36px',
            height: '30px',
            left: '36px',
            top: '36px'
        },
        bmBurgerBars: {
            background: '#FFF'
        },
        bmBurgerBarsHover: {
            background: '#a90000'
        },
        bmCrossButton: {
            height: '24px',
            width: '24px'
        },
        bmCross: {
            background: '#FFF'
        },
        bmMenuWrap: {
            position: 'fixed',
            height: '100%'
        },
        bmMenu: {
            background: '#373a47',
            padding: '2.5em 1.5em 0',
            fontSize: '1.15em'
        },
        bmMorphShape: {
            fill: '#373a47'
        },
        bmItemList: {
            color: '#b8b7ad',
            padding: '0.8em'
        },
        bmOverlay: {
            background: 'rgba(0, 0, 0, 0.3)'
        }
    }

    render() {
        const token = localStorage.getItem('token');
        return (
            // <Navbar.Brand href={token ? '/searchGame' : 'login'}>Battle Royal</Navbar.Brand>
            <Burger styles={this.styles}>
                {!token ? <a className="menu-btn" href="/login">Connexion</a> : ''}
                {!token ? <a className="menu-btn" href="/signup">Inscription</a> : ''}
                {token ? <a className="menu-btn" href="/createGame">Créer une partie</a> : ''}
                {token ? <a className="menu-btn" href="/searchGame">Rechercher une partie</a> : ''}
                {token ? <a className="menu-btn" href="/currentGames">Parties en cours</a> : ''}
                {token ? <a className="menu-btn" href="/account">Mon compte</a> : ''}
                {token ? <Logout></Logout> : ""}
            </Burger>
        )
    }
}

export default Menu;