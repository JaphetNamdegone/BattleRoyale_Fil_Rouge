import React, { Component } from "react";
import Menu from "../components/Menu";
import axios from "axios";
import { withRouter } from "react-router-dom";

class SearchGame extends Component {

    constructor(props) {
        super(props);

        this.form = React.createRef();

        this.state = {
            // nameCreatedGame: [],
            mapCreatedGame: [],
            // properties: ['Publique', 'Privée'],
            maps: ['Toutes', 'Verte', 'Bleu', 'Rouge'],
            searchName: '',
            currentMapChange: ''
        }

        this.onMapChange = this.onMapChange.bind(this);
    }

    onMapChange = (e) => {
        if(this.statcurrentMapChange === 'Toutes') {
            this.setState({
                currentMapChange: ''
            })
            return 
        }
        this.setState({
            currentMapChange: e.target.value
        })
      }

      onNameChange = (e) => {
        this.setState({
            searchName: e.target.value
        })
      }

    filterGame = (e) => {
        e.preventDefault()

        if(this.state.currentMapChange || this.state.searchName) {
            this.setState({
                mapCreatedGame: []
            })
            axios.get('http://salty-forest-02915.herokuapp.com/api/games?name[]=' + this.state.searchName + '&map[]=' + this.state.currentMapChange, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                if(res.status === 200) {
                    res.data['hydra:member'].map((item) => {
                        axios.get('http://salty-forest-02915.herokuapp.com/api/players/?game=/api/games/' + item.id +'&user=/api/users/' + localStorage.getItem('userId'), {
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        }).then((res) => {
                            if(res.data['hydra:totalItems'] === 0) {
                                const games = this.state.mapCreatedGame;
                                games.push(item)
                                this.setState({
                                    mapCreatedGame: games
                                });
                            }
                        })
                        return '';
                    });
                }
            }).catch(err => {
                alert(err);
            })
        } else {
            this.componentDidMount()
        }

    }

    joinGame = (id) => {
        axios.post('http://salty-forest-02915.herokuapp.com/api/players', {
            round: 1,
            life: 3,
            game: '/api/games/' + id,
            user: '/api/users/' + localStorage.getItem('userId')
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            if(res.status === 201) {
                this.props.history.push('/saloon/game/' + id + '/player/' + res.data.id);
            }
        }).catch(err => {
            alert(err);
        })
    }

    componentDidMount = () => {
        axios.get('http://salty-forest-02915.herokuapp.com/api/games', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            if(res.status === 200) {
                res.data['hydra:member'].map((item) => {
                    axios.get('http://salty-forest-02915.herokuapp.com/api/players/?game=/api/games/' + item.id +'&user=/api/users/' + localStorage.getItem('userId'), {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then((res) => {
                        if(res.data['hydra:totalItems'] === 0) {
                            const games = this.state.mapCreatedGame;
                            games.push(item)
                            this.setState({
                                mapCreatedGame: games
                            });
                        }
                    })
                    return '';
                });
            }
        }).catch(err => {
            alert(err);
        })
    }

    render = () => {
        return (
            <>
                <Menu />
                <div className="searchGames">
                    <div className="main">
                        <div className="title-page">Rechercher une partie</div>
    
                        {/********************** REASEARCH FORM **********************/}
                        <form    ref={this.form} onSubmit={this.filterGame}>
    
                            <label className="custom-label">Rerchercher par nom</label>
                            <input
                                type="search"
                                placeholder="Rechercher par nom"
                                name="search"
                                className="custom-input"
                                onChange={this.onNameChange}
                                value={this.state.searchName}
                            />
    
                            <label className="custom-label">Rechercher par carte</label>
                            <select className="custom-dropdown" name="mapSelect" onChange={this.onMapChange}>
                                {
                                    this.state.maps.map((e, i) => <option key={i} value={e}>
                                        {e}
                                    </option>)
                                }
                            </select>
    
                            {/* <label className="custom-label">Rechercher par propriété</label>
                            <select className="custom-dropdown" name="propertySelect">
                                {
                                    this.state.properties.map((e, i) => <option key={i} value={e}>
                                        {e}
                                    </option>)
                                }
                            </select> */}

                            <input type="submit" id="mySubmit" className="custom-button" value="Rechercher" />
                        </form>
    
                        {/********************** RESULT TAB **********************/}
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Carte</th>
                                    <th>Action</th>
                                    <th></th>
    
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.mapCreatedGame.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.map}</td>
                                            <td>
                                                <button className="custom-button" onClick={() => this.joinGame(item.id)}>Rejoindre</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
    
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(SearchGame);