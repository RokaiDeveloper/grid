//hexagonos são compostos de 6 lados, para apontar para o meio de cada lado precisamos apontar de 30 em 30 graus
//por isso determinamos os valores de seno e cosseno para 30 graus, e depois multiplicamos por 2 vezes o apotema para obter a posição do vizinho
const SQRT3 = Math.sqrt(3);
const cos30 = SQRT3 / 2;
const sin30 = 1 / 2;

//aqui determinamos as direções para cada um dos 6 vizinhos
const directions = [
  {  cos: cos30,  sin: sin30  },  // 30°  - direita cima
  {  cos: 0,      sin: 1      },  // 90°  - baixo
  {  cos: -cos30, sin: sin30  },  // 150° - esquerda baixo
  {  cos: -cos30, sin: -sin30 },  // 210° - esquerda cima
  {  cos: 0,      sin: -1     },  // 270° - cima
  {  cos: cos30,  sin: -sin30 },  // 330° - direita cima
];

//aqui determinamos a apotema que é, a distancia do centro do hexágono até o meio de um dos lados, e é dada por radius * cos(30°)
const apotema = radius * cos30;

//A partir de uma posição x e y e um index (0 a 6) que determina a direção, como montado em directions
//retornamos a posição de um vizinho do hexágono nessa direção
function neighborPosition(cx, cy, directionIndex) {
  const dir = directions[directionIndex];
  return {
    x: cx + apotema * 2 * dir.cos,
    y: cy + apotema * 2 * dir.sin,
  };
}

//Utilizando a função acima, retornamos as posições de todos os 6 vizinhos de um hexágono dado sua posição central
function allNeighbors(cx, cy) {
  const neighbors = [];
  for (let i = 0; i < directions.length; i++) {
    neighbors.push(neighborPosition(cx, cy, i));
  }
  return neighbors;
}