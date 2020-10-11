var ball;
var database, position;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,20,20);
    ball.shapeColor = "purple";

    database = firebase.database();

    var loc = database.ref("ball/position");
    loc.on("value",readOP,showErr);

}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-5,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(5,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-5);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+5);
    }
    drawSprites();
}

function writePosition(x,y){
    //ball.x = ball.x + x;
    //ball.y = ball.y + y;
    database.ref("ball/position").set({
        x: ball.x + x,
        y: ball.y + y
    })

}

function readOP(data) {
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;

}

function showErr() {
    console.log("ERROR");
}