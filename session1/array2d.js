var garden = [ [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0]];
var safeWays = [];
function findSafeWay(map, col, row)
{
  if(col === map.length){
    console.log(safeWays);
    return false;
  }
  for(let j = 0; j < map[col].length; j++){
    if(map[col][j] === 0){
        safeWays.push(j);
        if(findSafeWay(map, col + 1, row))
        return true;
        safeWays.pop();
    }
  }
  return false;
}

findSafeWay(garden,0,0)