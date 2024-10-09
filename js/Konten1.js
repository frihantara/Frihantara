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

const apiUrl = "http://localhost:3000/comments"; // API JSON Server
const currentUserName = prompt(
  "Masukkan nama Anda untuk mengidentifikasi komentar:"
);

// Fungsi untuk menambahkan komentar
async function addComment() {
  const name = document.getElementById("name").value;
  const comment = document.getElementById("comment").value;

  if (name && comment) {
    const newComment = {
      name: name,
      comment: comment,
      timestamp: new Date(),
    };

    // Kirim komentar ke JSON Server
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    });

    loadComments();
    document.getElementById("name").value = "";
    document.getElementById("comment").value = "";
  } else {
    alert("Nama dan Komentar tidak boleh kosong!");
  }
}

 const apiUrl = 'http://localhost:3000/comments'; // URL JSON Server

        async function addComment() {
            const name = document.getElementById('name').value;
            const comment = document.getElementById('comment').value;

            if (name && comment) {
                const newComment = {
                    name: name,
                    comment: comment,
                    timestamp: new Date().toISOString()
                };

                // Kirim komentar ke JSON Server
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newComment)
                });

                loadComments(); // Refresh daftar komentar
                document.getElementById('name').value = ''; // Kosongkan input
                document.getElementById('comment').value = ''; // Kosongkan input
            } else {
                alert("Nama dan Komentar tidak boleh kosong!");
            }
        }

        async function loadComments() {
            const response = await fetch(apiUrl);
            const comments = await response.json();
            const commentsList = document.getElementById('commentsList');
            commentsList.innerHTML = ''; // Kosongkan sebelum memuat komentar baru

            comments.forEach(comment => {
                appendComment(comment);
            });
        }

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

        window.onload = loadComments;
