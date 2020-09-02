import modal from './modules/modal';
import sliders from './modules/sliders';
import forms from './modules/forms';
import mask from './modules/mask';
import show from './modules/showMoreStyles';
import calc from './modules/calc';
import filter from './modules/filter';
import picturesSize from './modules/picturesSize';
import accordion from './modules/accordion';
import burger from './modules/burger';
import scrolling from './modules/scrolling';
import drop from './modules/drop';

window.addEventListener('DOMContentLoaded', ()=>{
    modal();
    sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
    sliders('.main-slider-item', 'vertical');
    forms();
    mask('[name = "phone"]');
    show('.button-styles', '#styles .row');
    calc('#size', '#material', '#options', '.promocode', '.calc-price');
    filter();
    picturesSize('.sizes-block');
    // accordion('.accordion-heading', '.accordion-block');
    accordion('.accordion-heading');
    burger('.burger-menu', '.burger');
    scrolling('.pageup');
    // drop(); 
});