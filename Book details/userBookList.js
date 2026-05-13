const API_URL = 'http://127.0.0.1:8000/api/books/';

async function loadUserBooks() {
    try {
        const response = await fetch(API_URL);
        const books = await response.json();

        // جلب كل الحاويات الخاصة بالكتب
        const sections = document.querySelectorAll('.category-group');

        // تنظيف كل الحاويات أولاً قبل العرض
        sections.forEach(section => {
            const container = section.querySelector('.books-container');
            if (container) container.innerHTML = '';
        });

        books.forEach(book => {
            // تحديد الحاوية المناسبة بناءً على الكاتيجوري
            let targetContainer = null;

            sections.forEach(section => {
                const title = section.querySelector('.section-title').innerText.toLowerCase();
                if (title.includes(book.category.toLowerCase())) {
                    targetContainer = section.querySelector('.books-container');
                }
            });

            // لو ملقيناش كاتيجوري محددة، بنحطها في أول حاوية (Newly Added) كمثال
            if (!targetContainer) targetContainer = document.querySelector('.books-container');

            const bookHTML = `
                <div class="book-card">
                    <div class="badge">${book.is_available ? 'Available' : 'Borrowed'}</div>
                    <img src="cleanCode.jpg" alt="Book" class="book-img">
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
    let loginStatus = localStorage.getItem("login");

    if (loginStatus !== "true") {
        alert("Please login first to borrow books");
        window.location.href = "../register pages/login.html";
        return;
    }

    try {
        // بنجيب بيانات الكتاب عشان نسيفه لليوزر في المتصفح يظهر فوراً في صفحة Borrowed
        const res = await fetch(`${API_URL}${bookId}/`);
        const bookData = await res.json();

        // إرسال الطلب للباك إند
        const response = await fetch('http://127.0.0.1:8000/api/books/borrow/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                book_id: bookId,
                username: localStorage.getItem("username")
            })
        });

        if (response.ok) {
            // حفظ في الـ LocalStorage عشان يظهر في صفحة Borrowed Books فوراً
            let borrowed = JSON.parse(localStorage.getItem("borrowedBooks") || "[]");
            if (!borrowed.find(b => b.id === bookId)) {
                borrowed.push(bookData);
                localStorage.setItem("borrowedBooks", JSON.stringify(borrowed));
            }

            alert("Book borrowed successfully!");
            window.location.href = "../Borrowed Books/Borrowed Books.html";
        } else {
            alert("Failed to borrow book.");
        }
    } catch (error) {
        console.error("Borrow error:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadUserBooks);