let myBooks = []; 
const input = document.querySelector('.searchbox input');
const searchButton = document.querySelector('.button');
const availableGrid = document.getElementById('available-grid');
const unavailableGrid = document.getElementById('unavailable-grid');
const filterSelect = document.getElementById('search-filter'); 


async function loadBooksFromServer() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/books/');
        if (!response.ok) throw new Error('Server error');
        
        const data = await response.json();
        
        
        myBooks = data.map(book => ({
            ...book,
            isAvailable: book.is_available === true
        }));

        console.log("Books loaded and ready for searching."); 

    } catch (error) {
        console.error('Connection Error:', error);
    }
}


function display(data) {
    if (!availableGrid || !unavailableGrid) return;
    
    availableGrid.innerHTML = '';
    unavailableGrid.innerHTML = '';

    if (data.length === 0) {
        availableGrid.innerHTML = '<p class="no-results">No books found.</p>';
        return;
    }

    const isAdmin = window.location.href.includes('Admin');

    data.forEach(book => {
        const borrowBtn = (book.isAvailable && !isAdmin) 
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
}


input.addEventListener('input', () => {
    const term = input.value.toLowerCase().trim();
    const filterType = filterSelect.value; 
    
    if (term === "") {
        display([]); 
        return;
    }

    const filtered = myBooks.filter(b => {
        if (filterType === 'all') {
            return (b.title || "").toLowerCase().includes(term) || 
                   (b.author || "").toLowerCase().includes(term) || 
                   (b.category || "").toLowerCase().includes(term);
        } else {
            
            return String(b[filterType] || "").toLowerCase().includes(term);
        }
    });
    display(filtered);
});


searchButton.addEventListener('click', () => {
    const term = input.value.toLowerCase().trim();
    const filterType = filterSelect.value;
    
    if (term === "") return;

    const match = myBooks.find(b => {
        if (filterType === 'all') {
            return (b.title || "").toLowerCase().includes(term) || 
                   (b.author || "").toLowerCase().includes(term);
        } else {
            return String(b[filterType] || "").toLowerCase().includes(term);
        }
    });
    
    display(match ? [match] : []);
});


async function borrowBook(bookId) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/books/${bookId}/`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_available: false })
        });
        if (response.ok) {
            alert('Book Borrowed Successfully!');
            await loadBooksFromServer(); 
            display([]); 
        }
    } catch (err) { console.error('Borrow Error:', err); }
}


function goToDetails(bookId) {
    const page = window.location.href.includes('Admin') ? 'Admin Book Details.html' : 'User Book Details.html';
    window.location.href = `${page}?id=${bookId}`;
}


loadBooksFromServer();
// update