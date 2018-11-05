var goTop = document.getElementById('goTop');

window.addEventListener('scroll', (e) => {
    var scroll = window.scrollY;

    if (scroll > 100) {
        goTop.style.bottom = '2em';
    } else {
        goTop.style.bottom = '-5em';
    }
});

goTop.addEventListener('click', () => {
    scroll(0,0);
});