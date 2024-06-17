document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.header__hamburger');
    const nav = document.querySelector('.header__nav');

    hamburger.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
});


