// const acordion = (triggersSelector, itemsSelector) =>{
const acordion = (triggersSelector) =>{
    const btns = document.querySelectorAll(triggersSelector);
        // blocks = document.querySelectorAll(itemsSelector);

    // аккордион с помощью JS-анимации

    btns.forEach(btn =>{
        btn.addEventListener('click', function(){
            btns.forEach(btn=>{
                btn.classList.remove('active-style');
                btn.nextElementSibling.classList.remove('active-content');
                btn.nextElementSibling.style.maxHeight = "0px";

            })
            this.classList.toggle('active-style');
            this.nextElementSibling.classList.toggle('active-content');

            if(this.classList.contains('active-style')){
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight+80+"px";
            } else {
                this.nextElementSibling.style.maxHeight = "0px";
            }
        })
    });

    // аккордион с помощью css классов
    // blocks.forEach(block =>{
    //     block.classList.add('animated', 'fadeInDown');
    // });

    // btns.forEach(btn =>{
    //     btn.addEventListener('click', function(){
    //         if(!this.classList.contains('active')){
    //             btns.forEach(btn =>{
    //                 btn.classList.remove('active', 'active-style');
    //             });
    //             this.classList.add('active', 'active-style');
    //         }
    //     });
        
    // });


}

export default acordion;