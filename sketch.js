//Create variables here
var dog,happyDog,database,foodS,foodStock;
var pet;

function preload()
{
  dog = loadImage("images/dogImg.png");
  
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500,500);
  
  database = firebase.database();

  pet = createSprite(100,200,200,20);
  pet.addImage(dog);

  foodStock = database.ref("food");
  foodStock.on("value",readStock,showError);
}


function draw() {  
background(46,139,87);

if(keyWentDown(UP_ARROW)){
   writeStock(foodS);
   pet.addImage(happyDog);
}
  drawSprites();

  text("Note: Press UP_ARROW key to feed the dog",200,200);
  textSize(18);
  fill("white");
  stroke("blue");
  strokeWeight(4);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x=x-1;
  }

  database.ref("/").set({
    food:x
  })

}

function showError(){
  console.log("Error Occured");
}



