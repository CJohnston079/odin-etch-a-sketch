const canvas = document.querySelector('#canvas');
let pixels = document.querySelectorAll('.pixel');
let gridArea = 0;

generateGrid(8)

function generateGrid(gridSize) {
    if (gridSize < 4 || gridSize > 32) return
    resetGrid()
    let gridArea = gridSize*gridSize
    for (let i = gridArea; i > 0; i--) {
        generatePixels(i)
    }
    canvas.style.gridTemplate = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;
    return gridArea;
}

function resetGrid() {
    pixels.forEach(pixel => {
        pixel.remove();
      });
}

function generatePixels(i) {
    setTimeout(() => {
        let div = document.createElement('div');
        div.classList.add('pixel');
        canvas.appendChild(div);
        pixels = document.querySelectorAll('.pixel');
        return pixels
    }, 1 * i)
}

// paint functions

canvas.addEventListener('mousedown', enablePainting)
canvas.addEventListener('mouseup', disablePainting)

let mousedown = false

function enablePainting() {
    mousedown = true
    pixels.forEach(pixel => {
        pixel.addEventListener('mousemove', () => {
            paintPixel(pixel)
        })
        pixel.addEventListener('mouseup', () => {
            paintPixel(pixel)
        })
    });
}

function paintPixel(pixel) {
    if (mousedown === true) {
        pixel.style.backgroundColor = 'black';
    }
}

function disablePainting() {
    mousedown = false
    return mousedown
}