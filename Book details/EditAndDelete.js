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
                    <img src="${imageSrc}" alt="Book" class="book-img">
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
    } catch (error) { console.error("Error fetching books:", error); }
}

let deleteTargetId = null;
function openDeletePopup(id) {
    deleteTargetId = id;
    document.getElementById("overlay").style.display = "flex";
}

async function confirmDelete() {
    if (!deleteTargetId) return;
    try {
        const response = await fetch(`${API_URL}${deleteTargetId}/`, { method: 'DELETE' });
        if (response.ok) {
            document.getElementById("confirmBox").style.display = "none";
            document.getElementById("successBox").style.display = "block";
            await fetchBooks();
        }
    } catch (error) { console.error("Delete error:", error); }
}

const params = new URLSearchParams(window.location.search);
const editId = params.get("id");

if (editId && document.getElementById("bookName")) {
    window.onload = async () => {
        try {
            const res = await fetch(`${API_URL}${editId}/`);
            const book = await res.json();
            document.getElementById("bookName").value = book.title;
            document.getElementById("author").value = book.author;
            document.getElementById("category").value = book.category;
            document.getElementById("description").value = book.description;

            const imgPreview = document.getElementById("currentImagePreview");
            if (imgPreview && book.image) {
                imgPreview.src = book.image;
                imgPreview.style.display = "block";
            }
        } catch (error) { console.error("Error loading book:", error); }
    };
}

async function confirmEdit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', document.getElementById("bookName").value);
    formData.append('author', document.getElementById("author").value);
    formData.append('category', document.getElementById("category").value);
    formData.append('description', document.getElementById("description").value);

    const imageInput = document.getElementById("bookImage");
    if (imageInput && imageInput.files[0]) {
        formData.append('image', imageInput.files[0]);
    }

    try {
        await fetch(`${API_URL}${editId}/`, {
            method: 'PATCH',
            body: formData
        });
        window.location.href = "Admin Books list.html";
    } catch (error) { console.error("Edit error:", error); }
}

// تشغيل القائمة
if (document.querySelector('.books-container')) fetchBooks();