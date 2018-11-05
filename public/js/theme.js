var darkTheme = false; //Cookies.get('darkTheme');
setTheme(darkTheme);

function setTheme(dark) {
    if (dark) {
        //$('body').css('background-color', 'rgb(33, 33, 33)');

        document.body.style.backgroundColor = 'rgb(33,33,33';

        //$('.dark-on-white').css('color', '#fff');

        document.getElementsByClassName('dark-on-white').style.color = '#fff';
    } else {
        //$('body').css('background-color', '#eeeeee');

        document.body.style.backgroundColor = '#eeeeee';

        //$('.dark-on-white').css('color', '#000');

        document.getElementsByClassName('dark-on-white').style.color = '#000';
    }
}

function toggleTheme() {
    if (!darkTheme) {
        /*$('body').css('background-color', 'rgb(33, 33, 33)');
        $('.dark-on-white').css('color', '#fff');
        $('input').css('color', '#fff');*/

        document.body.style.backgroundColor = 'rgb(33,33,33)';
        document.getElementsByClassName.style.color = '#fff';
        document.getElementsByTagName('input').style.color = '#fff';

        darkTheme = true;
    } else {
        /*$('body').css('background-color', '#eeeeee');
        $('.dark-on-white').css('color', '#000');
        $('input[name="text"]').css('color', '#000');*/

        document.body.style.backgroundColor = '#eeeeee';
        document.getElementsByClassName.style.color = '#000';
        document.getElementsByTagName('input').style.color = '#000';

        darkTheme = false;
    }

    Cookies.set('darkTheme', darkTheme);
}

/*$('#dark-theme').click(function () {
    toggleTheme();
});*/

document.getElementById('themeToggle').click(() => {
    toggleTheme();
});