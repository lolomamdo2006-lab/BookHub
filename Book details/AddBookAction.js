const form = document.getElementById('form');
const addBtn = document.getElementById('addBookBtn'); 
const books = [];

const addOverlay = document.getElementById('addOverlay');
const addSuccessBox = document.getElementById('addSuccessBox');

addBtn.addEventListener('click', function(e) {
    e.preventDefault(); 

    const bookId = form.bookId.value.trim();
    const bookName = form.bookName.value.trim();
    const author = form.author.value.trim();
    const category = form.category.value.trim();
    const description = form.description.value.trim();

    if (!bookId || !bookName || !author || !category || !description) {
        alert('Please fill all fields!');
        return;
    }

    books.push({
        id: bookId,
        name: bookName,
        author: author,
        category: category,
        description: description
    });

    form.reset();

    addOverlay.style.display = 'flex';
    addSuccessBox.style.display = 'block';
    addSuccessBox.style.position = 'fixed';
    addSuccessBox.style.top = '50%';
    addSuccessBox.style.left = '50%';
    addSuccessBox.style.transform = 'translate(-50%, -50%)';
    addSuccessBox.style.zIndex = '50';

    
    setTimeout(() => {
        addOverlay.style.display = 'none';
        addSuccessBox.style.display = 'none';
    }, 2000);
});


