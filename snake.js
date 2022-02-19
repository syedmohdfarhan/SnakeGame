function init(){
    var canvas = document.getElementById("mycanvas"); //document object is directly accesible in js 
    H= canvas.height =632;
    W =canvas.width = 1308;
    pen = canvas.getContext('2d'); 
    cs=66; //cell_size
    game_over=false;
    score=5;
 //create image object for food
   food_img = new Image();
   food_img.src = "apple.png"; 
//create trophy object 
   trophy = new Image();
   trophy.src = "trophy.png";
 //globally declaring food object so that it can be accessed in all f(x)'s
    food = getRandomFood(); //display this object in draw function
 //setting up a snake object (JSON like object) //
    snake ={
        init_length:5,
        color : "blue",
        cells: [] ,//snake has an array called cells
        direction : "right", //default direction
        createSnake : function(){
            for(var i=this.init_length; i>0; i--){ //this represents the current object so if u want to use any property of 
                                                   //the current object 
                this.cells.push({x:i,y:0}) //here, we are pushing both cordinates as an object
                //the D.S. which we use to store the cells of snake is (pair of array)

            }
        },
        drawSnake :function(){
//whenever u are doing wd fillRect method than it has its own default color (black) so we need to chnage color
             pen.fillStyle=this.color;
             for(var i=0; i<this.cells.length; i++){ //iterate over each x1,y1; x2,y2
                pen.fillRect(this.cells[i].x*cs, this.cells[i].y*cs, cs-2, cs-2); //map these x,y cordinates by mul. wd cs
            }                                                        //cs-2 :-> to seperate two cells

        },
        updateSnake : function(){ //update snake acc. to the direction property of the snake
            //ALSO UPDATE SNAKE LENGTH IF IT HAS EATEN THE FOOD, GENERATE NEW FOOD OBJECT AS WELL
            var headX=this.cells[0].x; //cell =[(x1,y1),(x2,y2)...], cells[0]=(x1,y1);
            var headY=this.cells[0].y;
            if (headX == food.x && headY== food.y){
                food = getRandomFood();//this'll gives us new cordinates of our food
                score++; //when snake eats food
            }
            else {
            this.cells.pop(); //extract a cell from last of array when there is no collision of snake nd food
            }

              var nextX,nextY;
             if (this.direction == "right"){
                 nextX = headX+1;
                 nextY = headY;
             }
              else if (this.direction == "left"){
                nextX = headX-1;
                nextY = headY;
            }
            else if (this.direction == "down"){
                nextX = headX;
                nextY = headY+1;
            }
            else {
                nextX = headX;
                nextY = headY-1;
            }
              this.cells.unshift({x:nextX,y:nextY});//unshift->insertion and this step will add a new head in rightmost direction
             //write a logic that prevents snake from going out
             var last_x=Math.round(W/cs);
             var last_y=Math.round(H/cs);
             if (this.cells[0].x<0 || this.cells[0].x>last_x || this.cells[0].y<0 || this.cells[0].y>last_y )
              {
                  game_over=true; //go to gameloop function
              } 
        }//update Snake end

    };

snake.createSnake(); //inside init function  
//ADD A EVENT LISTENER ON DOCUMENT OBJECT
//it was a user defined function
function keyPressed(e){ //e->implicit value which tells which key is pressed
        if(e.key=="ArrowRight"){
            snake.direction="right";
        }
        else if(e.key=="ArrowLeft"){
            snake.direction="left";
        }
        else if(e.key=="ArrowDown"){
            snake.direction="down";
        }
        else {
            snake.direction="up";
        }
        }
document.addEventListener('keydown',keyPressed); //keyboard key is pressed=keydown
}// init end

//outside INIT
function draw(){
    //erase the old frame
        pen.clearRect(0,0,W,H);
        snake.drawSnake();

        pen.fillStyle=food.color; //for next execution i hv change color
        //pen.fillRect(food.x*cs,food.y*cs,cs,cs);//using this we get our food as rectangle and 
        pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs); //scaling it by correct factor
        
        pen.drawImage(trophy,20,20,cs,cs); //trophy img
        pen.fillStyle="blue";
        pen.font = "20px roboto";
        pen.fillText(score,50,50); // 50,50 = x,y cordinates
}


function getRandomFood(){ //this will give me random food cordinates
        var foodX = Math.round(Math.random() * (W-cs)/cs) ; //div. by CS to make sure it is in multiple of CS
        var foodY = Math.round(Math.random() * (H-cs)/cs) ;
        var food = {
        x : foodX,
        y : foodY,
        color : "red",
} 
return food; //in my draw f(x) we can call this food but we first have to call this fx to get food position
}



function update(){
    
    snake.updateSnake();
}


function gameloop(){
     if (game_over==true){
         clearInterval(f);
         alert("game over");
     }
    draw();
    update();
}
init();
var f=setInterval(gameloop,100);