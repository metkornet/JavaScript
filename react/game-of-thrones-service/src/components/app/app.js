import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import './app.css';
import Error from '../error/';
import {HousesPage, BookPage, CharacterPage, BooksItem } from '../pages';
import {BrowserRouter as Router, Route } from 'react-router-dom';


export default class App extends Component{
    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    onToggle = () =>{
        this.setState((state)=>{
            return{
                showRandomChar: !state.showRandomChar
            }
        })
    };

    render(){
        if(this.state.error){
            return <Error/>
        }
        const char = this.state.showRandomChar ? <RandomChar interval = {1500}/> : null;
        return (
           <Router>
            <div className = "app"> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <button
                                className="toggle-btn"
                                onClick = {this.onToggle}
                            >
                                Toggle random character
                            </button>
                        </Col>
                    </Row>
                    <Route path = '/characters' component = {CharacterPage} />
                    <Route path = '/houses' component = {HousesPage} />
                    <Route path = '/books' exact component = {BookPage} />
                    <Route path = '/books/:id' render = {
                        ({match})=> {
                            const {id} = match.params;
                            return <BooksItem id = {id}/>
                        }
                    } />
                                     
           
                </Container>
            </div>
           </Router>
        );
    }
    
};

