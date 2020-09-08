const tabs = (headerSelector, tabSelector, contentSelector, activeClass, dispaly='block')=>{

    const header = document.querySelector(headerSelector), 
          content = document.querySelectorAll(contentSelector), 
          tab = document.querySelectorAll(tabSelector);

    function hideTabs(){
        content.forEach(item=>{
            item.style.display = 'none';
        });

        tab.forEach(item=>{
            item.classList.remove(activeClass);
        });

    }

    function showTab(i = 0){
        content[i].style.display = dispaly;
        tab[i].classList.add(activeClass);
    }
    hideTabs();
    showTab();

    header.addEventListener('click', (e)=>{
        const target = e.target;
        if(target && (target.classList.contains(tabSelector.replace(/\./, ''))||
        target.parentNode.classList.contains(tabSelector.replace(/\./, '')))){
            tab.forEach((item,i) =>{
                if(item == target || target.parentNode == item){
                    hideTabs();
                    showTab(i);
                }
            });
        }
    });




};

export default tabs;

