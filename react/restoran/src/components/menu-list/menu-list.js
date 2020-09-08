import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';
import './menu-list.scss';
import {menuLoaded, menuRequested}  from '../../actions';
import Spinner from '../spinner'

class MenuList extends Component {
    componentDidMount(){
        this.props.menuRequested();
        const {RestoService} = this.props;
        RestoService.getMenuItems()
        .then(res => this.props.menuLoaded(res))
        .catch();
    }

    render() {
        const {menuItems, loading} = this.props;

        if(loading){
            return <Spinner/>
        }
        return (
            <ul className="menu__list">
                {
                menuItems.map((item)=>{
                    return <MenuListItem menuItem = {item} key={item.id} />;
                })
                }
            </ul>
        )
    }
};

const mapStateToProps = (state) =>{
    return {
        menuItems: state.menu,
        loading: state.loading
    }
}

const mapDispatchToProps = {
    menuLoaded,
    menuRequested
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));