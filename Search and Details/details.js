const urlParams = new URLSearchParams(window.location.search);
const idFromUrl = urlParams.get('id');

async function loadBookDetails() {
    if (!idFromUrl) return;

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/books/${idFromUrl}/`);
        const book = await response.json();
        
        
        document.querySelector('.card-top h2').innerText = book.title;
        document.querySelector('.card-top span').innerText = book.author;
        document.querySelector('.badge').innerText = book.category;
        
        const labels = document.querySelectorAll('.info-value');
        labels[0].innerText = book.id;
        labels[1].innerText = book.title;
        labels[2].innerText = book.author;
        labels[3].innerText = book.category;
        labels[4].innerText = book.description || "No description provided.";
        
        
        const statusPill = document.querySelector('.status-pill');
        if (book.is_available) {
            statusPill.innerHTML = '<span class="status-dot"></span> Available';
            statusPill.parentElement.style.color = '#2e7d32'; 
        } else {
            statusPill.innerHTML = '<span class="status-dot" style="background-color: #d32f2f;"></span> Not Available';
            statusPill.parentElement.style.color = '#d32f2f'; 
            statusPill.style.backgroundColor = '#ffebee';
            statusPill.style.color = '#c62828'
            statusPill.style.border = '1px solid #ffcdd2'


        }
    } catch (error) {
        console.error('Error loading details:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadBookDetails);
