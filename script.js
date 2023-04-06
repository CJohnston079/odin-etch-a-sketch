const canvas = document.querySelector('#canvas');
let gridArea = 0;
let pixels = document.querySelectorAll('.pixel');

generateGrid(8)

function generateGrid(gridSize) {
    if (gridSize < 4 || gridSize > 64) return
    resetGrid()
    let gridArea = gridSize*gridSize
    for (let i = gridArea; i > 0; i--) {
        generatePixel()
    }
    canvas.style.gridTemplate = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;
    return gridArea;
}

function resetGrid() {
    pixels.forEach(pixel => {
        pixel.remove();
      });
}

function generatePixel() {
    let div = document.createElement('div');
    div.classList.add('pixel');
    canvas.appendChild(div);
}