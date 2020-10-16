
'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против...",
            "Алиса"
        ]
    };

    const promoImgs = document.querySelectorAll('.promo__adv-img');
    const promoGenre = document.querySelector('.promo__genre');
    const promoBg = document.querySelector('.promo__bg');
    const promoInteractiveList = document.querySelector('.promo__interactive-list');
    const submitBtn = document.querySelector('.promo__interactive .add button');
    const addInput = document.querySelector('input.adding__input');
    const сheckbox = document.querySelector('[type=checkbox]');


    // удаляем рекламные блоки
    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    // некоторые изменения
    const makeChanges = () => {
        promoGenre.textContent = 'драма';
        promoBg.style.backgroundImage = `url('./img/bg.jpg')`;
    };

    //сортировка БД
    const sortArr = (arr) => {
        arr.forEach(item => item.toLowerCase());
        arr.sort();
    };

    //сформировать лист предпочтений из БД по алфавиту
    function createMovieList(films, parent) {
        parent.textContent = '';
        sortArr(films);

        for (let i = 0; i < films.length; i++) {
            parent.insertAdjacentHTML('beforeend', `
            <li class="promo__interactive-item">${i + 1} ${films[i]}
                <div class="delete"></div>
            </li>
            `);
        }

        //удаление при клике на корзину
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createMovieList(films, parent);
            });
        });

    }

    //при клике "Подвердить" новый фильм добавляется в список
    function addMovie(e) {
        e.preventDefault();

        let newFilm = addInput.value;

        const favourite = сheckbox.checked;

        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favourite) {
                console.log('Добавляем любимый фильм');
            }

            movieDB.movies.push(newFilm);
            createMovieList(movieDB.movies, promoInteractiveList);
        }

        addInput.value = '';
    }

    submitBtn.addEventListener('click', addMovie);

    deleteAdv(promoImgs);
    makeChanges();
    createMovieList(movieDB.movies, promoInteractiveList);
});