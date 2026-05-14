const API_URL = 'http://127.0.0.1:8000/api/books/';

async function fetchBooks() {
    try {
        const response = await fetch(API_URL);
        const books = await response.json();

        const containers = document.querySelectorAll('.books-container');
        containers.forEach(c => c.innerHTML = '');

        books.forEach(book => {
            const imageSrc = book.image ? book.image : 'cleanCode.jpg';

            const bookHTML = `
                <div class="book-card">
                    <div class="badge">${book.is_available ? 'Available' : 'Borrowed'}</div>
                    <img src="${imageSrc}" alt="${book.title}" class="book-img">
                    <div class="book-info">
                        <h3 class="book-title">${book.title}</h3>
                        <span class="book-category">${book.category}</span>
                    </div>
                    <div class="buttons-container">
                        <a href="Edit Books.html?id=${book.id}"><button class="edit-btn">Edit</button></a>
                        <button class="delete-btn" onclick="openDeletePopup('${book.id}')">Delete</button>
                    </div>
                </div>`;

            if(containers[0]) containers[0].innerHTML += bookHTML;
        });
    } catch (error) {
        console.error("Error loading books:", error);
    }
}

let deleteTargetId = null;

window.openDeletePopup = function(id) {
    deleteTargetId = id;
    const overlay = document.getElementById("overlay");
    if (overlay) {
        overlay.style.display = "flex";
        document.getElementById("confirmBox").style.display = "block";
        document.getElementById("successBox").style.display = "none";
    }
};

window.confirmDelete = async function() {
    if (!deleteTargetId) return;

    try {
        const response = await fetch(`${API_URL}${deleteTargetId}/`, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.getElementById("confirmBox").style.display = "none";
            document.getElementById("successBox").style.display = "block";

            await fetchBooks();
        } else {
            alert("Error");
        }
    } catch (error) {
        console.error("Delete error:", error);
    }
};

window.closePopup = function() {
    const overlay = document.getElementById("overlay");
    if (overlay) overlay.style.display = "none";
};

document.addEventListener('DOMContentLoaded', fetchBooks);