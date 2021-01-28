 let song
let img;
let img1;
var ball_diameter = 20;
var bomb_diameter = 10;
var xpoint;
var ypoint;
var zapperwidth = 6;
var numofbombs = 20;
var bombposX =[];
var bombposY = [];
var bombacceleration = [];
var bombvelocity = [];
var time = 0;
var timeperiod = 0;
var score = 0;
var posX;
var mode;


function preload() {
  img = loadImage('526488647-22.jpg')

  img1 =loadImage('526488647-1.jpg')
  
  song = loadSound('Slow Burn - Corbyn Kites Free Background Music For YouTube Videos No Copyright Download MP3.mp3');

}



function setup() {
  mode=0;
  
  createCanvas(650,480)
  
  var temp00 =0, temp01 = -20;
  while(temp01 < height){
    temp00 += 0.02;
    temp01 += temp00;
    timeperiod++;
  }
  
  posX = zapperwidth + 0.5*ball_diameter - 2;
  xpoint = 0.5 * width;
  ypoint = height - 0.5*ball_diameter + 1;
  
  initbombpos();

}

function draw() {
 clear();
  if (mode == 0) {
    background("black")
    fill("blue")
    text('PRESS ENTER TO START', 250, 390);
    text('PRESS H FOR HELP',265,450)
    image(img, 1, 1);
  }
   if (mode == 1) {
  background(0);
  
  fill(239, 58, 38);
  rect(0, 0, zapperwidth, height);
  
  scoreUpdate();
  

  fill("blue")
  for(var i=0; i<numofbombs; i++){
    ellipse(bombposX[i], bombposY[i], bomb_diameter, bomb_diameter);
  }
  
  updatebombpos();
  
  fill("blue")
    ellipse(xpoint, ypoint, ball_diameter, ball_diameter);
  xpoint -=3;
  
  if(mouseIsPressed && (xpoint + 0.5 *ball_diameter) <width){
    xpoint +=6;
  }
  
  if(xpoint < posX || bombCollisionTest()){
    gameover();
  }
  
  
  time++;

}
 

 if(mode==2){
    background("black")
    fill("blue")
    text('Hello I see you went to help',250,100);
    text('This is a very simple and fun game',238,150)
    text('The point of this game is to last the longets while doging the balls',160,200)
    text('Press the left mouse button to go to the right and leave it to go to the left',130,250)
    text('Make Sure Not To Go To Far to the left or you will die by the blue zapper',135,300)
    text('If you ever feel like you want to exit press Up arrow and if you would wanna restart Press Enter Have Fun!!!',60,350)
    text('Also if you hold the left mouse button it will play music',175,400)
    
  }
  
  if(mode==3){
   background("black")
    text('Oh I see you wanna exit',250,400)
    text('Well come back any time to play or press Enter to play again',170,450)
       image(img1, 0, 1);  
    
    
  }
  
  
}


function initbombpos(){
  for(var i=0; i<numofbombs; i++){
    bombacceleration[i] = random(0.02, 0.03);
    bombvelocity[i] = random(0, 5);
    bombposX[i] = random(zapperwidth+(0.5*ball_diameter), width);
    bombposY[i] = random(-20, -0.5*ball_diameter);
  }
}
  

function updatebombpos(){
  
  for(var i=0; i<numofbombs; i++){
    bombvelocity[i] += bombacceleration[i];
    bombposY[i] += bombvelocity[i];
  }
  
  if(time > timeperiod){
    initbombpos();
    time = 0;
  }
  
}


function bombCollisionTest(){
  var temp = 0.5*(ball_diameter+bomb_diameter)-2;
  var distance;
  
  for(var i=0; i<numofbombs; i++){
    distance = dist(xpoint, ypoint, bombposX[i], bombposY[i]);
    if(distance < temp){
      return true;
    }
  }
  return false;
  
}




function gameover(){
  fill(225);
  text("GAME OVER", 0.5*width, 0.5*height);
  noLoop(); 
  
}

function scoreUpdate(){
  score += 10;
  fill(225)
  text("SCORE: " + int(score/timeperiod), width - 65, 10);
}




function keyPressed() {
  if (keyCode === ENTER) {
    mode = 1;

  }
  if(key === "h"){
    mode =2;
    
  }
  
  if(keyCode === UP_ARROW){
    mode=3;
    
  }
  

}


//Click of the music
function mousePressed() {
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.stop();
    
  } else {
    song.play();
  
  }
}

