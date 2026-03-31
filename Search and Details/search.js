
const myBooks = [
    { id: "1", title: "Clean Code", author: "Robert C. Martin", category: "Programming", isAvailable: true },
    { id: "2", title: "Eloquent JavaScript", author: "Marijn Haverbeke", category: "Programming", isAvailable: true },
    { id: "3", title: "Design Patterns", author: "Erich Gamma", category: "Design", isAvailable: true }
];


const input = document.querySelector('.searchbox input');
const filterSelect = document.getElementById('search-filter');
const availableGrid = document.getElementById('available-grid');
const unavailableGrid = document.getElementById('unavailable-grid');


function display(data) {
    if (!availableGrid || !unavailableGrid) return;

    
    availableGrid.innerHTML = '';
    unavailableGrid.innerHTML = '';

    if (data.length === 0 && input.value === "") {
        availableGrid.innerHTML = '<p class="no-results">Start typing to search for books...</p>';
        return;
    }

    data.forEach(book => {
        
        const borrowBtn = book.isAvailable 
            ? `<button class="details" onclick="borrowBook('${book.id}')">Borrow</button>` 
            : ''; 

        const bookHTML = `
            <div class="book-item">
                <div class="bookinformation">
                    <span class="dot"></span>
                    <span class="bookname">${book.title}</span>
                </div>
                <div class="book-actions">
                    ${borrowBtn}
                    <button class="details" onclick="goToDetails('${book.id}')">Show Details</button>
                </div>
            </div>
        `;

        
        if (book.isAvailable) {
            availableGrid.innerHTML += bookHTML;
        } else {
            unavailableGrid.innerHTML += bookHTML;
        }
    });

    
    if (availableGrid.innerHTML === '') availableGrid.innerHTML = '<p class="no-results">No books available.</p>';
    if (unavailableGrid.innerHTML === '') unavailableGrid.innerHTML = '<p class="emptymsg">No books currently unavailable.</p>';
}


function borrowBook(bookId) {
    const book = myBooks.find(b => b.id === bookId);
    if (book) {
        book.isAvailable = false; 
        display(myBooks); 
    }
}


function goToDetails(bookId) {
    if (window.location.href.includes('Admin')) {
        window.location.href = `Admin Book Details.html?id=${bookId}`;
    } else {
        window.location.href = `User Book Details.html?id=${bookId}`;
    }
}


if (input) {
    input.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filterType = filterSelect.value;

        if (term === "") {
            display([]); 
            return;
        }

       
        const filtered = myBooks.filter(b => {
            const val = filterType === 'all' 
                ? (b.title + b.author + b.category) 
                : b[filterType];
            return val.toLowerCase().includes(term);
        });

        display(filtered);
    });
}


display();
