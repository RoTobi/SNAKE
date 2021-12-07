//Function that is triggered by the start game-button and opens the game itself.
function startSnake()
{
    window.location.replace("snake.html");
}
//Function that is triggered by the settings-button and opens settings.
function enterSettings()
{
    window.location.replace("settings.html");
}
//Function that is triggered by the instructions-button and displays those.
function enterInstructions()
{
    window.location.replace("instructions.html");
}
//Function to save the volume set by the user for all pages.
function SaveVolume() 
{
    localStorage['volume'] = document.querySelector("#volume").value;
}
//Function to save the chosen backgroundcolor
function SaveBGColor()
{
    if (document.querySelector("#switcherBackground").checked == false)
    {
        localStorage['bgcolor'] = 0;
    }
    else
    {
        localStorage['bgcolor'] = 1;
    }
}

//Function to reload the page to instantly display the new background color
function bgreload()
{
    window.location.reload();
}

function init()
{

    if (typeof localStorage['height'] === 'undefined'
    || typeof localStorage['width'] === 'undefined'
    || typeof localStorage['fruits'] === 'undefined'
    || typeof localStorage['speed'] === 'undefined' 
    || typeof localStorage['Startlänge'] === 'undefined'
    || typeof localStorage['Checkbox'] === 'undefined'
    || typeof localStorage['Checkbox2'] === 'undefined'
    || typeof localStorage['bgcolor'] === 'undefined'
    || typeof localStorage['volume'] === 'undefined'
    || typeof localStorage['linecolor'] === 'undefined'
    || typeof localStorage['pitchcolor'] === 'undefined') // default values for the various settings. 
    {
       localStorage['height'] = 17;
       localStorage['width']  = 17;
       localStorage['fruits'] = 2;
       localStorage['speed'] = 2;
       localStorage['Startlänge'] = 3;
       localStorage['Checkbox'] = 0;
       localStorage['Checkbox2'] = 0;
       localStorage['bgcolor'] = 0;
       localStorage['volume'] = 5;
       localStorage['linecolor'] = "#8EE5EE";
       localStorage['pitchcolor'] = "#363636";
    }
    document.querySelector("#volume").value = localStorage['volume']; //saving the value the user selected into the local storage.
    document.querySelector("#volume").nextElementSibling.value = localStorage['volume'] * 10; //multiplying the value so it's a 0-100 range in the volumes output.

    if (localStorage['bgcolor'] == 0)
    {
         document.querySelector("#switcherBackground").checked = false;
    }
    else
    {
        document.querySelector("#switcherBackground").checked = true;
    }
}

document.addEventListener("DOMContentLoaded", init, false); //necessary to call init function.
