
let stage = null;
let layer = null;

function initStage(width, height) {
  if (stage) {
    stage.destroy();
    stage = null;
    layer = null;
  }

  const container = document.getElementById('container');
  if (container) {
    container.style.width = width + 'px';
    container.style.height = height + 'px';
  }

  stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
  });

  layer = new Konva.Layer({
    clip: { x: 0, y: 0, width: width, height: height },
  });

  stage.add(layer);
}

function createHex(x, y) {
  const hex = new Konva.RegularPolygon({
    x: x,
    y: y,
    sides: 6,
    radius: radius,
    fill: '#1a1a2e',
    stroke: '#4a90d9',
    strokeWidth: 1,
  });

  layer.add(hex);
}

function breadthFirstSearch(startX, startY, canvasWidth, canvasHeight, maxDepth = Number.POSITIVE_INFINITY) {
  const createdHexagons = new Set();
  const queue = [{ x: startX, y: startY, depth: 0 }];

  function key(x, y) {
    return `${Math.round(x)},${Math.round(y)}`;
  }

  createdHexagons.add(key(startX, startY));

  while (queue.length > 0) { 
    const { x, y, depth } = queue.shift();
    createHex(x, y);

    if (depth >= maxDepth) {
      continue;
    }

    for (const neighbor of allNeighbors(x, y)) {
      const neighborKey = key(neighbor.x, neighbor.y);

      const dentroDoCanvas = neighbor.x >= 0 && neighbor.x <= canvasWidth && neighbor.y >= 0 && neighbor.y <= canvasHeight;

      if (!createdHexagons.has(neighborKey) && dentroDoCanvas) {
        createdHexagons.add(neighborKey);
        queue.push({ ...neighbor, depth: depth + 1 });
      }
    }

  }

  if (layer) {
    layer.batchDraw();
  }

}
document.addEventListener('DOMContentLoaded', () => {
  const initBtn = document.getElementById('initButton');
  const fillBtn = document.getElementById('fillButton');
  const wInput = document.getElementById('widthInput');
  const hInput = document.getElementById('heightInput');

  if (initBtn && fillBtn && wInput && hInput) {
    initBtn.addEventListener('click', () => {
      const w = parseInt(wInput.value, 10) || 800;
      const h = parseInt(hInput.value, 10) || 600;
      initStage(w, h);
    });

    fillBtn.addEventListener('click', () => {
      const w = parseInt(wInput.value, 10) || 800;
      const h = parseInt(hInput.value, 10) || 600;

      if (!stage) {
        initStage(w, h);
      }

      if (layer) {
        layer.destroyChildren();
      }

      breadthFirstSearch(w / 2, h / 2, w, h);
    });
  }
});

