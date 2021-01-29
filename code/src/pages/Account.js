import React from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import Menu from "../components/Menu";
import { withRouter } from 'react-router'

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pseudo: '',
            email: '',
            password: '',
            alert: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
    }

    componentDidMount() {
        axios.get('http://salty-forest-02915.herokuapp.com/api/users/' + localStorage.getItem('userId'), {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({
                email: res.data.email,
                pseudo: res.data.pseudo ? res.data.pseudo : ''
            });
        }).catch(err => {
            alert(err);
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit() {
        if(this.state.password) {
            axios.put('http://salty-forest-02915.herokuapp.com/api/update-password/' + localStorage.getItem('userId'), {
                password: this.state.password,
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                if(res.status === 200) {

                }
            }).catch(err => {
                alert(err);
            })
        }

        axios.put('http://salty-forest-02915.herokuapp.com/api/users/' + localStorage.getItem('userId'), {
            email: this.state.email,
            pseudo: this.state.pseudo,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            if(res.status === 200) {
                this.setState({alert: 'Les modifications ont été enregistrées.'})
            }
        }).catch(err => {
            alert(err);
        })
    }

    handleDeleteAccount() {
        axios.delete('http://salty-forest-02915.herokuapp.com/api/users/' + localStorage.getItem('userId'), {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            if(res.status === 204) {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                this.props.history.push('/login');
            }
        }).catch(err => {
            alert(err);
        })
    }

    render() {
        return <>
            <Menu />
            <div className="main">
                <div className="title-page">Compte</div>
                {this.state.alert &&
                <div className="alert">{this.state.alert}</div>
                }

                <form className="custom-form">

                    <label className="custom-label">Pseudo</label>
                    <input
                        type="text"
                        value={this.state.pseudo}
                        onChange={this.handleInputChange}
                        placeholder="Pseudo"
                        name="pseudo"
                        className="custom-input"
                    />

                    <label className="custom-label">Changer adresse email</label>
                    <input
                        type="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        placeholder="Email"
                        name="email"
                        className="custom-input"
                    />

                    <label className="custom-label">Changer le mot de passe</label>
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        placeholder="Mot de passe"
                        name="password"
                        className="custom-input"
                    />
                </form>
                <button className="custom-button" onClick={this.handleSubmit}>Sauvegarder</button>

                <Popup
                    trigger={<button className="custom-button">Supprimer le compte</button>}
                    modal
                    nested
                >
                    {(close) => (
                        <>
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                            <div className="content">
                                <button className="custom-button" onClick={this.handleDeleteAccount}>Confirmer la suppression du compte</button>
                                <button className="custom-button" onClick={close}>Annuler</button>
                            </div>
                        </>
                    )}
                </Popup>

            </div>
        </>;
    }
}

export default withRouter(Account);