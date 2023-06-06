class Book {
    constructor(bookId, bookName, price, author, bookStatus) {
        this.bookId = bookId,
        this.bookName = bookName,
        this.price = price,
        this.author = author,
        this.bookStatus = bookStatus
    }
}

var books = [];
var book = new Book('B02', 'FullStack', 60000, 'Rikkei', 'Con Hang');
var book1 = new Book('B01', 'Html', 70000, 'Viet Nam', 'Het Hang')
var book2 = new Book('B03', 'Css', 90000, 'Viet Nam', 'Con Hang')
var book3 = new Book('B04', 'Index', 90000, 'Viet Nam', 'Con Hang')
books.push(book);
books.push(book1);
books.push(book2);
books.push(book3);
function clearForm() {
    document.getElementById('bookId').value = '';
    document.getElementById('bookName').value = '';
    document.getElementById('price').value = '';
    document.getElementById('author').value = '';
    document.getElementById('bookStatus').checked = false;
}

function showBooks(data) {
    let tr = '';
    for (let a of data) {
        console.log(a)
        tr += `<tr>
                    <td>${a.bookId}</td>
                    <td>${a.bookName}</td>
                    <td>${a.price}</td>
                    <td>${a.author}</td>
                    <td>${a.bookStatus ? 'Còn Hàng' : 'Hết Hàng'}</td>
                    <td>
                        <button class="btn btn-change" onclick="updateBook('${a.bookId}')">Sua</button>
                        <button class="btn btn-delete" onclick="deleteBook('${a.bookId}')" id="delete">Xoa</button>
                    </td>
                </tr>`
    }
    document.getElementById('list').innerHTML = tr;
}



function addNewBook() {
    let b = getInfo();

    if (books.find(x => x.bookId === b.bookId)) {
        alert('Id đã tồn tại');
        return;
    }

    books.push(b);
    showBooks(books);

    clearForm();
}

function getInfo() {
    let bookId = document.getElementById('bookId').value;
    let bookName = document.getElementById('bookName').value;
    let price = document.getElementById('price').value;
    let author = document.getElementById('author').value;
    let bookStatus = document.getElementById('bookStatus').checked;

    let b = new Book(bookId, bookName, price, author, bookStatus);

    console.log(b);
    return b;
}

function updateBook(bookId) {
    let b = books.find(x => x.bookId === bookId);

    document.getElementById('bookId').value = b.bookId;
    document.getElementById('bookId').disabled = true;
    document.getElementById('bookName').value = b.bookName;
    document.getElementById('price').value = b.price;
    document.getElementById('author').value = b.author;
    document.getElementById('bookStatus').checked = b.bookStatus;
    document.getElementById('delete').disabled = true;
}
function saveBook() {
    
    let b = getInfo();

    let bookUpdate = books.find(x => x.bookId === b.bookId);
    bookUpdate.bookName = b.bookName;
    bookUpdate.price = b.price;
    bookUpdate.author = b.author;
    bookUpdate.bookStatus = b.bookStatus;
    // document.getElementById('delete').disabled = false;
    showBooks(books);
    clearForm();
    document.getElementById('bookId').disabled = false;
}
function deleteBook(bookId) {
    if (confirm('Xóa sách?')) {
        let b = books.findIndex(x => x.bookId === bookId);
        books.splice(b, 1);
        showBooks(books);
    }
}
function sorted(event) {
     let sort = event.target.value;
     console.log(sort)
     let result = [];
     if (sort === 'upPrice') {
        result = [...books].sort((b1, b2) => b1.price - b2.price);
     } else if (sort === 'downPrice') {
        result = [...books].sort((b1, b2) => b2.price - b1.price);
     } else {
        result = books;
     }
     showBooks(result);
}
function searchBook(event) {
     let k = event.target.value.toLocaleLowerCase();
     let result = [...books].filter(x => x.bookName.toLocaleLowerCase().indexOf(k) >= 0);
     showBooks(result);
}

showBooks(books);