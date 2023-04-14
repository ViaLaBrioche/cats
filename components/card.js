const generateCard = (cat) => {
    return `<div class="cat-card">
    <img src="${cat.image}"/>
    ${cat.name}
    <div class="cat-card-btns">
    <button id="cat-card-view" class="cat-card-btn" value=${cat.id} >Посмотреть</button>
    <button id="cat-card-update" class="cat-card-btn" value=${cat.id}>Изменить</button>
    <button id="cat-card-delete" class="cat-card-btn"value=${cat.id}>Удалить</button>
    </div>
    </div>`
};

