document.addEventListener('DOMContentLoaded', () => {
    //Табы
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'), 
          tabsParent = document.querySelector('.tabheader__items');
    
    function hideTabContent (){
        tabsContent.forEach(item =>{
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item =>{
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i=0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    tabsParent.addEventListener('click', (event)=>{
        // event.preventDefault();
        const target = event.target;
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) =>{
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
    hideTabContent();
    showTabContent();

    //Таймер 

    const deadline = '2020-08-15';

    function getTimeRemaining (endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()), 
              days = Math.floor(t/(1000*60*60*24)), 
              hours = Math.floor((t/(1000*60*60)% 24)), 
              minutes = Math.floor((t/(1000*60)% 60)),
              seconds = Math.floor((t/(1000)% 60));
        
              return {
                'total' : t,
                'days' : days,
                'hours' : hours,
                'minutes' : minutes,
                'seconds' : seconds
              };
    }

    function getZero(num){
        if(num>=0 && num <10 ){
            return `0${num}`;
        } else{
            return num;
        }
    }

    function setClock(selector, endtime){

        const timer = document.querySelector(selector),
              days = document.querySelector('#days'),
              hours = document.querySelector('#hours'),
              minutes = document.querySelector('#minutes'), 
              seconds = document.querySelector('#seconds'),
              timeInterval = setInterval(appdateClock, 1000);

        appdateClock();
        function appdateClock(){
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <=0){
                clearInterval(timeInterval);
            }

        }

    }
    setClock('.timer', deadline);

    // Модальные окна

    const btnModal = document.querySelectorAll('[data-model]'),
          modalWindow = document.querySelector('.modal');


    function openModel(){
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal(){
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');
        document.body.style.overflow = '';
       
    }


    btnModal.forEach(btn =>{
        btn.addEventListener('click', openModel);
    });

    modalWindow.addEventListener('click', (event)=>{
        if(event.target === modalWindow || event.target.getAttribute('data-close') == ''){
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) =>{
        if (event.code === 'Escape' && modalWindow.classList.contains('show')){
            closeModal();
        }
    });

   //создание появления модального окна через определенное количество времени (15 секунд)

    const modalTimerId = setTimeout(openModel, 5000);

   // создание появления модального окна, когда пользователь долистал страницу до конца
    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
        openModel();
        window.removeEventListener('scroll', showModalByScroll);
        }
    }

   window.addEventListener('scroll', showModalByScroll);

   // создание классов для меню (карточки)
   
   class MenuCard{
       constructor(src, alt, title, descrip, price, parentSelector, ...classes){
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

        changeToUAH(){
            this.price = this.price*this.transfer;
        }

        render(){
            const element = document.createElement('div');
            if(this.classes.length===0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            }else{
                this.classes.forEach(className=> element.classList.add(className));
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

    const getResource = async url =>{
        const res = await fetch(url);
        if(!res.ok){
            throw new Error(`Couldn't fetch  ${url}, status ${res.status}`);
        }
        return await res.json();
    };

    // getResource('http://localhost:3000/menu')
    // .then(data =>{
    //     data.forEach(({img, altimg, title, descr, price}) =>{
    //         new MenuCard(img, altimg, title, descr, price,  ".menu .container").render();
    //     });
    // });

    axios.get('http://localhost:3000/menu')
    .then(data =>{
        data.data.forEach(({img, altimg, title, descr, price}) =>{
            new MenuCard(img, altimg, title, descr, price,  ".menu .container").render();
        });
    });
    

    // формы
    const forms = document.querySelectorAll('form');

    const message ={
        loading : 'img/form/spinner.svg',
        success : 'Успешно',
        failure : 'Что-то пошло не так..'
    };

    forms.forEach(item =>{
        bindPostData(item);
    });



    const postData = async (url, data) =>{
        const res = await fetch(url, {
            method: "POST",
            body: data,
            headers:{
                'Content-type':'application/json'
            } 
        });
        return await res.json();
    };

    function bindPostData(form){
        form.addEventListener('submit', (event)=>{
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

            postData('http://localhost:3000/requests', json)
            .then(data =>{
                console.log(data);
                showThanksDialog(message.success);
                statusMessage.remove();
            }).catch(()=>{
                showThanksDialog(message.failure);
            }).finally(()=>{
                form.reset();
            });
        });
    }

    function showThanksDialog(message){
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModel();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
                                <div class = "modal__content">
                                    <div  class = "modal__close" data-close>×</div>
                                    <div class = "modal__title">${message}</div>
                                </div>`;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(()=>{
            thanksModal.remove();
            prevModalDialog.classList.add('show'); 
            prevModalDialog.classList.remove('hide'); 
            closeModal();
        }, 4000);
    }

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
          slider = document.querySelector('.offer__slider'), 
          slidesWrapper = slider.querySelector('.offer__slider-wrapper'),
          slidesField = slidesWrapper.querySelector('.offer__slider-inner'),
          slides = slidesWrapper.querySelectorAll('.offer__slide'),
          prev = slider.querySelector('.offer__slider-prev'),
          next = slider.querySelector('.offer__slider-next'),
          current = slider.querySelector('#current'),
          total = slider.querySelector('#total'),
          width = window.getComputedStyle(slidesWrapper).width; 

    let slideIndex = 1;
    current.innerHTML = getZero(slideIndex);
    total.innerHTML = getZero(slides.length);
    let offset = 0;
    

    slidesField.style.width = 100*slides.length + '%';
    slidesWrapper.style.overflow = 'hidden';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slides.forEach(slides =>{
        slides.style.width = width;
    });

    slider.style.position = 'relative';
    const dots = document.createElement('ol'),
          dotsMassive = [];
    dots.classList.add('carousel-indicators');
    slider.append(dots);

    for(let i = 0; i<slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i+1);
        dot.classList.add('dot');
        if(i == 0){
            dot.classList.add('active_dot');
        }
        dots.append(dot);
        dotsMassive.push(dot);
    }

    next.addEventListener('click', ()=>{

        if(offset == Replace(width) * (slides.length - 1)){
            offset = 0;
            slideIndex = 1;
            
        } else{
            offset += Replace(width);
            slideIndex ++;

        }
        dotsMassive.forEach(slides=>slides.classList.remove('active_dot'));
        dotsMassive[slideIndex-1].classList.add('active_dot');
        slidesField.style.transform = `translateX(-${offset}px)`;
        current.innerHTML = getZero(slideIndex);
    });

    prev.addEventListener('click', ()=>{
        if(offset == 0){
            offset = Replace(width) * (slides.length - 1);
            slideIndex = slides.length;
        } else{
            offset -= Replace(width);
            slideIndex --;
        }
        dotsMassive.forEach(slides=>slides.classList.remove('active_dot'));
        dotsMassive[slideIndex-1].classList.add('active_dot');
        slidesField.style.transform = `translateX(-${offset}px)`;
        current.innerHTML = getZero(slideIndex);
    });

    dotsMassive.forEach(dot =>{
        dot.addEventListener('click', event =>{
            const slideTo = event.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = Replace(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            current.innerHTML = getZero(slideIndex);
            dotsMassive.forEach(slides=>slides.classList.remove('active_dot'));
            dotsMassive[slideIndex-1].classList.add('active_dot');

        });
    });

    function Replace(str){
        return  +str.replace(/\D/g, '');
    }
    


    //  Калькулятор 

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if(localStorage.getItem('sex')){
        sex = localStorage.getItem('sex'); 
    }else{
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio'); 
    }else{
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }
    
    function initLocalSettings(selector, activeClass){
        const elements = document.querySelectorAll(selector);
        elements.forEach(item =>{

            item.classList.remove(activeClass);
                if(item.getAttribute('id') === localStorage.getItem('sex')){
                    item.classList.add(activeClass);
                } 
            if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                item.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    
    function calcTotal(){
        if(!sex || !height || !weight || !age || !ratio){
            result.textContent = '____';
            return;
        }
        
        if(sex == 'female'){
            result.textContent = Math.round((447.6+(9.2*weight)+(3.1*height)-(4.3*age))*ratio);
        } else{
            result.textContent = Math.round((88.36+(13.4*weight)+(4.8*height)-(5.7*age))*ratio); 
        }
        console.log(sex, height, weight, age, ratio);
    }
    calcTotal();

    function getStaticInformation(selector, activeClass){
        const element = document.querySelectorAll(selector);

        element.forEach(item=>{
            item.addEventListener('click', (e)=>{
                if(e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else{
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                element.forEach(elem=>{
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDinamicInformatio(selector){
        const input = document.querySelector(selector);

        input.addEventListener('input', e=>{
            if(input.value.match(/\D/g)){
                input.style.border = '1px solid red';
            } else{
                input.style.border = 'none';
            }
            switch(input.getAttribute('id')){
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


});