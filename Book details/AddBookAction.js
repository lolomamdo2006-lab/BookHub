const form = document.getElementById('form');
const addBtn = document.getElementById('addBookBtn'); 
const addOverlay = document.getElementById('addOverlay');
const addSuccessBox = document.getElementById('addSuccessBox');

if (addBtn) {
    addBtn.addEventListener('click', async function(e) {
        e.preventDefault();

        const bookData = {
            book_id: form.bookId.value.trim(),
            title: form.bookName.value.trim(), // تم التوحيد مع الموديل
            author: form.author.value.trim(),
            category: form.category.value.trim(),
            description: form.description.value.trim()
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/books/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookData)
            });

            if (response.ok) {
                form.reset();
                showSuccess();
            } else {
                const err = await response.json();
                alert("Error: " + JSON.stringify(err));
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    });
}

function showSuccess() {
    if(addOverlay) addOverlay.style.display = 'flex';
    if(addSuccessBox) addSuccessBox.style.display = 'block';
    setTimeout(() => {
        if(addOverlay) addOverlay.style.display = 'none';
        if(addSuccessBox) addSuccessBox.style.display = 'none';
    }, 2000);
}