document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.pop');

  function showAll() {
    images.forEach(img => img.classList.add('visible'));
  }

  // Safety: show after 1.2s no matter what
  setTimeout(showAll, 1200);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    images.forEach(function(img) {
      observer.observe(img);
    });
  } else {
    showAll();
  }

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  if (lightbox && lightboxImg) {
    images.forEach(function(img) {
      img.addEventListener('click', function() {
        lightboxImg.src = this.src;
        lightbox.style.display = 'flex';
      });
    });

    lightbox.addEventListener('click', function() {
      this.style.display = 'none';
    });
  }
});