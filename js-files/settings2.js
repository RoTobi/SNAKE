function init() // loading the selected values into the local storage and displaying it in the output of the range inputs.
{
    document.querySelector("#length").value = localStorage['Startlänge'];
    document.querySelector("#length").nextElementSibling.value = localStorage['Startlänge'];
    document.querySelector("#colorPick").value = localStorage['linecolor'];
    document.querySelector("#colorPick2").value = localStorage['pitchcolor'];
    if (localStorage['Checkbox'] == 0)
    {
         document.querySelector("#switcher2").checked = false;
    }
    else
    {
        document.querySelector("#switcher2").checked = true;
    }
    if (localStorage['Checkbox2'] == 0)
    {
         document.querySelector("#switcher1").checked = false;
    }
    else
    {
        document.querySelector("#switcher1").checked = true;
    } 

}

function goBack()   //Function that is triggered by the go back button and reopens the index page.
{
    SaveSettings();
    window.location.replace("index.html");
}

function goSettings()  //Function that is triggered by the go advanced button and displays the settings page.
{
    SaveSettings();
    window.location.replace("settings.html");
}
function SaveSettings()  //saving settings globally so they stay set when the settings page is left.
{
    localStorage['Startlänge'] = document.querySelector("#length").value;
    localStorage['linecolor'] = document.querySelector("#colorPick").value;
    localStorage['pitchcolor'] = document.querySelector("#colorPick2").value;
    if (document.querySelector("#switcher2").checked == false)
    {
        localStorage['Checkbox'] = 0;
    }
    else
    {
        localStorage['Checkbox'] = 1;
    }
    
    if (document.querySelector("#switcher1").checked == false)
    {
        localStorage['Checkbox2'] = 0;
    }
    else
    {
        localStorage['Checkbox2'] = 1;
    }

}

document.addEventListener("DOMContentLoaded", init, false);  //necessary to call init function.