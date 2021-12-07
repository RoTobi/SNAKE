# Snake - Make it yours
## A remake of the classic game "Snake" for the Lecture "Projekte der Wirtschaftsinformatik" at the FHDW Bergisch Gladbach

# Table of Contents
1. [Authors](#Authors)
2. [Date of Creation](#dateofcreation)
3. [Description](#description)
    1. [Version](#version)
    2. [Browser Compatibility](#compatibility)
    3. [Features](#features)
    4. [Known Bugs](#bugs)
    5. [3rd Party Components](#3rdparty)
    6. [License](#license)
4. [Distribution of Work](#distribution)
    1. [JavaScript Files](#js)
    2. [HTML Files](#html)
    3. [CSS Files](#css)
5. [How to use it](#usage)

## Authors <a name="Authors"></a>
Tobias Röper (GitHub: RoTobi) / Yannick Lorenz (GitHub: SirYannick21)

## Date of Creation <a name="dateofcreation">
This project has been started on October 9, 2021 and finalized on November 29, 2021.

## Description <a name="description">
The motivation of this project was to give new life to the game classic "Snake" we all know from various older devices.
Our approach was to recreate the original game and make it customizable for the user - hence the "make it yours" in the title.

### Version <a name="version">
Version 1.0

### Browser Compatibility <a name="compatibility">
All current versions popular browsers (Google Chrome 96.0.4664.45, Mozilla Firefox 94.0.2, Opera 81.0.4196.60 & Safari 15.1) are able to correctly display the contents of our project.
Internet Explorer however does not support it. This is caused by various CSS-Attributes we used in our project that are not supported by Internet Explorer.
To mention some of those Attributes: The Animation of the background is not supported, neither are the custom sliders we used in the settings. The animation of our heading was also displayed incorrectly. 

### Features <a name="features">
The game includes several customizable parameters, such as pitch height or pitch width, but many others.

### Known Bugs <a name="bugs">
The only bug known to us is a slight delay of the sounds when first played. This is caused by the sounds not being pre-loaded before the game is started.
When using Safari, the sounds don't play at all because Safari prevents playing data that is a direct part of the page and not contained in a media player of any kind.
When using Firefox, you can't close the game with the escape switch, only with the backspace switch.
If you come across a bug, please feel free to contact us via yannick.lorenz@edu.fhdw.de or tobias.roeper@edu.fhdw.de.

### 3rd Party Components <a name="3rdparty">
Only the webpage's icon and the graphic of the snake itself have been inspired by graphics we found online, but modified ourselves to fit our design.
Our game-over sound is by mixkit and thus under the mixkit license that allows free use for educational purposes.

The sound effect "mixkit-retro-arcade-lose-2027.wav" (https://mixkit.co/free-sound-effects/video-game/?page=2) is published under the mixkit license, allowing free use for educational purposes.

The sound effect "mixkit-video-game-win-2016.wav" (https://mixkit.co/free-sound-effects/video-game/?page=2) is published under the mixkit license, allowing free use for educational purposes.

The icon of the webpages is inspired by this favicon (https://www.favicon.cc/?action=icon&file_id=105978) which has been published under a default creative commons license and modified by us.

The files "snakeheadl.png", "snakeheado.png", "snakeheadr.png" and "snakeheadu.png" are modified version of this picture (http://pixelartmaker.com/art/010a8913aa52592).
Their origin does not include a license, but it mentions their graphics are free to use and free to modify. Since the author of the graphic can not be traced back, we can't include any information regarding the license.

For further information, please take a look at *license.txt*.

### License <a name="license">
This project is distributed under the MIT License. For further information, please take a look at *license.txt*.
The software and all its modules are only to be used for educational purposes.

## Distribution of Work <a name="distribution">
Below, you can find an overview about who did what.  (TR) = Tobias Röper / (YL) = Yannick Lorenz / (TR / YL) = both have contributed to the file.

### JavaScript-Files <a name="js">
1. background.js (TR / YL)
2. MinimumSizeOfWindow.js (TR / YL)
3. index.js (TR / YL)
4. main.js (TR)
5. settings.js (TR / YL)
6. settings2.js (TR / YL)
7. instructions.js (TR / YL)
8. gameover.js (TR / YL)
9. win.js (TR / YL)

### HTML-Files <a name="html">
1. index.html (YL)
2. instructions.html (YL)
3. settings.html (YL)
4. settings2.html (YL)
5. snake.html (TR / YL)
6. gameover.html (YL)
7. win.html (YL)

### CSS-Files <a name="css">
1. background.css (YL)
2. winBackground.css (YL)
3. index.css (YL)
4. instructions.css (YL)
5. settings.css (YL)
6. settings2.css (YL)
7. snake.css (TR / YL)
8. gameover.css (YL)
9. win.css (YL)

## How to use it <a name="usage">
Here is our recommended step-by-step plan on how to run Snake - make it yours.
1. Go to https://github.com/SirYannick21/Snake-WIP2021
2. Download the entire repository and extract the files from the .ZIP-Archive.
3. Once unpacked, open the repository with Visual Studio Code. 
4. If you don't have it installed yet, install the VS Code extension "Live Server".
5. Then, open the file index.html with the live server and start having fun!
