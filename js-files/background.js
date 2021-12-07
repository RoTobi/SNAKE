function background()
{                                        //this function is resposible for enabling and disabling the arcade-mode background animation.
  if(localStorage['Checkbox'] == 0) 
  {
    document.getElementById("retro").style.display = "none"; //if the arcade-mode is disabled, the arcade graphics are not displayed.
  }
  else 
  {
    document.getElementById("normal").style.display = "none"; //if it's enabled, the normal graphics are not displayed.
  }
}

function backgroundColor()
{
  if(localStorage['bgcolor'] == 0)
  {
    document.getElementById("whiteBG").disabled = true;
    if (typeof document.getElementsByClassName("backgroundColor")[0] !== 'undefined')
    {
      document.getElementsByClassName("backgroundColor")[0].style.color = "white";
    }
  }
  else
  {
    document.getElementById("normalBG").disabled = true;

    var buttons = document.getElementsByTagName("button");
    for(i = 0; i<buttons.length; ++i)
    {
      document.getElementsByTagName("button")[i].style.color = "black";
    }
    
    var firstsettings = document.getElementsByClassName("settings1");
    for(j = 0; j<firstsettings.length; ++j)
    {
      document.getElementsByClassName("settings1")[j].style.color = "black";
    }

    var secondsettings = document.getElementsByClassName("settings2");
    for(k = 0; k<secondsettings.length; ++k)
    {
      document.getElementsByClassName("settings2")[k].style.color = "black";
    }
    
    var outputs = document.getElementsByTagName("output");
    for(l = 0; l<outputs.length; ++l)
    {
      document.getElementsByTagName("output")[l].style.border = "4px solid black";
      document.getElementsByTagName("output")[l].style.color = "black";
    }

    if(typeof document.getElementsByClassName("text")[0] !== 'undefined')
    {
      document.getElementsByClassName("text")[0].style.color = "black";
    }
    if(typeof document.getElementsByClassName("sound")[0] !== 'undefined')
    {
    document.getElementsByClassName("sound")[0].style.color = "black";
    }
    document.getElementsByClassName("windowWarning")[0].style.color = "black";
  }
}

document.addEventListener("DOMContentLoaded", background, false);  //necessary to call background function.
document.addEventListener("DOMContentLoaded", backgroundColor, false);  //necessary to call background function.