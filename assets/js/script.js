const url ='https://striveschool-api.herokuapp.com/books';
let booksArray = [];



function initBooks () {
    fetch(url).then((response) => {
        return response.json();
    }).then((books) => {
        booksArray=books;
        printBooks();
    }). catch((error) => {
        console.log('Errore durante il caricamento dei libri:', error);
    });
}

function printBooks () {
    const container =document.getElementById('container-books');
    container.innerHTML ='';

    booksArray.forEach ((book,index) => {
        const col = document.createElement('div');
        col.className= 'col-12 col-sm-6 col-md-4 col-lg-3';

        const card = document.createElement('div');
        card.className='card';

        const img = document.createElement('img');
        img.className='card-img-top';
        img.src= book.img;

        const cardBody = document.createElement('div');
        cardBody.className='card-body d-flex flex-column';

        const title = document.createElement ('h4');
        title.className= 'card-title';
        title.textContent = book.title;

        const price = document.createElement('p');
        price.className='card-text';
        price.textContent= `€${book.price}`;

        const button = document.createElement('button');
        button.className='btn btn-danger';
        button.textContent='Scarta';
        button.addEventListener ('click', () =>removeCard(index));

        container.appendChild(col);
        col.appendChild(card);
        card.appendChild(img);
        card.appendChild(cardBody);
        cardBody.appendChild(title);
        cardBody.appendChild(price);
        cardBody.appendChild(button);

    });
}

function removeCard(index) {
    booksArray.splice(index,1);
    printBooks();
}
function init() {
    initBooks();
}
window.onload =init;