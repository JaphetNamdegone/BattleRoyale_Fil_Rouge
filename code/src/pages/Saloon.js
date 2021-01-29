import React, { useRef } from "react";
import { observer } from "mobx-react-lite";
import Menu from "../components/Menu";
import { useHistory, useParams } from "react-router-dom";

const Saloon = observer(({ store }) => {

    const form = useRef(null);
    const history = useHistory();
    const params = useParams();

    const onChange = (e) => {
        const formData = new FormData(form.current);
        store.setFormData(formData);
    }

    const accessGame = () => {
        history.push('/map/game/' + params.gameId + '/player/' + params.playerId);
    }

    return (
        <>
            <Menu />
            <div onChange={onChange} ref={form}>
                <div className="main">
                    <header className="custom-header"></header>
                    {/********************** PRESENTATION GAME **********************/}
                    <div>
                        <p className="custom-p"> Nom de la partie : {store.currentGame.name}</p>
                        <p className="custom-p">Propriété : {store.currentGame.property}</p>
                        <p className="custom-p"> Carte : {store.currentGame.map}</p>
                    </div>

                    {/********************** SALOON TAB **********************/}
                    <table className="custom-table">

                        <thead>
                            <tr>
                                <th></th>
                                <th>Pseudo</th>
                            </tr>
                        </thead>

                        <tbody>
                             {store.currentGame.players.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td value={item.avatar}>{item.avatar}</td>
                                        <td value={item.name}>{item.name}</td>
                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>
                    {/*<button className="custom-button">Copier l'invitation</button>*/}
                    <button className="custom-button" onClick={accessGame}>Accéder à la partie</button>

                </div>
            </div>
        </>
    )
});

export default Saloon;