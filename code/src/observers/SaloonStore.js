import { makeAutoObservable } from "mobx"

class SaloonStore {
    currentGame = {
            name: 'Partie 1',
            property: "Private",
            map: "Blue",
            players: [
                {
                avatar: "avatar.PNG",
                name: "Player 1"
                },{
                avatar: "avatar.PNG",
                name: "Player 2"
                }
            ]
        }
    ;
    formData = new FormData(undefined);

    constructor() {
        makeAutoObservable(this)
    }

    setFormData(data) {
        this.formData = data;
    }
}

export default new SaloonStore();