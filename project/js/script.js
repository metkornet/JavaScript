import modal from './modules/modalViews';
import calc from './modules/calc';
import timer from './modules/timer';
import slider from './modules/slider';
import forms from './modules/forms';
import cards from './modules/cards';
import tabs from './modules/tabs';
import {
    openModel
} from './modules/modalViews';

document.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModel('.modal', modalTimerId), 5000);
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-model]', '.modal', modalTimerId);
    calc();
    timer('.timer', '2020-09-11');
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nexrArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCount:'#total' ,
        currentCount: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    forms('form', modalTimerId);
    cards();
});