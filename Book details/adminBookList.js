const API_URL = 'http://127.0.0.1:8000/api/books/';

async function fetchBooks() {
    try {
        const response = await fetch(API_URL);
        const books = await response.json();

        const sections = document.querySelectorAll('.category-group');

        // 1. تنظيف كل الحاويات أولاً
        sections.forEach(section => {
            const container = section.querySelector('.books-container');
            if (container) container.innerHTML = '';
        });

        books.forEach(book => {
            const imageSrc = book.image ? book.image : 'cleanCode.jpg';
            let targetContainer = null;

            // 2. البحث عن الحاوية المناسبة للكاتيجوري
            sections.forEach(section => {
                const title = section.querySelector('.section-title').innerText.toLowerCase();
                // لو عنوان القسم فيه اسم الكاتيجوري بتاعة الكتاب، هنحطه هنا
                if (title.includes(book.category.toLowerCase())) {
                    targetContainer = section.querySelector('.books-container');
                }
            });

            // لو ملقتيش كاتيجوري مناسبة، حطيه في أول حاوية كديفولت (اختياري)
            if (!targetContainer) targetContainer = document.querySelector('.books-container');

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

            // 3. الإضافة في الحاوية الصح
            if (targetContainer) {
                targetContainer.innerHTML += bookHTML;
            }
        });
    } catch (error) {
        console.error("Error loading books:", error);
    }
}

let deleteTargetId = null;

window.openDeletePopup = function (id) {
    deleteTargetId = id;
    const overlay = document.getElementById("overlay");
    if (overlay) {
        overlay.style.display = "flex";
        document.getElementById("confirmBox").style.display = "block";
        document.getElementById("successBox").style.display = "none";
    }
};

window.confirmDelete = async function () {
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

window.closePopup = function () {
    const overlay = document.getElementById("overlay");
    if (overlay) overlay.style.display = "none";
};

document.addEventListener('DOMContentLoaded', fetchBooks);