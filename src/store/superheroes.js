import { action, computed, makeObservable, observable } from 'mobx';
import {v4 as uuidv4} from 'uuid';

class Superheroes {

    superheroes =[];

    constructor(){
        makeObservable(this, {
            superheroes: observable,
            addHero: action,
            deleteHero: action,
            count: computed
        })
    }

    addHero(hero){
        this.superheroes=[...this.superheroes, {...hero, id: uuidv4()}];
        // setHeroList(list=> [...list, {name, power, id: uuid()}])
    };

    deleteHero(id){
        this.superheroes= this.superheroes.filter(hero => hero.id !== id);
    };

    get count(){
        return this.superheroes.length;
    }
}

export const superheroStore=  new Superheroes();