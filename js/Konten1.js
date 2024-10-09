// toggle class active
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger diklik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// klik diluar hamburger
const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetID = this.getAttribute("href");
    const targetElement = document.querySelector(targetID);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

const apiUrl = 'http://localhost:3000/comments'; // URL JSON Server

// Fungsi untuk menambahkan komentar
async function addComment() {
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    if (name && comment) {
        const newComment = {
            name: name,
            comment: comment,
            timestamp: new Date().toISOString()
        };

        // Kirim komentar ke JSON Server (POST request)
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
        });

        if (response.ok) {
            loadComments(); // Refresh daftar komentar
            document.getElementById('name').value = ''; // Kosongkan input
            document.getElementById('comment').value = ''; // Kosongkan input
        } else {
            alert("Gagal menambahkan komentar!");
        }
    } else {
        alert("Nama dan Komentar tidak boleh kosong!");
    }
}

// Fungsi untuk mengambil komentar dari JSON Server
async function loadComments() {
    console.log('Mencoba memuat komentar...'); // Log untuk debug
    const response = await fetch(apiUrl);
    const comments = await response.json();
    console.log(comments); // Lihat komentar yang diambil
    // ...
}


// Fungsi untuk menampilkan komentar di halaman
function appendComment(comment) {
    const commentsList = document.getElementById('commentsList');
    const commentElement = document.createElement('div');
    commentElement.className = 'comment-item';
    commentElement.innerHTML = `
        <p><strong>${comment.name}</strong>: ${comment.comment}</p>
        <small>Ditambahkan pada: ${new Date(comment.timestamp).toLocaleString()}</small>
    `;
    commentsList.appendChild(commentElement);
}

// Muat komentar ketika halaman dibuka
window.onload = loadComments;
