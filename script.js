const canvas = document.querySelector('#canvas');
let pixels = document.querySelectorAll('.pixel');
let gridArea = 0;

generateGrid(8)

function generateGrid(gridSize) {
    if (gridSize < 4 || gridSize > 64) return
    resetGrid()
    let gridArea = gridSize*gridSize
    for (let i = gridArea; i > 0; i--) {
        generatePixels()
    }
    canvas.style.gridTemplate = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;
    return gridArea;
}

function resetGrid() {
    pixels.forEach(pixel => {
        pixel.remove();
      });
}

function generatePixels() {
    let div = document.createElement('div');
    div.classList.add('pixel');
    canvas.appendChild(div);
    pixels = document.querySelectorAll('.pixel');
    return pixels
}