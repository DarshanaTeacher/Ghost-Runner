var ghost, ghostjumpImg, ghoststandImg;
var tower, towerImg;
var invisiblegrd;
var door, doors, doorImg, climber, climbers, climberImg;
var step, steps;
var start, play, end;
var gamestate;
var gameover, score;



function preload()
{
  //Load Ghost Images
  ghostjumpImg = loadImage("ghost-jumping.png");
  ghoststandImg = loadImage("ghost-standing.png");
  
  //Load tower Image
  towerImg = loadImage("tower.png");
  
  //Load door and climber images
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
    
}



function setup()
{
  createCanvas(600,600);
  
  //create tower sprite
  tower = createSprite(300,300,400,600);
  tower.addImage("tower",towerImg);
  
  
  //create ghost sprite
  ghost = createSprite(300,250,50,50);
  ghost.addImage("ghost",ghoststandImg);
  ghost.scale = 0.4;
  
  //create invisible ground
  invisiblegrd = createSprite(300,550,600,10);
  invisiblegrd.visible = false;
  
  
  //create gameover
  gameover = createSprite(300,590,500,5);
  gameover.visible = 0;
  
  
  //create doors and climbers group
  doors = createGroup();
  climbers = createGroup();
 
  
  
  //declare initial gamestate
  gamestate = "start";
  score = 0;
  
  

}



function draw()
{
  
  
  background("lightgrey");
  drawSprites();
  
 // console.log(gamestate); 
  
      if(gamestate === "start")
      {  
    
        fill("white");
        textSize(20);
        text("Press P to PLAY",200,100);
        text("Space = Jump, Leftarrow = Left, Rightarrow = Right",70,150)
        ghost.collide(invisiblegrd);
      } 
  
      fill("white");
      text("SCORE : "+score, 400, 50);
      if(keyDown("p"))
      {  
        gamestate = "play"; 
        
      }
      if(gamestate === "play")
      {  
        ghost.collide(invisiblegrd);
    
       //moving background
        tower.velocityY = 2;
        if(tower.y > 500)
        {
          tower.y = 200;
        }
        gameplay();

        spawndoor();
        if(climbers.isTouching(ghost))
        {
             score = score + 1;
             ghost.setVelocity(0,0);
             gameplay();
             invisiblegrd.destroy();
             
        }
        if(ghost.isTouching(gameover))
        {
          ghost.collide(gameover);
          gamestate = "end";
          console.log(gamestate);
        }  
      }
  if(gamestate === "end")
      {
        ghost.destroy();
        tower.setVelocity(0,0);
        textSize(50);
        fill("Blue");
        text("Game Over",120,300);
      }  
      
      
      
}


function spawndoor()
{
  if(frameCount % 200 === 0){
  //create door sprite
  door = createSprite(random(200,400),0,20,40);
  door.addImage("door",doorImg);
  door.velocityY = 2;
  door.lifeTime = 50;
  doors.add(door);  
    
  //create climber sprite
  climber = createSprite(10,50,50,10);
  climber.addImage("climber",climberImg);  
  climber.x = door.x;
  climber.velocityY = 2;
  climber.lifeTime = 50;
  climbers.add(climber);
  door.depth = ghost.depth - 1
 
  }
}

function gameplay()
{
    //jumping ghost
         if(keyDown("space"))
         {
            ghost.velocityY = -4;      
         }
         ghost.velocityY = ghost.velocityY + 0.8;
  
         if(keyDown("left"))
          {
            ghost.x = ghost.x - 3;
          }
  
         if(keyDown("right"))
          {
            ghost.x = ghost.x + 3;
          }
  
}
