const url ='https://striveschool-api.herokuapp.com/books';
let booksArray = [];
let buy = JSON.parse(localStorage.getItem('buy')) || [];



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

        const card = document.createElement('div');
        card.className='card h-100 mb-3';

        const img = document.createElement('img');
        img.className='card-img-top';
        img.src= book.img;

        const cardBody = document.createElement('div');
        cardBody.className='card-body d-flex flex-column justify-content-between';

        const title = document.createElement ('h4');
        title.className= 'card-title fw-bold';
        title.textContent = book.title;

        const price = document.createElement('p');
        price.className='card-text';
        price.textContent= `€${book.price}`;

        const category = document.createElement('p');
        category.className='card-text bg-black text-white rounded-2 text-center';
        category.textContent= book.category;

        const button = document.createElement('button');
        button.className='btn btn-danger';
        button.textContent='Sbuya';
        button.addEventListener ('click', () =>removeCard(index));

        const addButton = document.createElement('button');
        addButton.className = 'btn btn-success';
        addButton.textContent = 'Compra ora';
        addButton.addEventListener('click', () => addToBuy(book));

        container.appendChild(col);
        col.appendChild(card);
        card.appendChild(img);
        card.appendChild(cardBody);
        cardBody.appendChild(title);
        cardBody.appendChild(price);
        cardBody.appendChild(category);
        cardBody.appendChild(button);
        cardBody.appendChild(addButton);

    });
}

function removeCard(index) {
    booksArray.splice(index,1);
    printBooks();
}

//extra1
function addToBuy(book) {
    buy.push(book);
    localStorage.setItem('buy', JSON.stringify(buy));
    printBuy();
}

function printBuy() {
    const buyContainer = document.getElementById('buy-container');
    buyContainer.innerHTML = '';

    if (buy.length === 0) {
        buyContainer.innerHTML = '<p>Il carrello è vuoto.</p>';
    } else {
        const buyList = document.createElement('ul');
        buyList.className = 'list-group';

        buy.forEach((book) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';

            const img = document.createElement('img');
            img.src = book.img;
            img.style.width = '50px';
            img.style.marginRight = '5px';
            listItem.appendChild(img);

            const bookDetails = document.createElement('span');
            bookDetails.textContent = `${book.title} - €${book.price}`;
            listItem.appendChild(bookDetails);

            buyList.appendChild(listItem);
        });

        buyContainer.appendChild(buyList);
    }
}

function init() {
    initBooks();
}
window.onload =init;