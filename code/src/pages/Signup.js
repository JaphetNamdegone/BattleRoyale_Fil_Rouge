import React from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import Menu from "../components/Menu";
import { withRouter } from 'react-router-dom';

class Signup extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            isError: false,
        }
            
        this.email = '';
        this.password = '';
        this.pseudo = '';

        this.handleInputChange = this.handleInputChange.bind(this);
        this.postSignUp = this.postSignUp.bind(this);

    }

    postSignUp(e) {
        e.preventDefault()
    

        if(!this.state.email || !this.state.password){
            this.err = 'Vous n\'avez pas remplis tous les champs'
            alert(this.err);
            return;  
        }

        axios.post("http://salty-forest-02915.herokuapp.com/api/sign-up", {
            email: this.state.email,
            password: this.state.password,
            pseudo: this.state.pseudo
        }).then(result => {
            if (result.status === 200) {
                this.props.history.push("/login");
            } else {
                this.setState({isError: true})
            }
        }).catch(e => {
            this.setState({isError: true})
        });

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render(){
        return (
            <>
                <Menu />
                <div className="div-form">
                    <h1 className="title-page">Inscription</h1>
                    <form className="custom-form" onSubmit={this.postSignUp}>
    
                    <label className="custom-label">Adresse email</label>
                        <input
                            className="custom-input"
                            type = "email"
                            name = "email"
                            value = {this.state.email}
                            onChange = {this.handleInputChange}
                            placeholder = "Email"
                        />
    
                        <label className="custom-label">Mot de passe </label>
                        <input
                            className="custom-input"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            placeholder="Mot de passe"
                        />

                        <label className="custom-label">Pseudo </label>
                        <input
                            className="custom-input"
                            type="text"
                            name="pseudo"
                            value={this.state.pseudo}
                            onChange={this.handleInputChange}
                            placeholder="Pseudonyme"
                        />
                        <button className="custom-button">Sign Up</button>
                    
                    </form>
                    
                    <Link to="/login">Déjà un compte ?</Link>
                    { this.state.isError ? 'Erreur lors de la création de l\'utilisateur' : ''}
                </div>
                </>
            );
    }
    
}

export default withRouter(Signup);