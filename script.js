
const config = {
    baseUrl: 'https://cats.petiteweb.dev/api/single/ViaLaBrioche/'
};

class Api {
    constructor(config) {
        this.baseUrl = config.baseUrl;
    }

    getAllCats = () => {
        return fetch(`${this.baseUrl}show`).then(res => {
            console.log(res)
            return res.ok ? res.json() : Promise.reject('У меня лапки')
        });
    };

    addCat = (cat) => {
        return fetch(`${this.baseUrl}add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cat),
        }).then((res) => {
            return res.ok ? res.json() : Promise.reject('У меня лапки')
        });
    };
    updateCat = (newCat) => {
        return fetch(`${this.baseUrl}update/${newCat.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCat),
        }).then((res) => {
            return res.ok ? res.json() : Promise.reject('У меня лапки');
        });
    };

    getAllIdCat = () => {
        return fetch(`${this.baseUrl}ids`).then((res) => {
            return res.ok ? res.json() : Promise.reject('У меня лапки');
        });
    };

    getCatById = (catId) => {
        return fetch(`${this.baseUrl}show/${catId}`).then((res) => {
            return res.ok ? res.json() : Promise.reject('У меня лапки');
        });
    };

    deleteCat = (catId) => {
        return fetch(`${this.baseUrl}delete/${catId}`, {
            method: 'DELETE',
        }).then((res) => {
            return res.ok ? res.json() : Promise.reject('У меня лапки');
        });
    };
};




const api = new Api(config);

api.getAllCats()

    .then(res => {
        console.log(res);
    })
    .catch((error) => {
        console.log(error);
    });


api.addCat({
    id: 4,
    name: "Senior",
    favorite: true,
    rate: 30,
    age: 60,
    description: "Мудрый кот",
    image: "https://chudo-prirody.com/uploads/posts/2021-08/1628815143_54-p-kot-uchenii-foto-63.jpg"

})
    .then(res => {
        console.log(res);
    })
    .catch((error) => {
        console.log(error);
    });

api.updateCat({
    id: 4,
    name: "Senior",
    favorite: true,
    rate: 30,
    age: 70,
    description: "Мудрый кот",
    image: "https://chudo-prirody.com/uploads/posts/2021-08/1628815143_54-p-kot-uchenii-foto-63.jpg"
})

api.getAllIdCat()

.then(res => {
    console.log(res);
})
.catch((error) => {
    console.log(error);
});

// api.getCatById(1)
//     .then(res => {
//         console.log(res);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// api.deleteCat(4) 
//     .then(res => {
//         console.log(res);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

