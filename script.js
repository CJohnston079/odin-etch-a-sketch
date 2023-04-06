const canvas = document.querySelector('#canvas');
let currentGridSize = 0;

generateGrid(8)

function generateGrid(gridSize) {
    if (gridSize < 4 || gridSize > 64) {
        return
    }
    let gridArea = gridSize*gridSize
    resetGrid()
    for (let i = gridArea; i > 0; i--) {
        generatePixel()
    }
    canvas.style.gridTemplate = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;
    currentGridSize = gridArea;
    return currentGridSize
}

function resetGrid() {
    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.remove();
      });
}

function generatePixel() {
    let div = document.createElement('div');
    div.classList.add('pixel');
    canvas.appendChild(div);
}