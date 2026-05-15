const radius = 25;

const SQRT3 = Math.sqrt(3);
const cos30 = SQRT3 / 2;
const sin30 = 1 / 2;
const apotema = radius * cos30;
const distancia = apotema * 2;

const directions = [
  { x:  distancia * cos30, y:  distancia * sin30 },  // 30°
  { x:  0,                 y:  distancia         },  // 90°
  { x: -distancia * cos30, y:  distancia * sin30 },  // 150°
  { x: -distancia * cos30, y: -distancia * sin30 },  // 210°
  { x:  0,                 y: -distancia         },  // 270°
  { x:  distancia * cos30, y: -distancia * sin30 },  // 330°
];

function neighborPosition(cx, cy, directionIndex) {
  const dir = directions[directionIndex];
  return {
    x: cx + dir.x,
    y: cy + dir.y,
  };
}

function allNeighbors(cx, cy) {
  const neighbors = [];
  for (let i = 0; i < directions.length; i++) {
    neighbors.push(neighborPosition(cx, cy, i));
  }
  return neighbors;
}