function confirmEdit(event){
    event.preventDefault();

    if(book){
        book.title = document.getElementById("bookName").value;
        book.author = document.getElementById("author").value;
        book.category = document.getElementById("category").value;
        book.desc = document.getElementById("description").value;
    }

    document.getElementById("overlay").style.display = "flex";
    document.getElementById("successBox").style.display = "block";

    setTimeout(() => {
        window.location.href = "Admin Books list.html";
    }, 1500);
}

let deleteId = null;

function openDeletePopup(id){
    deleteId = id;
    document.getElementById("overlay").style.display = "flex";
}

function confirmDelete(){
    const index = myBooks.findIndex(b => b.id === deleteId);

    if(index !== -1){
        myBooks.splice(index, 1);
    }

    document.getElementById("confirmBox").style.display = "none";
    document.getElementById("successBox").style.display = "block";
}

function closePopup() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("confirmBox").style.display = "block";
    document.getElementById("successBox").style.display = "none";
}

const myBooks = [
    { id: "1", title: "Clean Code", author: "Robert C. Martin", category: "Programming", desc: "Amazing book for clean code." },
    { id: "2", title: "Eloquent JavaScript", author: "Marijn Haverbeke", category: "Programming", desc: "Deep dive into JS." },
    { id: "3", title: "Design Patterns", author: "Erich Gamma", category: "Design", desc: "Classic software patterns." }
];

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const book = myBooks.find(b => b.id === id);

window.onload = function(){
    if(book){
        document.getElementById("bookName").value = book.title;
        document.getElementById("author").value = book.author;
        document.getElementById("category").value = book.category;
        document.getElementById("description").value = book.desc;
    }
}