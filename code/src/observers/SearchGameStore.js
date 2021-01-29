import { makeAutoObservable } from "mobx"

class SearchGameStore {
    games = [];
    formData = new FormData(undefined);
    resultGet= "";

    constructor() {
        makeAutoObservable(this)
    }

    setFormData(data) {
        this.formData = data;
    }

}

export default new SearchGameStore();