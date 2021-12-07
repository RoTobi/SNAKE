const fruitCollection = ["lib/fruits/image_grapes.png", "lib/fruits/image_apple.png", "lib/fruits/image_kiwi.png", "lib/fruits/image_pear.png", "lib/fruits/image_pineapple.png", "lib/fruits/image_melon.png","lib/fruits/image_lemon.png"];
const retroCollection = ["lib/retro/retro_apple.png", "lib/retro/retro_grapes.png", "lib/retro/retro_kiwi.png", "lib/retro/retro_lemon.png", "lib/retro/retro_melon.png", "lib/retro/retro_pear.png", "lib/retro/retro_pineapple.png"];
const snakeHeadCollection = ["lib/snakeheadl.png", "lib/snakeheado.png", "lib/snakeheadu.png", "lib/snakeheadr.png" ];
const snakeBodyCollection = ["lib/snakebodyl.png", "lib/snakebodyo.png", "lib/snakebodyu.png", "lib/snakebodyr.png" ];     // images which have to be preloaded

var audioWin;
var audioDeath; 
var audioFood;   // defintion of Sounds

const startx = 1;  
const starty = 1; // starting coordinates of the pitch 

const boxSize = 30;  // size of every cell of the pitch

const startLength = parseInt(localStorage['Startlänge']);  // startlength of snake (how much body parts)

const volume = localStorage['volume'] * 0.1;   // volume for the sounds

var speedSliderValue = localStorage['speed'];      
var speedArray = [12,10,8,6,4];
var speed = speedArray[localStorage['speed'] - 1]; 
var speedAracade;                                   // speed of the snake

      
const DriveThroughWall = localStorage['Checkbox2']; // DriveThroughWall is activated or not

const ArcadeMode = localStorage['Checkbox'];  // ArcadeMode is activated or not

const numberOfLines = localStorage['height']; 
const numberOfColumns = localStorage['width']; // columns and lines of the pitch

const numberOfFruits = localStorage['fruits']; // number of fruits in the pitch

const linecolor = localStorage['linecolor']; // color of lines in the pitch

var direction = 3;  // start direction of snake

var ArcadeCounter = 0; // use for correct movement in arcade mode

const pitchWidth = numberOfColumns * boxSize; 
const pitchHeigth = numberOfLines * boxSize;   // width and height of pitch      

var fruitCounter = 0;                         // count the eaten fruits

var snakeHeadPositions = [];                  // Storage of positions of snake Head

var canvas;                                   
var ctx;

var KEY_UP;    
var KEY_DOWN;  
var KEY_LEFT;  
var KEY_RIGHT;         // variables for the recognition of keystrokes

var verticalMovement = true;          
var horizontalMovement = true;   
var snakeDirectionLeft = false;             
var snakeDirectionDown = true;            // auxiliary variables for movement of snake       

var gameStarted;             // shows if the game has started

var fruits = [];       // storage of created fruits

var fruitsImgs = [];   // images of fruits

var snakeBody = [];    // storage of snake Body parts

var snakeBodyImgs = []; // images of snake body     

var snakeHead =        // definiton of snake Head with attributes
    {      
      x : startx + boxSize/12 + (startLength +  1) * boxSize,   
      y : starty + boxSize/12 + 2 * boxSize,                    
      width: boxSize * 5/6,                                     
      height: boxSize * 5/6,                                    
      destroyed: false,                                        
    };        

var snakeHeadImgs = [];  // images of snake Head

var PositionOfBoxes = [];                                   // Saving positions of every cell in the pitch and if they are currently occupied
for (i = 0; i < numberOfColumns; i++)
{
  for (j = 0; j < numberOfLines; j++)
  {
    var PositionOfBox = 
        {
          x: startx + boxSize/12 + i * boxSize,
          y: starty + boxSize/12 + j * boxSize,
          occupied: false
        }
    PositionOfBoxes.push(PositionOfBox);
  }
}
        
function keyboard(ev)                             // function for recognition of keystrokes
{
  var key_press = String.fromCharCode(ev.keyCode);
  if ((key_press == "W" || key_press == "&") && verticalMovement == true)  //  the sign '&' is equal to arrow up
  {
    KEY_UP = true;                                             
    KEY_DOWN = false;
    KEY_LEFT = false;
    KEY_RIGHT = false;
    gameStarted = true;
  }
  else if ((key_press == "A" || key_press == "%") && horizontalMovement == true && gameStarted == true)    // the sign '%' is equal to arrow left
  {
    KEY_LEFT = true;
    KEY_RIGHT = false;
    KEY_UP = false;
    KEY_DOWN = false;
  }
  else if ((key_press == "S" || key_press == "(") && verticalMovement == true)   //  the sign '(' is equal to arrow down
  {
    KEY_DOWN = true;
    KEY_UP = false;
    KEY_LEFT = false;
    KEY_RIGHT = false;
    gameStarted = true;
  }
  else if ((key_press == "D" || key_press == "'") && horizontalMovement == true)  // the sign "'"" is equal to arrow right
  {
    KEY_RIGHT = true;
    KEY_LEFT = false;
    KEY_UP = false;
    KEY_DOWN = false;
    gameStarted = true;
  }
  if (ev.keyCode == "8" || ev.keyCode == "27") // if esc or backspace pressed you go back to index.html
  {
    window.location.replace("index.html");
  } 
}

function init() // init function
{
  console.log("init called");
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  canvas.height = pitchHeigth + 2;
  canvas.width = pitchWidth + 2;
  canvas.style.background = localStorage['pitchcolor'];
  audioDeath = document.getElementById("audioDeath");
  audioDeath.volume = volume;
  audioFood = document.getElementById("audioFood");
  audioFood.volume = volume;
  audioWin = document.getElementById("audioWin");
  audioWin.volume = volume;
  checkArcadeMode(); 
  MinimumSizeOfWindow();
  preloadAssets();
  setInterval(gameLoop,1000/50);
  
}
      
function preloadAssets() // function to preload assest before the game starts
{
  var _toPreload = 0;

  var addImage = function (src) 
  {

    var img = new Image();
    img.src = src;
    _toPreload++;

    img.addEventListener('load', function () 
    {
      _toPreload--;
    }, false);
    return img;
  }


  for (i = 0; i < fruitCollection.length; i++)
  {
    if (localStorage['Checkbox'] == 0)
    {
        fruitsImg = addImage(fruitCollection[i]);
        fruitsImgs.push(fruitsImg);
    }
    else
    {
        fruitsImg = addImage(retroCollection[i]);
        fruitsImgs.push(fruitsImg);
    }
  }
  for (i = 0; i < snakeHeadCollection.length; i++)
  {
    snakeHeadImg = addImage(snakeHeadCollection[i]);
    snakeHeadImgs.push(snakeHeadImg);
  }
  for (i = 0; i < snakeBodyCollection.length; i++)
  {
    snakeBodyImg = addImage(snakeBodyCollection[i]);
    snakeBodyImgs.push(snakeBodyImg);
  }


  var checkResources = function () 
  {
      if (_toPreload == 0)
          draw(); //6
      else
          setTimeout(checkResources, 200);
  }
  checkResources();
}

function checkArcadeMode() // function to check if arcade Mode is activated
{
  if (ArcadeMode == 1)
  {
    speedAracade = speed * 1;
    speed = 1;
  }
}
      
function gameLoop() //game-Loop routine
{
  update();
  draw();
}

function update() // update-routine
{
  CreateSnakeBody();
  CreateFruits();
  MovementSnake();
  CollisionDetection();
  CheckWin();
}

function MovementSnake() //update-subroutine for the movement
{
  if (ArcadeMode == 1)
  {
    if (ArcadeCounter == speedAracade)
    {
      MovementSnakeHead();
      SnakeThroughWall();
      MovementSnakeBody();
      ArcadeCounter = 0;
    }
    ArcadeCounter++;
  }
  else 
  {
    MovementSnakeHead();
    SnakeThroughWall();
    MovementSnakeBody();
  }
}

function CalculatePositionOfBox(x,y) // function to calculate the position of box for the given position (x,y)
{
  return Math.round((((x - startx - boxSize/12) / boxSize) * numberOfLines) + ((y - starty - boxSize/12) / boxSize)); 
}
   
function CheckMovement(z1,z2,z3) // function to check if given positions are between the lines in the pitch
{
  for (i = 0; i < z3; i++)
  {
    if (Math.round(z1 * 100 ) / 100 == Math.round(((z2 + boxSize/12) + i * boxSize)*100)/100)
    {
      return true;
    }
  }
  return false;
}
      
function MinimumSizeOfWindow() // function to prove if window size does not fall below the minimum size of window
{
  var minimumSizeX = pitchWidth + 200;
  var minimumSizeY = pitchHeigth + 200;
  if (window.innerHeight < minimumSizeY || window.innerWidth < minimumSizeX)
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
    if (window.innerHeight < minimumSizeY || window.innerWidth < minimumSizeX)
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
function MovementSnakeHead()  // update-subroutine for the Movement of the snake Head
{
  if (KEY_LEFT && snakeHead.destroyed == false)  // movement of snake Head if KEY_LEFT is activated
  {
    snakeDirectionLeft = true;
    if (CheckMovement(snakeHead.y,starty,numberOfLines) == true)
    {
      snakeHead.x -=  boxSize/speed;
      verticalMovement = true;
      horizontalMovement = false; 
      direction = 0;
    }
    else if (snakeDirectionDown == true)
    {
      snakeHead.y +=  boxSize/speed;
    }
    else if (snakeDirectionDown == false)
    {
      snakeHead.y -=  boxSize/speed;
    }
  }

  else if (KEY_RIGHT && snakeHead.destroyed == false) // movement of snake Head if KEY_RIGHT is activated
  {
    snakeDirectionLeft = false;
    if (CheckMovement(snakeHead.y,starty, numberOfLines) == true)
    {
      snakeHead.x +=  boxSize/speed;
      verticalMovement = true;
      horizontalMovement = false;
      direction = 3;               
    }
    else if (snakeDirectionDown == true)
    {
      snakeHead.y +=  boxSize/speed;
    }
    else if (snakeDirectionDown == false)
    {
      snakeHead.y -=  boxSize/speed;
    }
  }

  else if (KEY_DOWN && snakeHead.destroyed == false)  // movement of snake Head if KEY_DOWN is activated
  {
    snakeDirectionDown = true;
    if (CheckMovement(snakeHead.x,startx,numberOfColumns) == true)
    {
      snakeHead.y +=  boxSize/speed;
      horizontalMovement = true;
      verticalMovement = false;
      direction = 2;
    }
    else if (snakeDirectionLeft == false)
    {
      snakeHead.x +=  boxSize/speed;
    }
    else if (snakeDirectionLeft == true)
    {
      snakeHead.x -=  boxSize/speed;
    }
  }

  else if (KEY_UP && snakeHead.destroyed == false) // movement of snake Head if KEY_UP is activated
  {
    snakeDirectionDown = false;
    if (CheckMovement(snakeHead.x,startx,numberOfColumns) == true)
    {
      snakeHead.y -=  boxSize/speed;
      horizontalMovement = true;
      verticalMovement = false;
      direction = 1;
    }
    else if (snakeDirectionLeft == false)
    {
      snakeHead.x +=  boxSize/speed;
    }
    else if (snakeDirectionLeft == true)
    {
      snakeHead.x -=  boxSize/speed;
    }
  }
}
      
function SnakeThroughWall() // update-subroutine if the DriveThroughWall-mode is activated
{
  if (ArcadeMode == 1 && DriveThroughWall == 1) // driveThroughWall-mode if arcade-mode is activated
  {
    if (snakeHead.x > startx + pitchWidth - snakeHead.width)
    {
      snakeHead.x = PositionOfBoxes[0].x
    }
    else if ( snakeHead.x < startx)
    {
      snakeHead.x = PositionOfBoxes[PositionOfBoxes.length-1].x;
    }
    else if (snakeHead.y < starty)
    {
      snakeHead.y = PositionOfBoxes[PositionOfBoxes.length-1].y;
    }
    else if (snakeHead.y > starty + pitchHeigth - snakeHead.width)
    {
      snakeHead.y = PositionOfBoxes[0].y;
    }
  }
  else if (ArcadeMode == 0 && DriveThroughWall == 1) // driveThroughWall-mode if arcade-mode is not activated
  {
    if (snakeHead.x <= PositionOfBoxes[0].x - ((boxSize/speed) * Math.floor(speed/2)))
    {
      snakeHead.x = PositionOfBoxes[PositionOfBoxes.length-1].x + ((boxSize/speed) * Math.floor(speed/2));
    }
    else if (snakeHead.y <= PositionOfBoxes[0].y - ((boxSize/speed) * Math.floor(speed/2)))
    {
      snakeHead.y = PositionOfBoxes[PositionOfBoxes.length-1].y + ((boxSize/speed) * Math.round(speed/2));
    }
    else if (snakeHead.y >= PositionOfBoxes[PositionOfBoxes.length-1].y + ((boxSize/speed) * Math.floor(speed/2)))
    {
      snakeHead.y = PositionOfBoxes[0].y - ((boxSize/speed) * Math.round(speed/2));
    }
    else if (snakeHead.x >= PositionOfBoxes[PositionOfBoxes.length-1].x + ((boxSize/speed) * Math.floor(speed/2)))
    {
      snakeHead.x = PositionOfBoxes[0].x - ((boxSize/speed) * Math.floor(speed/2));
    }
  }
}
    
function CheckWin() //update-subroutine to check if the player has collected enough fruits and the win.html gets displayed 
{
  if (fruitCounter == (numberOfColumns * numberOfLines) - startLength)
  {
    audioWin.play();
    snakeHead.destroyed = true;
    setTimeout (function() {window.location.replace("win.html")}, 2500);
  }
}
    
function CollisionDetection() //update-subroutine for the collision detection
{
  if ((snakeHead.x > startx + pitchWidth - snakeHead.width || snakeHead.x < startx || snakeHead.y < starty || snakeHead.y > starty + pitchHeigth - snakeHead.width) && snakeHead.destroyed == false && DriveThroughWall == 0)  // check if snake Head hits the wall
  {
    audioDeath.play();
    snakeHead.destroyed = true;
    setTimeout (function() {window.location.replace("gameover.html")}, 1500);
  }
  snakeBody.forEach(function(snakeBodyPart) // check if snake head hits the snake Body
  {
    if ((snakeHead.x == snakeBodyPart.x && snakeHead.y == snakeBodyPart.y) && snakeHead.destroyed == false)
    {
      audioDeath.play();
      snakeHead.destroyed = true;
      setTimeout (function() {window.location.replace("gameover.html")}, 1500);
    }
  });

  fruits.forEach(function(fruit) // check if snake head hits a fruit
  {
    if (Math.round(snakeHead.x * 1000) / 1000 == Math.round(fruit.x * 1000) / 1000 && Math.round(snakeHead.y * 1000) / 1000 == Math.round(fruit.y * 1000) / 1000)
    {
      fruits = fruits.filter(u => u != fruit);
      fruitCounter += 1;
      document.getElementById("score").innerHTML = fruitCounter;
      audioFood.pause();
      audioFood.currentTime = 0;
      audioFood.play();
    }
  });
}
    
function CreateFruits() // update-subroutine to create new fruits
{
  if (snakeHead.destroyed == false && fruits.length <= numberOfFruits - 1 && snakeBody.length >= startLength && CheckMovement(snakeHead.y,starty, numberOfLines) == true && CheckMovement(snakeHead.x,startx,numberOfColumns) == true) // check if the creation of new fruits is needed 
  {
    var RandomNumber = Math.round(Math.random() * (PositionOfBoxes.length-1)); // determination of a random number
    for (i = 0; i < snakeBody.length; i++)  // mark the positions of the snake Body as occupied
    {
      PositionOfBoxes[CalculatePositionOfBox(snakeBody[i].x,snakeBody[i].y)].occupied = true;
    }

    for (i = 0; i < fruits.length; i++) // mark the positions of fruits as occupied
    {
      PositionOfBoxes[CalculatePositionOfBox(fruits[i].x,fruits[i].y)].occupied = true;
    }

    PositionOfBoxes[CalculatePositionOfBox(snakeHead.x, snakeHead.y)].occupied = true;    // mark the position of snake Head as occupied

    for (i = 0; i < PositionOfBoxes.length; i++) // create fruit element addicted to random number and check if they are placable (positions are not occupied)
    {
      var BoxNumber = i + RandomNumber;
      if (BoxNumber >= PositionOfBoxes.length)
      {
        BoxNumber = BoxNumber - PositionOfBoxes.length;
      }
      var fruit = 
      {
        x: PositionOfBoxes[BoxNumber].x,
        y: PositionOfBoxes[BoxNumber].y,
        width: boxSize * 5/6,
        height: boxSize * 5/6,
        img: fruitsImgs[Math.round(Math.random() * (fruitCollection.length - 1))]
      }
      if (PositionOfBoxes[BoxNumber].occupied == false) // create fruit
      { 
        fruits.push(fruit);
        for (i = 0; i < PositionOfBoxes.length; i++)
        {
          PositionOfBoxes[i].occupied = false;
        } 
        break;
      }
    }
  } 
}

function CreateSnakeBody() // update-subroutine to create new snake Body parts
{ 
  if (snakeHead.destroyed == false && snakeBody.length <= startLength - 1)  // creation of new Body parts in the beginning of the game
  { 
    var snakeBodyPart = 
    {
      x: snakeHead.x - boxSize * (snakeBody.length + 1),
      y: snakeHead.y,
      width: boxSize * 5/6,
      height: boxSize * 5/6,
      recentlycreated: false,
      counter: -1,
      direction: 3
    };
    snakeBody.push(snakeBodyPart);
  }
  else if (snakeBody.length <= startLength - 1 + fruitCounter)             // creation of new Body parts after game has started
  {
    var snakeBodyPart = 
    {
      x: snakeBody[snakeBody.length -1 ].x,
      y: snakeBody[snakeBody.length -1 ].y,
      width: boxSize * 5/6,
      height: boxSize * 5/6,
      recentlycreated: true,
      counter: 0,
      direction: snakeBody[snakeBody.length -1].direction
    };
    snakeBody.push(snakeBodyPart);      
  }
}

function MovementSnakeBody() // update-subroutine for the Movement of the snake Body
{
  var countUsedPositions = 0;
  var snakeHeadPosition = // positions and direction of the snake Head
  {
    x : snakeHead.x,
    y : snakeHead.y,
    direction: direction
  }
  if (gameStarted == true) // save positions if game has started
  {
    snakeHeadPositions.push(snakeHeadPosition);
  }
  if (snakeHead.destroyed == false && gameStarted == true) 
  {
    for (i = 0; i < snakeBody.length; i ++)
    { 
      if (snakeBody[i].recentlycreated == true) // if the Part of the Body is recently created it can't move
      {
        snakeBody[i].counter += 1;
        if (snakeBody[i].counter == speed)
        {
          snakeBody[i].recentlycreated = false;
        }   
      }
      else if ((i+1) * speed < snakeHeadPositions.length)   // movement of the snake Body
      {
        snakeBody[i].x  = snakeHeadPositions[(snakeHeadPositions.length-1)-speed * (i +1)].x;
        snakeBody[i].y  = snakeHeadPositions[(snakeHeadPositions.length-1)-speed * (i +1)].y;
        snakeBody[i].direction = snakeHeadPositions[(snakeHeadPositions.length-1)-speed * (i +1)].direction;
        countUsedPositions++;
      }
      else  // movement of the snake Body at the beginning of game
      {
        snakeBody[i].x += boxSize/speed;
      }
    }
    if (countUsedPositions == snakeBody.length)    // delete non used positions of the snake Head
    {
      snakeHeadPositions.shift();
    }
  }
}

function drawPitch() //drawSubroutine for the pitch of the game
{
  ctx.strokeStyle = linecolor;
  for (i  = 0 ; i < numberOfColumns + 1; i++)
  {
    ctx.beginPath();
    ctx.moveTo(startx+i*boxSize,starty);
    ctx.lineTo(startx+i*boxSize,starty + pitchHeigth);
    ctx.stroke();
  }
  for (i  = 0 ; i < numberOfLines + 1; i++)
  {
    ctx.beginPath();
    ctx.moveTo(startx,starty + i * boxSize);
    ctx.lineTo(startx + pitchWidth,starty + i * boxSize);
    ctx.stroke();
  }
}
    
function drawFruits() //drawSubroutine for fruits on the pitch
{
  fruits.forEach(function(fruit) 
  {
    ctx.drawImage(fruit.img, fruit.x, fruit.y, fruit.width, fruit.height);
  });
}

function drawSnakeBody() //drawSubroutine for Body of Snake
{
  snakeBody.forEach(function(snakeBodyPart) 
  {
    ctx.drawImage(snakeBodyImgs[snakeBodyPart.direction], snakeBodyPart.x, snakeBodyPart.y, snakeBodyPart.width, snakeBodyPart.height);
  });
}

function drawSnakeHead() //drawSubroutine for Head of Snake
{
  ctx.drawImage(snakeHeadImgs[direction], snakeHead.x, snakeHead.y,  snakeHead.width,  snakeHead.height);
}
    
function draw() //draw 
{
  // delete content of canvas
  ctx.clearRect(0,0,canvas.width, canvas.height); 
  
  // draw-elements
  drawPitch();
  drawFruits();
  drawSnakeBody();
  drawSnakeHead();
}
    
document.addEventListener("DOMContentLoaded", init, false);  // call init function
document.addEventListener("keydown",keyboard, false);    // call keyboard function