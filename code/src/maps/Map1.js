import React from "react";
import { withRouter } from 'react-router-dom';
import Menu from "../components/Menu";
import axios from "axios";

class Map1 extends React.Component {

    constructor(props) {
        super(props);
        
        this.myMap = "";
        this.grid = [];
        
        this.state = {
            inputLinkClicked: false,
        }

        this.handleAddSecondInput = this.handleAddSecondInput.bind(this)           
        this.onFinish = this.onFinish.bind(this)
    }


    generateMap() {
        this.myMap = Array.from({ length: 100 }, () => ({}));
    }

    handleAddSecondInput() {

        this.setState({
            inputLinkClicked: true
        })  
    }



    setPosition(){}

    onFinish() {
        console.log(this.props)
        axios.patch('http://salty-forest-02915.herokuapp.com/api/games/' + this.props.match.params.gameId, {
            lastPlayer: '/api/players/' + this.props.match.params.playerId
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/merge-patch+json'
            }
        }).then(res => {
            if(res.status === 200) {
                axios.get('http://salty-forest-02915.herokuapp.com/api/current-player-game/' + this.props.match.params.gameId, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(res => {
                    if(res.status === 200) {
                        axios.get('http://salty-forest-02915.herokuapp.com/push/send-notification/' + res.data, {
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        }).then(res => {
                            if(res.status === 200) {
                                this.props.history.push('/currentGames')
                            }
                        }).catch(err => {
                            console.log(err);
                        })
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

        this.generateMap();

        return (
        <>
        <Menu/>
        <div className="div-form">
            <div className="map" onClick={this.handleAddSecondInput}>

                {this.myMap.map((item, index) => {
                    return (
                        <p className="custom-p" onClick={this.handleAddSecondInput}>{index}</p>
                    )
                    
                })}
            </div>
            <button className="custom-button" onClick={this.onFinish}>Finish turn</button>
        </div>
        </>
        )
    }
}
export default withRouter(Map1);