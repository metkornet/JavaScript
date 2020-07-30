import checkNumInputs from './checkNumInputs';
import {closeModal} from './modal';

const forms = (state)=>{
    const form = document.querySelectorAll('form'), 
          input = document.querySelectorAll('input');

    const message ={
        loading : 'Загрузка', 
        success : 'Спасибо, мы скоро с вами свяжемся', 
        failure : 'Что-то пошло не так'
    };

    checkNumInputs('input[name="user_phone"]');

    const postData = async (url, data)=>{
        document.querySelector('.status').textContent=message.loading;
        let res = await fetch(url, {
            method: 'POST', 
            body: data
        });
        return await res.text();
    };

    const clearInputs = ()=>{
        input.forEach(item =>{
            item.value = '';
        });
    };

    form.forEach(item =>{
        item.addEventListener('submit', (e)=>{
            e.preventDefault();

            let statusMesage = document.createElement('div');
            statusMesage.classList.add('status');
            item.appendChild(statusMesage);

            const formData = new FormData(item);
            if(item.getAttribute('data-calc')==='end'){
                for(let key in state){
                    formData.append(key, state[key]);
                }

            }

            postData('./assets/server.php', formData)
            .then(res =>{
                console.log(res);
                statusMesage.textContent = message.success;
            }
            ).catch(()=>{
                statusMesage.textContent = message.failure;
            }
            ).finally(()=>{
                clearInputs();
                setTimeout(()=>{
                    statusMesage.remove();
                    closeModal('body >[class^="popup"]', 1000);
                }, 2000);
            });
        });
    });
};

export default forms;