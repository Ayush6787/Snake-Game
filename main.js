const canvas=document.getElementById('game');
const ctx=canvas.getContext('2d');
class snakePart{
constructor(x, y){
    this.x=x;
    this.y=y;
}

}

let speed=5;
let tileCount=20; 

let tileSize=canvas.clientWidth/tileCount-2;
let headX=10;
let headY=10;


const snakeParts=[];
let tailLength=2;


let xvelocity=0;
let yvelocity=0;


let appleX=5;
let appleY=5;


let score=0;


function drawGame(){
    changeSnakePosition();
    let result=isGameOver();
    if(result){
        return;
    }
    clearScreen();
    drawSnake();
    drawApple();
  
    checkCollision()
    drawScore();
    setTimeout(drawGame, 1000/speed);
}
function isGameOver(){
    let gameOver=false; 
  
    if(yvelocity===0 && xvelocity===0){
        return false;
    }
    if(headX<0){
        gameOver=true;
    }
    else if(headX===tileCount){
        gameOver=true;
    }
    else if(headY<0){
        gameOver=true;
    }
    else if(headY===tileCount){
        gameOver=true;
    }


     for(let i=0; i<snakeParts.length;i++){
         let part=snakeParts[i];
         if(part.x===headX && part.y===headY){
                       gameOver=true;
             break; 
         }
     }
    

    
    if(gameOver){
     ctx.fillStyle="white";
     ctx.font="50px verdana";
     ctx.fillText("Game Over! ", canvas.clientWidth/6.5, canvas.clientHeight/2);
    }

    return gameOver;
}


function drawScore(){
ctx.fillStyle="white"
ctx.font="10px verdena"
ctx.fillText("Score: " +score, canvas.clientWidth-50,10); 

}


 function clearScreen(){

ctx.fillStyle= 'black'
ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight)

 }
 function drawSnake(){
    
    ctx.fillStyle="green";
    
    for(let i=0;i<snakeParts.length;i++){
                let part=snakeParts[i]
         ctx.fillRect(part.x *tileCount, part.y *tileCount, tileSize,tileSize)
    }
    
    snakeParts.push(new snakePart(headX,headY));
        if(snakeParts.length>tailLength){
        snakeParts.shift();
        

    }
    ctx.fillStyle="orange";
    ctx.fillRect(headX* tileCount,headY* tileCount, tileSize,tileSize)


 }
 function changeSnakePosition(){
     headX=headX + xvelocity;
     headY=headY+ yvelocity;
     
 }
 function drawApple(){
     ctx.fillStyle="red";
     ctx.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize)
 }
 
 function checkCollision(){
     if(appleX==headX && appleY==headY){
         appleX=Math.floor(Math.random()*tileCount);
         appleY=Math.floor(Math.random()*tileCount);
         tailLength++;
         score++; 

     }
 }
 
 document.body.addEventListener('keydown', keyDown);

function keyDown()
//up
{
    if(event.keyCode==87){
        
        if(yvelocity==1)
        return;
        yvelocity=-1;
        xvelocity=0;
        
    }
    //down
    if(event.keyCode==83){
        if(yvelocity==-1)
        return;
        yvelocity=1;
        xvelocity=0;
    }

//left
    if(event.keyCode==65){
        if(xvelocity==1)
        return;
        yvelocity=0;
        xvelocity=-1;
    }
    //right
    if(event.keyCode==68){
        if(xvelocity==-1)
        return;
        yvelocity=0;
        xvelocity=1;
    }
}

 drawGame();