const myBooks = [
    { id: "1", title: "Clean Code", author: "Robert C. Martin", category: "Programming", desc: "Amazing book for clean code." },
    { id: "2", title: "Eloquent JavaScript", author: "Marijn Haverbeke", category: "Programming", desc: "Deep dive into JS." },
    { id: "3", title: "Design Patterns", author: "Erich Gamma", category: "Design", desc: "Classic software patterns." }
];

const urlParams = new URLSearchParams(window.location.search);
const idFromUrl = urlParams.get('id');

const foundBook = myBooks.find(b => b.id === idFromUrl);
const editLink = document.getElementById('edit');

if (foundBook) {
    const title = document.querySelector('.card-top h2');
    const author = document.querySelector('.card-top span');
    const badge = document.querySelector('.badge');
    const labels = document.querySelectorAll('.info-value');

    if(title) title.innerText = foundBook.title;
    if(author) author.innerText = foundBook.author;
    if(badge) badge.innerText = foundBook.category;

    if(labels[0]) labels[0].innerText = foundBook.id;
    if(labels[1]) labels[1].innerText = foundBook.title;
    if(labels[2]) labels[2].innerText = foundBook.author;
    if(labels[3]) labels[3].innerText = foundBook.category;
    if(labels[4]) labels[4].innerText = foundBook.desc;
}

if (foundBook && editLink) {
    editLink.onclick = function(){
    window.location.href = `../Book details/Edit Books.html?id=${foundBook.id}`;
    }
}
function toggleDarkMode() {
        document.body.classList.toggle('dark');
    }