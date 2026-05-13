const API_URL = 'http://127.0.0.1:8000/api/books/';

async function fetchBooks() {
    try {
        const response = await fetch(API_URL);
        const books = await response.json();
        const containers = document.querySelectorAll('.books-container');

        containers.forEach(c => c.innerHTML = ''); // تنظيف القائمة

        books.forEach(book => {
            const bookHTML = `
                <div class="book-card">
                    <img src="cleanCode.jpg" alt="Book" class="book-img">
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
    } catch (error) { console.error(error); }
}

let deleteTargetId = null;
function openDeletePopup(id) {
    deleteTargetId = id;
    document.getElementById("overlay").style.display = "flex";
}

async function confirmDelete() {
    await fetch(`${API_URL}${deleteTargetId}/`, { method: 'DELETE' });
    document.getElementById("confirmBox").style.display = "none";
    document.getElementById("successBox").style.display = "block";
    fetchBooks();
}

const params = new URLSearchParams(window.location.search);
const editId = params.get("id");

if (editId && document.getElementById("bookName")) {
    window.onload = async () => {
        const res = await fetch(`${API_URL}${editId}/`);
        const book = await res.json();
        document.getElementById("bookName").value = book.title;
        document.getElementById("author").value = book.author;
        document.getElementById("category").value = book.category;
        document.getElementById("description").value = book.description;
    };
}

async function confirmEdit(event) {
    event.preventDefault();
    const updatedData = {
        title: document.getElementById("bookName").value,
        author: document.getElementById("author").value,
        category: document.getElementById("category").value,
        description: document.getElementById("description").value
    };
    await fetch(`${API_URL}${editId}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    });
    window.location.href = "Admin Books list.html";
}

if (document.querySelector('.books-container')) fetchBooks();