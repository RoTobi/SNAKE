function MinimumSizeOfWindow()                                           //function to constantly observe the window size and to display a warning if the minimal required size isn't matched.
{
    if (window.innerHeight < 600 || window.innerWidth < 900)            //necessary to display the warning if the window size is too small on the initial start of the game.
        {
            document.getElementsByClassName("windowWarning")[0].style.display = 'block';
            document.getElementsByClassName("mainWrapper")[0].style.display = 'none';
        }
        else
        {
            document.getElementsByClassName("windowWarning")[0].style.display = 'none';
            document.getElementsByClassName("mainWrapper")[0].style.display = 'block';
        }

    window.addEventListener('resize', function()
    {
        if (window.innerHeight < 600 || window.innerWidth < 900)      //used to dynamically adapt to live changes in window size in order to display the warning when it's required.
        {
            document.getElementsByClassName("windowWarning")[0].style.display = 'block';
            document.getElementsByClassName("mainWrapper")[0].style.display = 'none';
        }
        else
        {
            document.getElementsByClassName("windowWarning")[0].style.display = 'none';
            document.getElementsByClassName("mainWrapper")[0].style.display = 'block';
        }
    }, true);
}
document.addEventListener("DOMContentLoaded", MinimumSizeOfWindow, false);  //necessary to call MimimumSizeOfWindow function.