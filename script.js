// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll behavior
document.querySelectorAll('a[href^=\"#\"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
