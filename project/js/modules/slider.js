import {
    getZero
} from './timer';

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
    current.innerHTML = getZero(slideIndex);
    total.innerHTML = getZero(slides.length);
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
        current.innerHTML = getZero(slideIndex);
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
        current.innerHTML = getZero(slideIndex);
    });

    dotsMassive.forEach(dot => {
        dot.addEventListener('click', event => {
            const slideTo = event.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = Replace(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            current.innerHTML = getZero(slideIndex);
            dotsMassive.forEach(slides => slides.classList.remove('active_dot'));
            dotsMassive[slideIndex - 1].classList.add('active_dot');

        });
    });

    function Replace(str) {
        return +str.replace(/\D/g, '');
    }
}

export default slider;