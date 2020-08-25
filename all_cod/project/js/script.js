'use strict';

document.addEventListener('DOMContentLoaded', () =>{
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const ad = document.querySelectorAll('.promo__adv img'), 
          poster = document.querySelector(".promo__bg"),
          genre = poster.querySelector(".promo__genre"),
          moviesList = document.querySelector('.promo__interactive-list'),
          form = document.querySelector('.add'),  
          movieInput = form.querySelector('input'), 
          checkBox = form.querySelector('[type="checkbox"]');
        
    form.addEventListener('submit', (event) =>{
        event.preventDefault(true); // отменяет стандартное поведение браузера ( не дает перезагружаться браузеру)
        let newFilm = movieInput.value.toUpperCase();
        if(newFilm){
            if(newFilm.length>21){
                newFilm = `${newFilm.substring(0, 22)}...`;
            }
            movieDB.movies.push(newFilm);
            // makeSort(movieDB.movies); 
            movieAdd(movieDB.movies, moviesList);
            if(checkBox.checked){
                console.log("Добавляем любимый фильм");
            }
            form.reset();
        }
    });
    
    const deleteAdd = (arr) =>{
        arr.forEach(item =>{
            item.remove();
        });
    };

    const makeChanges = () =>{
        genre.textContent = 'драма';
        poster.style.backgroundImage = 'url(img/bg.jpg)';
    };
    
    const makeSort = (arr) =>{
        arr.sort();
    };

    function movieAdd(films, parent){
        parent.innerHTML = ''; 
        makeSort(films);
        films.forEach((item, i)=>{
            parent.innerHTML += `<li class="promo__interactive-item">${i + 1}. ${item}
                                    <div class="delete"></div>
                                </li>`;
        });

        document.querySelectorAll('.delete').forEach((btn, i)=>{
            btn.addEventListener('click', () =>{
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                movieAdd(films, parent); 
            });
        });
    }
    movieAdd(movieDB.movies, moviesList);
    deleteAdd(ad);
    makeChanges();
});

// 1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
// новый фильм добавляется в список. Страница не должна перезагружаться.
// Новый фильм должен добавляться в movieDB.movies.
// Для получения доступа к значению input - обращаемся к нему как input.value;
// P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

// 2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

// 3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

// 4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
// "Добавляем любимый фильм"

// 5) Фильмы должны быть отсортированы по алфавиту 