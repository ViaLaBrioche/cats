const catCreateEditForm = (cat = '') => {
    return `<div class="modal">
    
    </div>`
}

const catViewCard = (cat = '') => {
    return `<div class="view-modal-info-image">
    <img src="${cat.image}"/>
    </div>
    <div class="view-modal-info">
    <p>ID: ${cat.id}</p>
    <p>Имя: ${cat.name} </p>
    <p>Любимчик: ${cat.favorite}</p>
    <p>Рейтинг: ${cat.rate}</p>
    <p>Возраст: ${cat.age}</p>
    <p>Описание: ${cat.description}</p>
    </div>`
}