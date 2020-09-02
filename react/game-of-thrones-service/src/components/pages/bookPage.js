import React, {Component} from 'react';
import ItemList from '../itemList';
import {withRouter } from 'react-router-dom';
import GotService from '../../services/gotService';

class BookPage extends Component{
    gotService = new GotService();

  
    render(){
        return(
            <ItemList 
                onItemSelected = {(itemId)=>{
                    this.props.history.push(itemId)
                }} 
                getData = {this.gotService.getAllBooks}
                renderItem = {({name})=> name} 
            />
        )
    }
}

export default withRouter(BookPage)