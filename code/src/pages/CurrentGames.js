import React from "react";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import Menu from "../components/Menu";
import axios from "axios";

class CurrentGames extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: []
        }
    }

    componentDidMount() {
        axios.get('http://salty-forest-02915.herokuapp.com/api/games?players.user=/api/users/' + localStorage.getItem('userId'), {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            if(res.status === 200) {
                this.setState({games: res.data['hydra:member']});
            }
        }).catch(err => {
            console.log(err);
        })
    }

    leaveGame(index, gameId, close) {
        axios.get('http://salty-forest-02915.herokuapp.com/api/player-from-game/' + gameId, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            if(res.status === 200) {
                axios.delete('http://salty-forest-02915.herokuapp.com/api/players/' + res.data, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(res => {
                    if(res.status === 204) {
                        const newList = this.state.games;
                        newList.splice(index, 1);
                        this.setState({ games: newList });
                        close();
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <>
                <Menu />
                <div className="createGames">
                    <div className="main">
                        <div className="title-page">Vos parties en cours</div>
                        <table>
                            <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Statut</th>
                                <th>Nombre de tours</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.games.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.status}</td>
                                        <td>{item.round}</td>
                                        <td className="exit-btn">
                                            <Popup
                                                trigger={<FontAwesomeIcon icon={faSignOutAlt} />}
                                                modal
                                                nested
                                            >
                                                {close => (
                                                    <>
                                                        <button className="close" onClick={close}>
                                                            &times;
                                                        </button>
                                                        <div className="content">
                                                            <button className="custom-button" onClick={this.leaveGame.bind(this, index, item.id, close)}>Êtes-vous sûr de vouloir quitter la partie ?</button>
                                                            <button className="custom-button" onClick={close}>Annuler</button>
                                                        </div>
                                                    </>
                                                )}
                                            </Popup>
                                        </td>
                                    </tr>
                                )})}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
}

export default CurrentGames;