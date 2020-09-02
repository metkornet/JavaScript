import React, {Component} from 'react';
import './randomChar.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner/';
import Error from '../error';
import PropTypes from 'prop-types';

export default class RandomChar extends Component {
  
    gotService = new GotService();
    state = {
        char: {}, 
        loading: true, 
        error: false
    }

    static defaultProp = {
        interval: 1500
    }

    static propTypes = {
        interval: PropTypes.number
    }

    componentDidMount(){
        this.updateCharacter();
        this.timerId = setInterval(this.updateCharacter, this.props.interval);
    }

    componentWillUnmount(){
        clearInterval(this.timerId);
    }

    onError = ()=>{
        this.setState({
            error: true, 
            loading: false
        });
    }

    onCharLoaded = (char)=>{
        this.setState({char, loading: false});
    }

    updateCharacter= ()=>{
        const id = Math.floor(Math.random()*140+25);
        this.gotService.getCharacter(id)
        .then(this.onCharLoaded)
        .catch(this.onError);
    }

    render() {
        const {char,  loading, error} = this.state;
        const errorMessage = error ? <Error/> : null;
        const content = !loading && !errorMessage ? <View char = {char}/> : null;
        const spinner = loading ? <Spinner/> : null;
        return (
            <div className="random-block rounded">
                {spinner}
                {errorMessage}
                {content}
            </div>
        );
    }
}

const View = ({char})=>{
    const {name, gender, born, died, culture} = char;
    return(
        <>
        <h4>Random Character: {name}</h4>
        <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Gender </span>
                <span>{gender}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Born </span>
                <span>{born}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Died </span>
                <span>{died}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Culture </span>
                <span>{culture}</span>
            </li>
        </ul>
        </>
    )
}