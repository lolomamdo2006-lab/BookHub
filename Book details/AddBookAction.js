const form = document.getElementById('form');
const addBtn = document.getElementById('addBookBtn');
const addOverlay = document.getElementById('addOverlay');
const addSuccessBox = document.getElementById('addSuccessBox');

if (addBtn) {
    addBtn.addEventListener('click', async function (e) {
        e.preventDefault();

        const formData = new FormData();

        formData.append('title', form.bookName.value.trim());
        formData.append('author', form.author.value.trim());
        formData.append('category', form.category.value.trim());
        formData.append('description', form.description.value.trim());
        formData.append('is_available', 'true');
        const imageFile = document.getElementById('bookImage').files[0];
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/books/', {
                method: 'POST',
                body: formData
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
            alert("Connection error. Is Django server running?");
        }
    });
}

function showSuccess() {
    if (addOverlay) addOverlay.style.display = 'flex';
    if (addSuccessBox) addSuccessBox.style.display = 'block';
    setTimeout(() => {
        if (addOverlay) addOverlay.style.display = 'none';
        if (addSuccessBox) addSuccessBox.style.display = 'none';
    }, 2000);
}