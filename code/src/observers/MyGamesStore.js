import { observable, computed, makeObservable, action } from 'mobx';

/**
 * Make the form of create game page an observable
 */
class MyGamesStore {

    formData = new FormData(undefined);
    constructor(){
        this.state = {
            resultGet: ""
        }
        makeObservable(this, {
            setFormData:action,
            loadData:action,

            formData: observable, 
            myGamesFormData: computed,
        })

    }

    setFormData = (data) => {
        this.formData = data;
    }    
    
    loadData = (data) => {
        this.state.resultGet = data;
    }
}

export default new MyGamesStore();