import { observable, computed, makeObservable, action } from 'mobx';

/**
 * Make the form of create game page an observable
 */
class CreateGameStore {

    formData = new FormData(undefined);
    constructor(){

        makeObservable(this, {
            setFormData:action,
            loadData:action,

            formData: observable, 
            createGameFormData: computed,
        })
    }
       
    get createGameFormData() {
        return this.formData;
    };

    setFormData = (data) => {
        this.formData = data;
    }    
    
    loadData = (data) => {
        this.state.resultGet = data;
    }   
}

export default new CreateGameStore();