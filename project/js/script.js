'use strict';

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
      moviesList = document.querySelector('.promo__interactive-list');

// 1) Удалить все рекламные блоки со страницы (правая часть сайта)
ad.forEach(item =>{
    item.remove();
});

// 2) Изменить жанр фильма, поменять "комедия" на "драма"

genre.textContent = 'драма';

// 3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img. Реализовать только при помощи JS

poster.style.backgroundImage = 'url(img/bg.jpg)';

// 4) Список фильмов на странице сформировать на основании данных из этого JS файла. Отсортировать их по алфавиту 
// 5) Добавить нумерацию выведенных фильмов 

movieDB.movies.sort();

moviesList.innerHTML = '';

movieDB.movies.forEach((item, i)=>{
    moviesList.innerHTML += `<li class="promo__interactive-item">${i + 1}. ${item}
                                <div class="delete"></div>
                            </li>`;
});
