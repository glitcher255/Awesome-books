let bookArray = [];
const booksList = document.getElementById('books_list');

function saveToLocalStorage(data) {
  localStorage.setItem('awesome_books', JSON.stringify(data));
}

function renderBooks(data) {
  booksList.innerHTML = '';
  data.forEach((book) => {
    const li = document.createElement('li');
    li.style.borderBottom = 'solid';
    li.style.borderWidth = '1px';
    li.style.paddingBottom = '10px';
    const autherTitle = document.createElement('p');
    autherTitle.innerHTML = `${book.title} <br> ${book.auther}`;

    const delButton = document.createElement('button');
    delButton.innerHTML = 'Remove';
    li.appendChild(autherTitle);
    li.appendChild(delButton);
    delButton.addEventListener('click', () => {
      li.remove();
      bookArray = bookArray.filter((item) => !(JSON.stringify(item) === JSON.stringify(book)));
      saveToLocalStorage(bookArray);
      renderBooks(bookArray);
    });

    booksList.appendChild(li);
  });
}

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();

  const auther = document.getElementById('auther_input').value;
  const title = document.getElementById('title_input').value;

  const data = { title, auther };
  bookArray.push(data);

  renderBooks(bookArray);
  saveToLocalStorage(bookArray);
  e.target.reset();
});

function loadLocalStorageData() {
  const localStorageData = JSON.parse(localStorage.getItem('awesome_books'));
  bookArray = localStorageData.length ? localStorageData : [];
}

window.addEventListener('load', () => {
  loadLocalStorageData();
  renderBooks(bookArray);
});
