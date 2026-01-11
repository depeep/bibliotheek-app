// Sidebar toggle (mobiel)
document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("open");
});

// Dark mode toggle
document.getElementById("darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// SPA page loader
const links = document.querySelectorAll("nav a");
const content = document.getElementById("content");

links.forEach(link => {
  link.addEventListener("click", async () => {
    const page = link.getAttribute("data-page");

    // Highlight active link
    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    // Load page
    const response = await fetch(page);
    const html = await response.text();
    content.innerHTML = html;

    // Sluit sidebar op mobiel
    document.getElementById("sidebar").classList.remove("open");
  });
});