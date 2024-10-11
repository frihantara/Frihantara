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

document.getElementById('submit-btn').addEventListener('click', function () {
    var commentInput = document.getElementById('comment-input');
    var commentText = commentInput.value.trim();

    if (commentText !== "") {
        var commentList = document.getElementById('comments-list');

        // Membuat elemen div untuk komentar
        var commentDiv = document.createElement('div');
        commentDiv.className = 'comment';

        // Menambahkan teks komentar
        var commentContent = document.createElement('p');
        commentContent.className = 'comment-text';
        commentContent.textContent = commentText;

        // Menambahkan waktu komentar
        var commentTime = document.createElement('p');
        commentTime.className = 'comment-time';
        commentTime.textContent = new Date().toLocaleString();

        // Menggabungkan teks dan waktu ke div komentar
        commentDiv.appendChild(commentContent);
        commentDiv.appendChild(commentTime);

        // Menambahkan komentar ke daftar
        commentList.appendChild(commentDiv);

        // Kosongkan kotak input
        commentInput.value = '';
    }
});