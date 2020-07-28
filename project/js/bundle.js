/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calc() {
    //  Калькулятор 

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(item => {

            item.classList.remove(activeClass);
            if (item.getAttribute('id') === localStorage.getItem('sex')) {
                item.classList.add(activeClass);
            }
            if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                item.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex == 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
        console.log(sex, height, weight, age, ratio);
    }
    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const element = document.querySelectorAll(selector);

        element.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                element.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDinamicInformatio(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', e => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });

    }

    getDinamicInformatio('#height');
    getDinamicInformatio('#weight');
    getDinamicInformatio('#age');
}
/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {

    // создание классов для меню (карточки)

    class MenuCard {
        constructor(src, alt, title, descrip, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descrip = descrip;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                     <img src=${this.src} alt=${this.alt}>
                     <h3 class="menu__item-subtitle">${this.title}</h3>
                     <div class="menu__item-descr">${this.descrip}</div>
                     <div class="menu__item-divider"></div>
                     <div class="menu__item-price">
                         <div class="menu__item-cost">Цена:</div>
                         <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                     </div>`;
            this.parent.append(element);
        }
    }

  

    Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getResource"])('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
            });
        });

    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({
    //             img,
    //             altimg,
    //             title,
    //             descr,
    //             price
    //         }) => {
    //             new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
    //         });
    //     });
}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modalViews__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modalViews */ "./js/modules/modalViews.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
    // формы
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Успешно',
        failure: 'Что-то пошло не так..'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display : block;
            margin : 0 auto;
        `;
            form.insertAdjacentElement('afterend', statusMessage);
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["postData"])('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksDialog(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksDialog(message.failure);
                }).finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksDialog(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        Object(_modalViews__WEBPACK_IMPORTED_MODULE_0__["openModel"])('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
                            <div class = "modal__content">
                                <div  class = "modal__close" data-close>×</div>
                                <div class = "modal__title">${message}</div>
                            </div>`;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            Object(_modalViews__WEBPACK_IMPORTED_MODULE_0__["closeModal"])('.modal');
        }, 4000);
    }
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modalViews.js":
/*!**********************************!*\
  !*** ./js/modules/modalViews.js ***!
  \**********************************/
/*! exports provided: default, openModel, closeModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openModel", function() { return openModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModal", function() { return closeModal; });
function openModel(modalSelector, modalTimerId) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if(modalTimerId){
        clearInterval(modalTimerId);
    }
    
}

function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // Модальные окна

    const btnModal = document.querySelectorAll(triggerSelector),
        modalWindow = document.querySelector(modalSelector);

    btnModal.forEach(btn => {
        btn.addEventListener('click', ()=>openModel(modalSelector, modalTimerId));
    });

    modalWindow.addEventListener('click', (event) => {
        if (event.target === modalWindow || event.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modalWindow.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });


    // создание появления модального окна, когда пользователь долистал страницу до конца
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModel(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ __webpack_exports__["default"] = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");


function slider({
    container,
    slide,
    nexrArrow,
    prevArrow,
    totalCount,
    currentCount,
    wrapper,
    field
}) {
    // слайдер

    // const slides = document.querySelectorAll('.offer__slide'),
    //       prev = document.querySelector('.offer__slider-prev'),
    //       next = document.querySelector('.offer__slider-next'),
    //       current = document.querySelector('#current'),
    //       total = document.querySelector('#total');

    // let slideIndex = 1;
    // total.innerHTML = getZero(slides.length);
    // showSlides(1);

    // function showSlides(n){
    //     if(n>slides.length){    
    //         slideIndex = 1;
    //     }
    //     if(n<1){
    //         slideIndex = slides.length;
    //     }
    //     current.innerHTML = getZero(slideIndex);


    //     slides.forEach(item =>{
    //         item.classList.add('hide');
    //         item.classList.remove('show');
    //     });
    //     slides[slideIndex-1].classList.remove('hide');
    //     slides[slideIndex-1].classList.add('show');
    // }

    // function plusSlides(n){
    //     showSlides(slideIndex+=n);

    // }

    // prev.addEventListener('click', (event)=>{
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', (event)=>{
    //     plusSlides(1);
    // });

    // слайдер вариант 2

    const
        slider = document.querySelector(container),
        slidesWrapper = slider.querySelector(wrapper),
        slidesField = slidesWrapper.querySelector(field),
        slides = slidesWrapper.querySelectorAll(slide),
        prev = slider.querySelector(prevArrow),
        next = slider.querySelector(nexrArrow),
        current = slider.querySelector(currentCount),
        total = slider.querySelector(totalCount),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    current.innerHTML = Object(_timer__WEBPACK_IMPORTED_MODULE_0__["getZero"])(slideIndex);
    total.innerHTML = Object(_timer__WEBPACK_IMPORTED_MODULE_0__["getZero"])(slides.length);
    let offset = 0;


    slidesField.style.width = 100 * slides.length + '%';
    slidesWrapper.style.overflow = 'hidden';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slides.forEach(slides => {
        slides.style.width = width;
    });

    slider.style.position = 'relative';
    const dots = document.createElement('ol'),
        dotsMassive = [];
    dots.classList.add('carousel-indicators');
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.classList.add('active_dot');
        }
        dots.append(dot);
        dotsMassive.push(dot);
    }

    next.addEventListener('click', () => {

        if (offset == Replace(width) * (slides.length - 1)) {
            offset = 0;
            slideIndex = 1;

        } else {
            offset += Replace(width);
            slideIndex++;

        }
        dotsMassive.forEach(slides => slides.classList.remove('active_dot'));
        dotsMassive[slideIndex - 1].classList.add('active_dot');
        slidesField.style.transform = `translateX(-${offset}px)`;
        current.innerHTML = Object(_timer__WEBPACK_IMPORTED_MODULE_0__["getZero"])(slideIndex);
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = Replace(width) * (slides.length - 1);
            slideIndex = slides.length;
        } else {
            offset -= Replace(width);
            slideIndex--;
        }
        dotsMassive.forEach(slides => slides.classList.remove('active_dot'));
        dotsMassive[slideIndex - 1].classList.add('active_dot');
        slidesField.style.transform = `translateX(-${offset}px)`;
        current.innerHTML = Object(_timer__WEBPACK_IMPORTED_MODULE_0__["getZero"])(slideIndex);
    });

    dotsMassive.forEach(dot => {
        dot.addEventListener('click', event => {
            const slideTo = event.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = Replace(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            current.innerHTML = Object(_timer__WEBPACK_IMPORTED_MODULE_0__["getZero"])(slideIndex);
            dotsMassive.forEach(slides => slides.classList.remove('active_dot'));
            dotsMassive[slideIndex - 1].classList.add('active_dot');

        });
    });

    function Replace(str) {
        return +str.replace(/\D/g, '');
    }
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    //Табы
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);



/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! exports provided: default, getZero */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getZero", function() { return getZero; });
function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}


function timer(id, deadline) {
    //Таймер 
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / (1000 * 60) % 60)),
            seconds = Math.floor((t / (1000) % 60));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    
    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            timeInterval = setInterval(appdateClock, 1000);

        appdateClock();

        function appdateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }

        }

    }
    setClock(id, deadline);
}

/* harmony default export */ __webpack_exports__["default"] = (timer);


/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_modalViews__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/modalViews */ "./js/modules/modalViews.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");









document.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => Object(_modules_modalViews__WEBPACK_IMPORTED_MODULE_0__["openModel"])('.modal', modalTimerId), 5000);
    Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_6__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    Object(_modules_modalViews__WEBPACK_IMPORTED_MODULE_0__["default"])('[data-model]', '.modal', modalTimerId);
    Object(_modules_calc__WEBPACK_IMPORTED_MODULE_1__["default"])();
    Object(_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2020-09-11');
    Object(_modules_slider__WEBPACK_IMPORTED_MODULE_3__["default"])({
        container: '.offer__slider',
        slide: '.offer__slide',
        nexrArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCount:'#total' ,
        currentCount: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    Object(_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerId);
    Object(_modules_cards__WEBPACK_IMPORTED_MODULE_5__["default"])();
});

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! exports provided: postData, getResource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postData", function() { return postData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResource", function() { return getResource; });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        body: data,
        headers: {
            'Content-type': 'application/json'
        }
    });
    return await res.json();
};

async function getResource(url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Couldn't fetch  ${url}, status ${res.status}`);
    }
    return await res.json();
}



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map