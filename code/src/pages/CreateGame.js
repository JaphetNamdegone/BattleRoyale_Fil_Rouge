import React, { Component } from "react";
import Menu from "../components/Menu";
import axios from "axios";
import CreateGameStore from "../observers/CreateGameStore";

export default class CreateGame extends Component {

  constructor(props) {
    super(props)

    this.form = React.createRef();
    this.playerCreateForTheGame = -1;

    this.state = {
      gameName: " ",
      playerNumbers: [1, 2, 3, 4],
      // properties: 'Publique', 'Privée'],
      maps: ['Verte', 'Blue', 'Rouge']
    }
  }

  onChange = (e) => {
    const formData = new FormData((this.form.current))
    CreateGameStore.setFormData(formData)

    this.currentGameName = CreateGameStore.createGameFormData.get('gameNameInput')
    this.currentPlayerNumber = CreateGameStore.createGameFormData.get('playerNumberSelect')
    // this.currentProperty = CreateGameStore.createGameFormData.get('propertySelect')
    this.currentMap = CreateGameStore.createGameFormData.get('mapSelect')

    // Enable or disable button of form validation
    this.formIsValid =
      this.currentGameName !== "" &&
      this.currentPlayerNumber !== 0 &&
      // this.currentProperty !== "" &&
      this.currentMap !== ""

    this.render()
  }

  onSubmit = (form) => {
    form.preventDefault()
    this.createGame()
  }

  createGame = () => {
    axios.post('http://salty-forest-02915.herokuapp.com/api/games', {
      owner: "/api/users/" + localStorage.getItem('userId'),  
      name: this.currentGameName,
      code: "N/A",
      round: 1,
      map: this.currentMap,
      date: "2021-01-29"
    }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      }).then(result => {
        if (result.status === 200 || result.status === 201) {
          
          // If game is create, create the player and join the game
          this.createPlayer(result.data.id)
          // if (err){
          //   alert("La partie n'a pu être créée, se renseigner dans la console")
          // }
          
        } 
        
      }).catch(e => {
        console.log(e)
        alert(e)
      });
  }

  createPlayer = (id) => {
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
          if (res.data.id !== -1){
            console.log("Creation du joueur réussie, récupération de son identifiant pour rejoindre la nouvelle partie");
            this.joinSaloon(id, res.data.id)
          }
        }
    }).catch(err => {
        console.log("Echec de la creation du joueur")
        console.log(err);
    })
  }

  joinSaloon(idGame, idPlayer){
    this.props.history.push('/saloon/game/' + idGame + "/player/" + idPlayer)
  }


  render = () => {

    // Enable or disable button of form validation
    this.buttonSubmit = document.getElementById("mySubmit")
    if (this.buttonSubmit && this.formIsValid) {
      this.buttonSubmit.disabled = false
    } else if (this.buttonSubmit && !this.formIsValid) {
      this.buttonSubmit.disabled = true
    }

    return <>
      <Menu />

      {/********************** DISPLAY PAGE **********************/}
      <div className="div-form">

        {/********************** TITLE **********************/}
        <h1 className="title-page">Créer une partie</h1>

        <form className="custom-form" ref={this.form} onChange={this.onChange} onSubmit={this.onSubmit}>
          {/********************** GAME NAME **********************/}
          <label className="custom-label">Nom de la partie</label>
          <input
            className="custom-input"
            type="text"
            name="gameNameInput"
          />

          {/********************** PLAYER NUMBER SELECTOR **********************/}
          {/* <label className="custom-label">Nombre de joueurs sur la carte</label>
          <select className="custom-dropdown" name="playerNumberSelect">
            {
              this.state.playerNumber.map((e, i) => <option key={i} value={e}>
                {e}
              </option>)
            }
          </select> */}


          {/********************** PROPERTY SELECTOR **********************/}
          {/* <label className="custom-label">Qui peut rejoindre la partie ?</label>
          <select className="custom-dropdown" name="propertySelect">
            {
              this.state.property.map((e, i) => <option key={i} value={e}>
                {e}
              </option>)
            }
          </select> */}

          {/********************** MAP SELECTOR **********************/}
          <label className="custom-label">Sélectionner la carte</label>
          <select className="custom-dropdown" name="mapSelect">
            {
              this.state.maps.map((e, i) => <option key={i} value={e}>
                {e}
              </option>)
            }
          </select>

          {/********************** CREATE GAME BUTTON **********************/}
          <input type="submit" id="mySubmit" className="custom-button" disabled={true} value="Créer le salon" />

        </form>

      </div>
    </>
  }
}