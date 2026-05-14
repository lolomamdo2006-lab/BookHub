const API_URL = 'http://127.0.0.1:8000/api/books/';

async function loadAdminBooks() {
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
                <div class="badge">${book.is_available ? 'In Stock' : 'Borrowed'}</div>
                <img src="${imageSrc}" alt="${book.title}" class="book-img">
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <span class="book-category">${book.category}</span>
                </div>
                <div class="buttons-container">
                    <a href="Edit Books.html?id=${book.id}"><button class="edit-btn">Edit</button></a>
                    <button class="delete-btn" onclick="openDeletePopup('${book.id}')">Delete</button>
                </div>
                <div class="info-row">
                    <span class="info-value">
                        <span class="status-pill">
                            <span class="status-dot" style="background-color: ${book.is_available ? '#2ecc71' : '#e74c3c'}"></span> 
                            Admin Control
                        </span>
                    </span>
                </div>
            </div>`;

            if (targetContainer) targetContainer.innerHTML += bookHTML;
        });
    } catch (error) {
        console.error("Error loading admin books:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadAdminBooks);