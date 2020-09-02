import React, {Component} from 'react';
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails';
import Error from '../error';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';



export default class CharacterPage extends Component {
    gotService = new GotService();

    state = {
        selectedChar: null,
        error: false
    }

    onItemSelected = (id) =>{
        this.setState({
            selectedChar: id   
        })
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    render(){
        if(this.state.error){
            return <Error/>
        }
        const itemList = (
            <ItemList 
                onItemSelected = {this.onItemSelected} 
                getData = {this.gotService.getAllCharacters}
                renderItem = {({name, gender})=> `${name} (${gender})` } 
            />
        );
        const charDetails = (
            <CharDetails 
                itemId = {this.state.selectedChar}
                getData = {this.gotService.getCharacter}
            >
                <Field label='Gender' field = 'gender' />
                <Field label='Born' field = 'gender' />
                <Field label='Died' field = 'died' />
                <Field label='Culture' field = 'culture' />
            </CharDetails>);
        return(
            <RowBlock left = {itemList} right = {charDetails} />
        )
    }
}