import React, {Component} from 'react';
import GotService from '../../services/gotService';
import CharDetails, {Field} from '../charDetails';

export default class booksItem extends Component{
    gotService = new GotService();
   
    render(){
        return(
            <CharDetails 
            itemId = {this.props.id}
            getData = {this.gotService.getBook}
        >
            <Field field='numberOfPages' label='Number of pages'/>
            <Field field='publisher' label='Publisher'/>
            <Field field='released' label='Released'/>
        </CharDetails>
        )
        
    }
}