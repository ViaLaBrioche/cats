let store = window.localStorage; // инициализация локального хранилища

const homepage = document.getElementById('homepage')
console.log(homepage)

const refreshCatsAndContent = () => {

    const content = document.getElementsByClassName('content')[0]
    content.innerHTML = '';

    api.getAllCats().then((res) => {
        console.log(res);
        store.setItem('cats', JSON.stringify(res))
        const cards = res.reduce((acc, el) => (acc += generateCard(el)), '');
        content.insertAdjacentHTML('afterbegin', cards);
    });
};

refreshCatsAndContent()


const deleteCatFromLocalStorage = (catId) => {
	store.setItem(
		'cats',
		JSON.stringify(
			JSON.parse(store.getItem('cats')).filter((el) => el.id != catId) 
		)
	);
};

const addCatInLocalStorage = (cat) => {
	store.setItem(
		'cats',
		JSON.stringify([...JSON.parse(store.getItem('cats')), cat])
	);
};

const updateCatInLocalStorage = (catId) => {
	store.setItem(
		'cats',
		JSON.stringify(
			JSON.parse(store.getItem('cats')).filter((el) => el.id = catId) 
		)
	);
};

document.getElementsByClassName('content')[0]
    .addEventListener('click', (event) => {
        console.log(event.target);
        if (event.target.tagName === 'BUTTON') {
            switch (event.target.id) {
                case 'cat-card-view':
                    const modalView = document.querySelector('.view-modal') // находим модальное окно для просмотра котика
                    modalView.innerHTML = '' // очищаем модальное окно от предыдущего котика
                    modalView.classList.toggle('activeView') // делаем нашу модалку видимой

                        api.getCatById(event.target.value).then((res) => {  // получаем с сервера нашего котика
                            const cardInfo = catViewCard(res)  // передаем в карточку информацию о котике
                            modalView.insertAdjacentHTML('afterbegin', cardInfo); //добавялем в модальное окно кота
                        });

                break;
                case 'cat-card-update':
                    const updateModal = document.querySelector(".create-edit-modal-form") //Находим эл. модального окна (div)
                    updateModal.classList.toggle('active') // добавляем/убираем у модального окна класс active (видимость модального окна)
                    const modalForm = document.querySelector("form") //находим форму модалки
                    const inputId = document.querySelector('#inputId')
                    inputId.value = event.target.value // input id принимает значение id(id.cat) через кнопку "изменить"
                        modalForm.addEventListener('submit', (event) => { // добавляем обработчик события к нашей форме 
                            event.preventDefault(); // отключить перезагрузку браузера поумолчанию
                            const formData = new FormData(modalForm); // создание конструктора формы
                            const cat = Object.fromEntries(formData.entries()); //трансформация формы в объект
                            api.updateCat(cat).then((res) => {   //отправка формы на сервер 
                                updateCatInLocalStorage(event.target.value)
                                refreshCatsAndContent();   // обновление котиков
                            });
                            updateModal.classList.toggle('active');  // сброс модалки
                            document.forms[0].reset();   //сброс формы
                        });
                break;
                case 'cat-card-delete':
                    api.deleteCat(event.target.value)
                        .then((res) => {
                            console.log(res);
                            deleteCatFromLocalStorage(event.target.value)
                            refreshCatsAndContent()
                        });
            }
        }
    });

    const addCatBtn = document.querySelector('.create_cat_btn') // находим кнопку на добавление кота 
    addCatBtn.addEventListener('click', (event) => {     //  добавляем обработчик события на кнопку
    const addModal = document.querySelector(".create-edit-modal-form") //Находим эл. модального окна (div)
    addModal.classList.toggle('active') // добавляем/убираем у модального окна класс active (видимость модального окна)
    const modalForm = document.querySelector("form") //находим форму модалки
    const inputId = document.querySelector('#inputId')
    inputId.value = getRandomInt(50)// input id рандомное число
        modalForm.addEventListener('submit', (event) => { // добавляем обработчик события к нашей форме 
            event.preventDefault(); // отключить перезагрузку браузера поумолчанию
            const formData = new FormData(modalForm); // создание конструктора формы
            const cat = Object.fromEntries(formData.entries()); //трансформация формы в объект
            api.addCat(cat).then((res) => {   //отправка формы на сервер 
                addCatInLocalStorage(cat)
                refreshCatsAndContent();   // обновление котиков
            });
            addModal.classList.toggle('active');  // сброс модалки
            document.forms[0].reset();   //сброс формы
        });
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

