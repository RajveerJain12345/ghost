var tower,towerimg;
var door, doorimg,doorGroup;
var climber, climberimg, climberGroup;
var ghost, ghostimg;
var invisibleBlock,invisibleBlockGroup;
var gamestate="play";
var song;
function preload(){
  towerimg=loadImage("tower.png");
  doorimg=loadImage("door.png");
  climberimg=loadImage("climber.png");
  ghostimg=loadImage("ghost-standing.png");
  song=loadSound("spooky.wav");
}
function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage("tower",towerimg);
  tower.velocityY=1;
  
  
  ghost=createSprite(300,300);
  ghost.addImage("ghost",ghostimg);
  doorGroup=new Group();
  climberGroup=new Group();
  ghost.scale=0.4;
  invisibleBlockGroup=new Group();
}
function draw (){
 background(0);
 if(gamestate==="play"){
    if(keyDown("space")){
    ghost.velocityY=-5;
  
  }
ghost.velocityY=ghost.velocityY+0.8;
  // song.loop();
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
    
  }
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
   if(tower.y>400){
   tower.y=300;
   
 }

  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
      ghost.destroy();
      gamestate="end";
    }
    spawnDoors();
  drawSprites();
 }
 if(gamestate==="end") {
   fill("red");
   stroke("red");
   textSize(35);
   text("GAME OVER",195,300);
   
 }
 
}

function spawnDoors(){
  if(frameCount %250==0){
    door=createSprite(200,-50);
    door.addImage("door",doorimg);
    door.velocityY=1
    door.x=Math.round(random(120,420));
    door.lifetime=800;
    doorGroup.add(door);
   
    climber=createSprite(200,10);
    climber.addImage("climber",climberimg);
    climber.velocityY=1;
    climber.x=door.x;
    climber.lifetime=800;
    climberGroup.add(climber);
    ghost.depth=door.depth;
    ghost.depth+=1;
    invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    invisibleBlock.debug=true;
    invisibleBlockGroup.add(invisibleBlock);
  
  }
  
  
  
  
}
