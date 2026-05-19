# Grid Axial e Coordenadas Axiais

![Exemplo de Grid Axial](<img width="850" height="373" alt="image" src="https://github.com/user-attachments/assets/e3dc3edd-12f9-47fc-8ff9-5b7eb0cff170" />
)
*Exemplo de um grid axial com coordenadas (fonte: Wikipedia)*

## O que é esse projeto?

Esse projeto foi criado como uma forma de estudar as possibilidades do [konva.js](https://konvajs.org/), uma poderosa biblioteca JavaScript para desenhos em canvas, junto com a construção de grids (grades) e o sistema de coordenadas axiais.

A ideia é tornar simples (até para uma criança!) entender como funciona um grid axial e como as coordenadas axiais são usadas.

---

## O que é um Grid Axial?

Imagine um tabuleiro de jogos, como o de Dama ou Xadrez. O tabuleiro é feito de quadradinhos, certo?  
Agora, pense em um tabuleiro feito de hexágonos, como uma colmeia de abelhas. Cada hexágono é uma casa do seu tabuleiro.

Um grid axial é um jeito de identificar cada hexágono desse tabuleiro usando apenas dois números (em vez de três do sistema cúbico).  
Esses números são chamados de **coordenadas axiais**.

### Por que "axial"?

Porque cada casa/hexágono tem dois eixos: q e r (algumas pessoas usam x e y, mas q e r é mais comum com hexágonos).  
Imagine um mapa que, em vez de linhas retas para cima, baixo, esquerda e direita, tem linhas inclinadas:

- Um eixo vai do canto superior esquerdo para o canto inferior direito (`q`)
- Outro vai do canto superior direito para o canto inferior esquerdo (`r`)

---

## Como funcionam as Coordenadas Axiais?

Cada hexágono recebe uma dupla de números: `(q, r)`.

Por exemplo:
- O centro pode ser `(0, 0)`.
- O hexágono à direita do centro é `(1, 0)`.
- O hexágono acima do centro é `(0, -1)`.

**Figurinha ilustrativa (desenhe depois):**

```
       (0,-1)
         / \
(-1,0) -+---+-(1,0)
         \ /
       (0,1)
```

Imagine que cada casa tem seu "endereço" igual a esses números!

---

## Como calcular distância entre duas casas?

É só somar as diferenças absolutas das coordenadas e dividir por 2:

**Fórmula da distância:**
```
Distância = (|q1 - q2| + |q1 + r1 - q2 - r2| + |r1 - r2|) / 2
```

**Exemplo:**
- Casa A: (0, 0)
- Casa B: (2, -1)

```
|q1 - q2| = |0 - 2| = 2
|r1 - r2| = |0 - (-1)| = 1
|(-q1 - r1) - (-q2 - r2)| = |-(0) - (0) - (-(2) - (-1))| = |0 - ( -2 + 1 )| = |0 - (-1)| = 1

Distância = (2 + 1 + 1) / 2 = 4 / 2 = 2
```
Casa B está a 2 passos de distância de Casa A!

---

## Exemplos com Grid Axial

### Exemplo 1 — Movendo no grid:

- Você está na casa `(0, 0)`  
  Se andar para a direita, vai para `(1, 0)`
- Se andar para cima, vai para `(0, -1)`
- Se andar para a esquerda, vai para `(-1, 0)`
- Se andar para baixo, vai para `(0, 1)`

### Exemplo 2 — Desenhando um Grid Axial com konva.js

```javascript
const Konva = require('konva');
const stage = new Konva.Stage({
  container: 'container',
  width: 500,
  height: 500,
});
const layer = new Konva.Layer();
stage.add(layer);

function drawHex(q, r, size) {
  // Calcular posição em pixel
  const x = 250 + size * Math.sqrt(3) * (q + r/2);
  const y = 250 + size * 3/2 * r;
  const hex = new Konva.RegularPolygon({
    x: x,
    y: y,
    sides: 6,
    radius: size,
    fill: '#88ccff',
    stroke: '#555',
    strokeWidth: 2,
  });
  layer.add(hex);
}
// Desenhar hexágonos ao redor do centro
[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,-1],[-1,1]].forEach(([q, r]) => {
  drawHex(q, r, 40);
});
layer.draw();
```

---

## Imagens para Visualização

1. ![Grid axial exemplo 1](https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Hex-grid-coords-axial.svg/512px-Hex-grid-coords-axial.svg.png)
2. (Desenhe uma grade hexagonal com círculos coloridos e peça para cada um ter seu número `(q,r)`)
3. Você pode usar ferramentas como [Red Blob Games – Hexagonal Grids](https://www.redblobgames.com/grids/hexagons/) para brincar e aprender.

---

## Resumindo

- **Grid axial** = tabuleiro de hexágonos identificado por dois números (q, r)
- **Coordenadas axiais** = posição de cada hexágono nesse tabuleiro
- Fácil de navegar, desenhar e calcular distâncias
- Usado em jogos, mapas 2D, simulações, etc.

Se quiser brincar, modifique o código! Veja como desenhar grids diferentes ou mude as cores dos hexágonos!

---

## Referências

- [Red Blob Games: Hexagonal Grids (Inglês, mas tem imagens legais!)](https://www.redblobgames.com/grids/hexagons/)
- [Documentação Konva.js](https://konvajs.org/)
- [Wikipedia – Coordenadas axiais](https://en.wikipedia.org/wiki/Hexagonal_tiling#Coordinates_for_hexagonal_tiling)

---

Projeto criado por RokaiDeveloper para explorar grids e coordenadas axiais com konva.js.
