let mapContainer = document.getElementById('map-container');

var createdElement;
var breakElement;
var playerElement;
var playerPos;
var boxPositions = [];
const boxElements = [];
const goalPositions = [];

function generateTiles(){
    
    for(let i = 0; i < tileMap01.height - 1; i++){
      breakElement = document.createElement('div');
      mapContainer.appendChild(breakElement);
      
      for(let j = 0; j < tileMap01.width; j++){
        
        createdElement = document.createElement('div');
        createdElement.id = "x" + (i + 1) + "y" + (j + 1);
        createdElement.classList.add("tiles");
        createdElement.innerHTML = tileMap01.mapGrid[i][j];

        if(createdElement.innerHTML === "W"){
          createdElement.classList.add(Tiles.Wall);
        }
        else if(createdElement.innerHTML === "P"){
          createdElement.classList.add("character-start");
        }
        else if(createdElement.innerHTML === "B"){
          createdElement.classList.add("tile-block");
        }
        else if(createdElement.innerHTML === "G"){
          createdElement.classList.add(Tiles.Goal);
        }
        else{
          createdElement.classList.add(Tiles.Space);
        }

        breakElement.appendChild(createdElement);

      }
    }

}

function createPlayer(){

  var mapContainerChildNodes = mapContainer.childNodes;
  var divChildNodes;

  playerElement = document.createElement('div');
  playerElement.id = Entities.Character;
  mapContainer.appendChild(playerElement);

  for(var c = 0; c <  mapContainerChildNodes.length; c++){
    divChildNodes = mapContainerChildNodes[c].childNodes;

    for(var n = 0; n < divChildNodes.length; n++){

      if(divChildNodes[n].innerHTML === "P"){
        playerElement.style.top = divChildNodes[n].offsetTop - (divChildNodes[n].offsetHeight * (tileMap01.height - 1)) + "px";
        playerElement.style.left = (divChildNodes[n].offsetLeft + 0.5) + "px";

        playerPos = divChildNodes[n].id;
      }
    }
  }
  
}

function createBoxes() {

  var mapContainerChildNodes = mapContainer.childNodes;
  var divChildNodes;

  var numberOfBoxes = 0;
  for(let i = 0; i < tileMap01.height - 1; i++){
    for(let j = 0; j < tileMap01.width; j++){
      if(tileMap01.mapGrid[i][j][0] === 'B'){
        numberOfBoxes++;
      }
    }
  }

  var idNumber = 1;
  for(var b = 0; b < numberOfBoxes; b++){

    var boxElement = document.createElement('div');
    boxElement.id = Entities.Block + (idNumber++);
    boxElement.classList.add(Entities.Block);
    boxElements.push(boxElement);
    mapContainer.appendChild(boxElement);
    
  }
  
  var boxElementIndex = 0;
  var increment = 50;
  for(var c = 0; c <  mapContainerChildNodes.length; c++){
    divChildNodes = mapContainerChildNodes[c].childNodes;
    for(var n = 0; n < divChildNodes.length; n++){
      if(divChildNodes[n].innerHTML === "B"){

        boxElements[boxElementIndex].style.top = divChildNodes[n].offsetTop - (divChildNodes[n].offsetHeight * (tileMap01.height - 1)) - increment + "px";
        boxElements[boxElementIndex].style.left = divChildNodes[n].offsetLeft + "px";
        boxPositions[boxElementIndex] = divChildNodes[n].id;

        boxElementIndex++;
        increment = increment + divChildNodes[n].offsetHeight;
      }
    }
  }

}

function initiateGoalPositions() {

  var positionIndex = 0;
  for(let i = 0; i < tileMap01.height - 1; i++){
    for(let j = 0; j < tileMap01.width; j++){
      if(tileMap01.mapGrid[i][j][0] === 'G'){
        goalPositions[positionIndex] = "x" + (i + 1) + "y" + (j + 1);
        positionIndex++;
      }
    }
  }

}

generateTiles();
createPlayer();
createBoxes();
initiateGoalPositions();

document.onkeydown = function(event){

    event.preventDefault();

    switch(event.key){
            case "ArrowUp":
                let positionUp = playerPos.replace("x", "");
                let positionArrayUp = positionUp.split("y");

                let intPosXUp = parseInt(positionArrayUp[0]);
                let intPosYUp = parseInt(positionArrayUp[1]);
                let intPosXUpdatedUp = intPosXUp - 1;
                let intPosYUpdatedUp = intPosYUp;

                let tempBoxXPosUpdatedUp = - 1;
                let tempBoxYPosUpdatedUp = 0;

                movePlayer(intPosXUp, intPosYUp, intPosXUpdatedUp, intPosYUpdatedUp, tempBoxXPosUpdatedUp, tempBoxYPosUpdatedUp);
                break;

            case "ArrowRight":
                let positionRight = playerPos.replace("x", "");
                let positionArrayRight = positionRight.split("y");

                let intPosXRight = parseInt(positionArrayRight[0]);
                let intPosYRight = parseInt(positionArrayRight[1]);
                let intPosXUpdatedRight = intPosXRight;
                let intPosYUpdatedRight = intPosYRight + 1;

                let tempBoxXPosUpdatedRight = 0;
                let tempBoxYPosUpdatedRight = 1;
                
                movePlayer(intPosXRight, intPosYRight, intPosXUpdatedRight, intPosYUpdatedRight, tempBoxXPosUpdatedRight, tempBoxYPosUpdatedRight);
                break;

            case "ArrowDown":
                let positionDown = playerPos.replace("x", "");
                let positionArrayDown = positionDown.split("y");

                let intPosXDown = parseInt(positionArrayDown[0]);
                let intPosYDown = parseInt(positionArrayDown[1]);
                let intPosXUpdatedDown = intPosXDown + 1;
                let intPosYUpdatedDown = intPosYDown;

                let tempBoxXPosUpdatedDown = 1;
                let tempBoxYPosUpdatedDown = 0;

                movePlayer(intPosXDown, intPosYDown, intPosXUpdatedDown, intPosYUpdatedDown, tempBoxXPosUpdatedDown, tempBoxYPosUpdatedDown);
                break;

            case "ArrowLeft":
                let positionLeft = playerPos.replace("x", "");
                let positionArrayLeft = positionLeft.split("y");
      
                let intPosXLeft = parseInt(positionArrayLeft[0]);
                let intPosYLeft = parseInt(positionArrayLeft[1]);
                let intPosXUpdatedLeft = intPosXLeft;
                let intPosYUpdatedLeft = intPosYLeft - 1;

                let tempBoxXPosUpdatedLeft = 0;
                let tempBoxYPosUpdatedLeft = - 1;

                movePlayer(intPosXLeft, intPosYLeft, intPosXUpdatedLeft, intPosYUpdatedLeft, tempBoxXPosUpdatedLeft, tempBoxYPosUpdatedLeft);
                break;

            default:
                return;
    }
};

function movePlayer(previousX, previousY, updatedX, updatedY, updatedBoxX, updatedBoxY){
        
        let elementToMoveTo = document.getElementById("x" + updatedX + "y" + updatedY);

        if(elementToMoveTo.innerHTML !== "W"){
          playerElement.style.top = elementToMoveTo.offsetTop - (elementToMoveTo.offsetHeight * (tileMap01.height - 1)) + "px";
          playerElement.style.left = elementToMoveTo.offsetLeft + "px";
  
          playerPos = elementToMoveTo.id;
        }
        
        var correctionTop = -50;
        for(var p = 0; p < boxPositions.length; p++){
          correctionTop = correctionTop + elementToMoveTo.offsetHeight;

          if(playerPos === boxPositions[p]){
            let elementToMoveBoxTo = document.getElementById("x" + (updatedX + updatedBoxX) + "y" + (updatedY + updatedBoxY));

            if(elementToMoveBoxTo.innerHTML !== "W" && elementToMoveBoxTo.innerHTML !== "B"){
              boxElements[p].style.top = elementToMoveBoxTo.offsetTop - (elementToMoveBoxTo.offsetHeight * (tileMap01.height)) - correctionTop + "px";
              boxElements[p].style.left = elementToMoveBoxTo.offsetLeft + "px";
              boxPositions[p] = "x" + (updatedX + updatedBoxX) + "y" + (updatedY + updatedBoxY);
              
              elementToMoveTo.innerHTML = " ";
              elementToMoveBoxTo.innerHTML = "B";
            }
            else{
              let prevuisPlayerPos = document.getElementById("x" + previousX + "y" + previousY);

              playerElement.style.top = prevuisPlayerPos.offsetTop - (prevuisPlayerPos.offsetHeight * (tileMap01.height - 1)) + "px";
              playerElement.style.left = prevuisPlayerPos.offsetLeft + "px";
            
              playerPos = prevuisPlayerPos.id;
            }
          }

        }
        
        checkIfAllBoxesStandOnGoals();

}

function checkIfAllBoxesStandOnGoals(){

  var points = 0;
  for(var b = 0; b < boxPositions.length; b++){
    for(var g = 0; g < goalPositions.length; g++){
      if(boxPositions[b] === goalPositions[g]){
        let boxOnGoal = document.getElementById(Entities.Block + (b +1));
        boxOnGoal.style.backgroundColor = "pink";
        points++;
      }
    }
  }

  if(points === goalPositions.length){
    alert("Congratulations! You completed the stage!");
  }

}