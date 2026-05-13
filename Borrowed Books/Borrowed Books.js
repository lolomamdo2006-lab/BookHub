function checkIfOverdue(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);

    if (due < today) {
        return 'overdue';
    } else {
        return 'active';
    }
}

function renderCards(books) {
    const grid = document.querySelector('.books-grid');

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
                        <button class="button-details" onclick="goToDetails()">Details</button> 
                        <button class="button-return"  onclick="returnBook('${book.id}')">Return Book</button>
                    </div>
                </div>
            </article>`;
    });

   
    updateStats(books);
}



function updateStats(books) {
    const total = books.length;
    const active = books.filter(function (b) { return checkIfOverdue(b.dueDate) === 'active'; }).length;
    const overdue = books.filter(function (b) { return checkIfOverdue(b.dueDate) === 'overdue'; }).length;

    const statCards = document.querySelectorAll('.state-card b');
    statCards[0].textContent = total;
    statCards[1].textContent = active;
    statCards[2].textContent = overdue;
}


function goToDetails(bookId) {

    window.location.href = "../Search and Details/User Book Details.html";
}



function returnBook(bookId) {

   
    borrowedBooks = borrowedBooks.filter(function (b) { return b.id !== bookId; });

    renderCards(borrowedBooks);
}

// window.onload = function () {
//     renderCards(borrowedBooks);
// };

const API_URL = 'http://127.0.0.1:8000/api/borrowed/';

async function fetchBorrowedBooks() {
    try {
        // 1. طلب البيانات من السيرفر
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("السيرفر مش بيرد");

        const data = await response.json();

        // 2. تحويل البيانات من شكل جانجو لشكل الكروت بتاعتك
        const formattedBooks = data.map(item => ({
            id: item.book_details.book_id, // الـ ID اللي جاي من جدول الكتب
            title: item.book_details.title,
            author: item.book_details.author,
            category: item.book_details.category,
            borrowDate: item.borrow_date,
            dueDate: item.due_date
        }));

        // 3. نداء الدالة اللي إنتي كاتباها أصلاً عشان ترسم الكروت
        renderCards(formattedBooks);

    } catch (error) {
        console.error("مشكلة في جلب البيانات:", error);
        document.querySelector('.books-grid').innerHTML =
            '<p style="color:red; text-align:center;">عفواً، فشل الاتصال بالسيرفر تأكد من تشغيله.</p>';
    }
}

// تشغيل الربط أول ما الصفحة تفتح
window.onload = function () {
    fetchBorrowedBooks();

    if (typeof applyTheme === "function") {
        applyTheme();
    }
};