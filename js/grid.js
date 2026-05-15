
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

  const hexagon = new Konva.RegularPolygon({
    x: stage.width() / 2,
    y: stage.height() / 2,
    sides: 6,
    radius: 20,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 1
  });

  layer.add(hexagon);
  layer.draw();
}

document.addEventListener('DOMContentLoaded', () => {
  const initBtn = document.getElementById('initButton');
  const wInput = document.getElementById('widthInput');
  const hInput = document.getElementById('heightInput');

  if (initBtn && wInput && hInput) {
    initBtn.addEventListener('click', () => {
      const w = parseInt(wInput.value, 10) || 800;
      const h = parseInt(hInput.value, 10) || 600;
      initStage(w, h);
    });
  }
});

