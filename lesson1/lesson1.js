// 1) Первую часть задания повторить по уроку
let numberOfFilms;



function start(){
    numberOfFilms = + prompt('Сколько фильмов вы уже посмотрели?', '');
    while (numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)){
        numberOfFilms = + prompt('Сколько фильмов вы уже посмотрели?', '');
    }
}
start();

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};


function rememberMyFilms(){
    for(let i=0; i<2;i++){
        const   a = prompt('Один из последних просмотренных фильмов?'),
                b = prompt('На сколько оцените его?');
        if(a !='' &&b != '' && a.length<50 && a !=null && b != null){
            personalMovieDB.movies[a]=b;
            continue;
        } 
        i--;    
    }
}

rememberMyFilms();



function detectPersonalLevel(){
    if(personalMovieDB.count<10){
        alert('Просмотрено довольно мало фильмов');
    } else if (personalMovieDB.count>=10 && personalMovieDB.count<=30){
        alert('Вы классический зритель');
    } else if (personalMovieDB.count>30){
        alert('Вы киноман');
    } else{
        alert('Произошла ошибка');
    }    
}
detectPersonalLevel();

// 2) Создать функцию showMyDB, которая будет проверять свойство privat. Если стоит в позиции
// false - выводит в консоль главный объект программы

function showMyDB(hidden){
    if(!hidden){
        console.log(personalMovieDB);
    } 
}


// 3) Создать функцию writeYourGenres в которой пользователь будет 3 раза отвечать на вопрос 
// "Ваш любимый жанр под номером ${номер по порядку}". Каждый ответ записывается в массив данных
// genres

function writeYourGenres(){
    for(let i=1; i<4; i++){
        // while (personalMovieDB.genres == '' || personalMovieDB.genres == null){
            personalMovieDB.genres[i - 1] = prompt(`Ваш любимый жанр под номером ${i}`, '');
        // }
    }
}

writeYourGenres();
showMyDB(personalMovieDB.privat);

// P.S. Функции вызывать не обязательно