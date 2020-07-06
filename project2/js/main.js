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
          btnlWindowClose = document.querySelector('[data-close]'),
          modalWindow = document.querySelector('.modal');

    btnModal.forEach(btn =>{
        btn.addEventListener('click', (event)=>{
            modalWindow.classList.toggle('show');
            // modalWindow.classList.add('show');
            // modalWindow.classList.remove('hide');
            document.body.style.overflow = 'hidden';
        });
    });
    
    function closeModal(){
        modalWindow.classList.toggle('show');
        // modalWindow.classList.add('hide');
        // modalWindow.classList.remove('show');
        document.body.style.overflow = '';
    }

    btnlWindowClose.addEventListener('click', closeModal);

    modalWindow.addEventListener('click', (event)=>{
        if(event.target === modalWindow){
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) =>{
        if (event.code === 'Escape' && modalWindow.classList.contains('show')){
            closeModal();
        }
        
    });

   
});