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
      li.className = 'auther_container';
      const autherTitle = document.createElement('p');
      autherTitle.className = 'auther_text';
      autherTitle.innerHTML = `"${book.title}" by ${book.auther}`;

      const delButton = document.createElement('button');
      delButton.className = 'del_button';
      delButton.innerHTML = 'Remove';
      li.appendChild(autherTitle);
      li.appendChild(delButton);
      delButton.addEventListener('click', () => {
        li.remove();
        this.bookArray = this.bookArray
          .filter((item) => !(item.id === book.id));
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

  const data = { title, auther, id: Math.ceil((Math.random() * Math.random()) * 100) };
  awesomeBooks.addBook(data);

  awesomeBooks.renderBooks();
  awesomeBooks.saveToLocalStorage();
  e.target.reset();
});

window.addEventListener('load', () => {
  awesomeBooks.loadLocalStorageData();
  awesomeBooks.renderBooks();
  const nav_buttons = document.getElementsByClassName("nav_buttons")[1]
  for (let x = 2; x < nav_buttons.classList.length; x++) {
    document.getElementById(nav_buttons.classList[x]).style.display = "none"
    }
});

for (let x = 0; x < document.getElementsByClassName("nav_buttons").length; x++) {
document.getElementsByClassName("nav_buttons")[x].addEventListener('click', handler)
}

function handler() {
  for (let x = 2; x < this.classList.length; x++) {
  document.getElementById(this.classList[x]).style.display = "none"
  }
  console.log(this.classList[1])
  document.getElementById(this.classList[1]).style.display = null
}