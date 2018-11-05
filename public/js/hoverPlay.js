window.onload = function () {
    const vids = document.getElementsByTagName('video');

    for (let i = 0; i < vids.length; i++) {
        vids[i].addEventListener('mouseover', () => {
            vids[i].play();
        });
        vids[i].addEventListener('mouseout', () => {
            vids[i].pause();
        });
    }
};