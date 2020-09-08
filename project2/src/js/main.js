import './slider';
import modals from './modules/modal';
import tabs from './modules/tabs';
import forms from './modules/forms';
import timer from './modules/timer';
import images from './modules/images';
import moduleState from './modules/changeModuleState';


window.addEventListener('DOMContentLoaded', ()=>{
    let modalState = {
        form: 0
    };

    let deadline = '2020-09-09';
    moduleState(modalState);

    modals();
    tabs('.decoration_slider', '.no_click', '.decoration_content >div>div', 'after_click');
    tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active');
    tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');
    forms(modalState);
    
    timer('.container1', deadline);
    images();
});


