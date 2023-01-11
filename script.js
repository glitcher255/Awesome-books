const booksList = document.getElementById('books_list');

class AwesomeBooks {
  constructor(dataArray) {
    this.bookArray = dataArray;
  }

  saveToLocalStorage() {
    localStorage.setItem('awesome_books', JSON.stringify(this.bookArray));
  }

  renderBooks() {
    booksList.innerHTML = '';
    this.bookArray.forEach((book) => {
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
        this.bookArray = this.bookArray
          .filter((item) => !(JSON.stringify(item) === JSON.stringify(book)));
        this.saveToLocalStorage();
        this.renderBooks();
      });

      booksList.appendChild(li);
    });
  }

  loadLocalStorageData() {
    const localStorageData = JSON.parse(localStorage.getItem('awesome_books'));
    this.bookArray = localStorageData.length ? localStorageData : [];
  }

  addBook(data) {
    this.bookArray.push(data);
  }
}

const awesomeBooks = new AwesomeBooks([]);

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();

  const auther = document.getElementById('auther_input').value;
  const title = document.getElementById('title_input').value;

  const data = { title, auther };
  awesomeBooks.addBook(data);

  awesomeBooks.renderBooks();
  awesomeBooks.saveToLocalStorage();
  e.target.reset();
});

window.addEventListener('load', () => {
  awesomeBooks.loadLocalStorageData();
  awesomeBooks.renderBooks();
});
