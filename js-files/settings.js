function init()         // loading the selected values into the local storage and displaying it in the output of the range inputs.
{
    document.querySelector("#height").value = localStorage['height'];
    document.querySelector("#width").value = localStorage['width'];
    document.querySelector("#speed").value = localStorage['speed'];
    document.querySelector("#fruits").value = localStorage['fruits'];
    document.querySelector("#height").nextElementSibling.value =  localStorage['height'];
    document.querySelector("#width").nextElementSibling.value =  localStorage['width'];
    document.querySelector("#fruits").nextElementSibling.value =  localStorage['fruits'];
    document.querySelector("#speed").nextElementSibling.value =  localStorage['speed'];
}

//Function that is triggered by the go back button and reopens the index page.
function goBack()
{
    SaveSettings();
    window.location.replace("index.html");   
}

//Function that is triggered by the go advanced button and displays the settings2 page.
function goAdvanced()
{
    SaveSettings();
    window.location.replace("settings2.html");
}
function SaveSettings()     //saving settings globally so they stay set when the settings page is left.
{
    localStorage['height'] = document.querySelector("#height").value;
    localStorage['width'] = document.querySelector("#width").value;
    localStorage['fruits'] = document.querySelector("#fruits").value;
    localStorage['speed'] = document.querySelector("#speed").value;
}
document.addEventListener("DOMContentLoaded", init, false);  //necessary to call init function. 