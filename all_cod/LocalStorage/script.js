'use strict';

const checkbox = document.querySelector('#checkbox'), 
      form = document.querySelector('form'), 
      chande = document.querySelector('#color');


if(localStorage.getItem('isChecked')){
    checkbox.checked = true;
}
checkbox.addEventListener('change', ()=>{
    localStorage.setItem('isChecked', true);
});

if(localStorage.getItem('bg')==='changed'){
    form.style.backgroundColor = 'red';
}

chande.addEventListener('click', ()=>{
    if(localStorage.getItem('bg')==='changed'){
        localStorage.removeItem('bg');
        form.style.backgroundColor = '#fff';
    }else{
        localStorage.setItem('bg', 'changed');
        form.style.backgroundColor = 'red';
    }
});

const person ={
    name: 'Alex', 
    age: 25
};

const serializedPersone = JSON.stringify(person);

localStorage.setItem('Alex', serializedPersone);
