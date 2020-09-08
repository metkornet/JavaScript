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

export default modal;
export {
    openModel,
    closeModal
};