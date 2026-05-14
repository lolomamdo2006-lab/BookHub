const API_URL = 'http://127.0.0.1:8000/api/books/borrowed/';
const grid = document.querySelector('.books-grid');


async function fetchBorrowedBooks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error fetching borrowed books");

        const data = await response.json();


        const formattedBooks = data.map(item => ({
            id: item.id,
            title: item.title,
            author: item.author,
            category: item.category,

            borrowDate: new Date().toLocaleDateString(),
            dueDate: new Date(Date.now() + 12096e5).toLocaleDateString()
        }));

        renderCards(formattedBooks);

    } catch (error) {
        console.error("Error fetching borrowed books:", error);
        grid.innerHTML = '<p style="color:red; text-align:center;">Error fetching borrowed books.</p>';
    }
}


function renderCards(books) {
    grid.innerHTML = '';

    if (books.length === 0) {
        grid.innerHTML = '<p style="color:#3e521c; text-align:center; margin-top:40px;">No borrowed books found.</p>';
        updateStats(books);
        return;
    }

    books.forEach(function (book) {

        const status = checkIfOverdue(book.dueDate);
        const statusClass = status === 'active' ? 'status-active' : 'status-overdue';
        const statusText = status === 'active' ? '•Active' : '•Overdue';

        grid.innerHTML += `
            <article class="book-cards">
                <div class="card-headr">
                    <h3>${book.title}</h3>
                    <span>${book.author}</span>
                    <p><mark>${book.category}</mark></p>
                </div>
                <div class="card-body">
                    <div class="info-row">
                        <span>Book ID</span><b>${book.id}</b>
                    </div>
                    <hr>
                    <div class="info-row">
                        <span>Borrow Date</span><b>${book.borrowDate}</b>
                    </div>
                    <hr>
                    <div class="info-row">
                        <span>Due Date</span><b>${book.dueDate}</b>
                    </div>
                    <hr>
                    <div class="info-row">
                        <span>Status</span>
                        <p class="${statusClass}">${statusText}</p>
                    </div>
                    <div class="actions">
                        <button class="button-details" onclick="goToDetails('${book.id}')">Details</button> 
                        <button class="button-return" onclick="returnBook('${book.id}')">Return Book</button>
                    </div>
                </div>
            </article>`;
    });

    updateStats(books);
}


async function returnBook(bookId) {
    if (!confirm("Are you sure you want to return this book?")) return;

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/books/${bookId}/`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_available: true })
        });

        if (response.ok) {
            alert("Book returned successfully!");
            fetchBorrowedBooks();
        } else {
            alert("Failed to return book.");
        }
    } catch (error) {
        console.error("Error returning book:", error);
    }
}


function updateStats(books) {
    const total = books.length;
    const active = books.filter(b => checkIfOverdue(b.dueDate) === 'active').length;
    const overdue = books.filter(b => checkIfOverdue(b.dueDate) === 'overdue').length;

    const statCards = document.querySelectorAll('.state-card b');
    if (statCards.length >= 3) {
        statCards[0].textContent = total;
        statCards[1].textContent = active;
        statCards[2].textContent = overdue;
    }
}


function checkIfOverdue(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);
    return due < today ? 'overdue' : 'active';
}


function goToDetails(bookId) {
    window.location.href = `../Search and Details/User Book Details.html?id=${bookId}`;
}


window.onload = function () {
    fetchBorrowedBooks();
};