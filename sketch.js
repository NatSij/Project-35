//Create variables here
var dog, happyDog;
var database; 
var foodS, foodStock;
var dogImg, dogImg1;
var lastFed, feedTime, feed, feedDog, addFood, foodObject;


function preload(){
//load images here
dogImg = loadImage("Images/dogImg.png");
dogImg1 = loadImage("Images/dogImg1.png");
}

function setup() {
database = firebase.database();
createCanvas(1000, 500);
foodObject = new Food(120, 100, 20, 20);

dog = createSprite(250, 300, 150, 150);
dog.addImage(dogImg);
dog.scale = 0.2;

foodStock = database.ref("Food");
foodStock.on("value", readStock);
textSize(20);

feed = createButton("Feed the Dog");
feed.position(700, 95);
feed.mousePressed(feedDog);

addFood = createButton("Add Food");
addFood.position(800, 95);
addFood.mousePressed(addFood);
}


function draw() {  
background(46, 139, 87);

//if(keyDown(UP_ARROW)){
//writeStock(foodS);
//dog.addImage(dogImg1);
//}

foodObject.display();

  feedTime = database.ref('FeedTime');
  feedTime.on("value", function(data){
    lastFed = data.val();
  });

  if(lastFed >= 12){
  text("lastFeed" + lastFed%12 + "PM", 350, 30);
  }
  else if(lastFed === 0){
  text ("lastFeed = 12:00 AM", 350, 30); 
  }
  else{
  text("lastFeed" + lastFed + "AM", 350, 30);  
  }

  drawSprites();

  //add styles here
  //textSize(16);
  //fill("white");
  //stroke("green");
  //text("Note: Press UP_ARROW Key to Feed Drago Milk!", 75, 25);
  //textSize(16);
  //fill("red");
  //stroke("black");
  //text("Food Remaining: " + foodS, 150, 50);
}

function readStock(data){
foodS = data.val();
foodObject.updateFoodStock(foodS);
}

/* function writeStock(x){
if (x <= 0){
x = 0; 
}
else{
//short way of saying x = x - 1
x = x - 1
}
database.ref("/").update({
Food:x
})
}
*/

function addFood(){
foodS++;
database.ref("/").update({
Food:foodS
})
}

function feedDog(){
dog.addImage(dogImg);
if(foodObject.getFoodStock()<= 0){
foodObject.updateFoodStock(foodObject.getFoodStock()*0);
}
else{
  foodObject.updateFoodStock(foodObject.getFoodStock()-1);
}

database.ref("/").update({
  Food:foodObject.getFoodStock(),
  FeedTime:hour()
})
}