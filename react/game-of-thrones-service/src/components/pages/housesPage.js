import React, {Component} from 'react';
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails';
import Error from '../error';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class HousesPage extends Component{
    gotService = new GotService();

    state = {
        selectedHouse: null,
        error: false
    }

    onItemSelected = (id) =>{
        this.setState({
            selectedHouse: id   
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
                getData = {this.gotService.getAllHouses}
                renderItem = {({name})=> name} 
            />
        );
        const charDetails = (
            <CharDetails 
                itemId = {this.state.selectedHouse}
                getData = {this.gotService.getHouse}
            >
                <Field label='Region' field = 'region' />
                <Field label='Words' field = 'words' />
                <Field label='Titles' field = 'titles' />
                <Field label='AncestralWeapons' field = 'ancestralWeapons' />
            </CharDetails>);
        return(
            <RowBlock left = {itemList} right = {charDetails} />
        )
    }
}