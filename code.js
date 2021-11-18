const map = `WWWWWWWWWWWWWWWWWWWWW
             W   W     W     W W W
             W W W WWW WWWWW W W W
             W W W   W     W W   W
             W WWWWWWW W WWW W W W
             W         W     W W W
             W WWW WWWWW WWWWW W W
             W W   W   W W     W W
             W WWWWW W W W WWW W F
             S     W W W W W W WWW
             WWWWW W W W W W W W W
             W     W W W   W W W W
             W WWWWWWW WWWWW W W W
             W       W       W   W
             WWWWWWWWWWWWWWWWWWWWW`.split("\n");

             
const fSpace = "  ";
let row_index = 0;
let emptyArray = [];
let playerPosition;
let endPosition;
let beforePosition;
let row_count;

let span = document.getElementsByClassName("close")[0];

map.forEach((row, index) => {
  row_count = map[0].length + 1
  row.trim().split("").forEach((path, i) => {
    let span = document.createElement("span");
    span.textContent = path === "F" ? "" : fSpace;
    span.classList.toggle("blue", path === "W");
    let sPoint = index + (++row_index);
    span.id = sPoint;
    document.body.appendChild(span);
    if(path.localeCompare("S") == 0){
      playerPosition = sPoint
      let startPoint = document.getElementById(sPoint.toString());
      startPoint.className = "player";
    }
    if(path.localeCompare(" ") == 0){
      emptyArray.push(sPoint)
    }
    if(path.localeCompare("F") == 0){
      emptyArray.push(sPoint)
      endPosition = sPoint
    }
  });
  document.body.appendChild(document.createElement("br"))
});

window.addEventListener('keydown', doKeyDown, true);
function doKeyDown(evt)
{
  let handled = false;
  switch (evt.keyCode) {
    case 38:  
        movePlayer(0)
        handled = true
        break;
    case 87:  
        movePlayer(0)
        handled = true
        break;
    case 40 :  
        movePlayer(1)
        handled = true
        break;
    case 83 :  
        movePlayer(1)
        handled = true
        break;
    case 37:  
        movePlayer(2)
        handled = true
        break;
    case 65:  
        movePlayer(2)
        handled = true
        break;
    case 39: 
        movePlayer(3)
        handled = true
        break;
    case 68: 
        movePlayer(3)
        handled = true
        break;
    }
  if (handled)
      evt.preventDefault(); 
}

function movePlayer(_event){
  beforePosition = playerPosition
  switch(_event){
    case 0:
      playerPosition = playerPosition - row_count
      break;
    case 1:
      playerPosition = playerPosition + row_count
      break;
    case 2:
      playerPosition = playerPosition - 1
      break;
    case 3:
      playerPosition = playerPosition + 1
      break;
  }

  if(isValidate(playerPosition)){
    document.getElementById(beforePosition.toString()).classList.remove("player")
    document.getElementById(playerPosition.toString()).className = "player";
    if(playerPosition == endPosition){
      document.getElementById("message").style.visibility = "visible"
      span.onclick = function() {
        document.getElementById("message").style.visibility = "hidden"
        restart();
      }
    }
  }else{
    playerPosition = beforePosition
  }
}

function restart(){
  location.reload();
};

function isValidate(position){
  if(emptyArray.includes(position)){
    return true
  }
  return false
}