const API_URL = 'http://127.0.0.1:8000/api/books/';
const BORROW_URL = 'http://127.0.0.1:8000/api/users/borrow/';

async function loadUserBooks() {
    try {
        const response = await fetch(API_URL);
        const books = await response.json();

        const sections = document.querySelectorAll('.category-group');

        sections.forEach(section => {
            const container = section.querySelector('.books-container');
            if (container) container.innerHTML = '';
        });

        books.forEach(book => {
            let targetContainer = null;

            sections.forEach(section => {
                const title = section.querySelector('.section-title').innerText.toLowerCase();
                if (title.includes(book.category.toLowerCase())) {
                    targetContainer = section.querySelector('.books-container');
                }
            });

            if (!targetContainer) targetContainer = document.querySelector('.books-container');

            const imageSrc = book.image ? book.image : 'cleanCode.jpg';

            const bookHTML = `
            <div class="book-card">
                <div class="badge">${book.is_available ? 'Available' : 'Borrowed'}</div>
                
                <!-- تم تغيير src ليقرأ من المتغير imageSrc -->
                <img src="${imageSrc}" alt="${book.title}" class="book-img">
                
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <span class="book-category">${book.category}</span>
                </div>
                <div class="buttons-container">
                    <a href="../Search and Details/User Book Details.html?id=${book.id}">
                        <button class="details-btn">Details</button>
                    </a>
                    <button class="borrow-btn" onclick="borrow('${book.id}')">Borrow</button>
                </div>
                <div class="info-row">
                    <span class="info-value">
                        <span class="status-pill">
                            <span class="status-dot" style="background-color: ${book.is_available ? '#2ecc71' : '#e74c3c'}"></span>
                            ${book.is_available ? 'Available' : 'Not Available'}
                        </span>
                    </span>
                </div>
            </div>`;

            if (targetContainer) targetContainer.innerHTML += bookHTML;
        });
    } catch (error) {
        console.error("Error loading user books:", error);
    }
}

async function borrow(bookId) {
    let username = localStorage.getItem("username");
    let loginStatus = localStorage.getItem("login");

    if (loginStatus !== "true" || !username) {
        alert("Please login first to borrow books");
        window.location.href = "../register pages/login.html";
        return;
    }

    try {
        const response = await fetch(BORROW_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                book_id: bookId,
                username: username
            })
        });

        if (response.ok) {
            alert('Book Borrowed Successfully!');
            await loadUserBooks();
        } else {
            const err = await response.json();
            alert("Failed: " + (err.message || "Unknown error"));
        }
    } catch (err) {
        console.error('Borrow Error:', err);
        alert("Check your connection");
    }
}

document.addEventListener('DOMContentLoaded', loadUserBooks);