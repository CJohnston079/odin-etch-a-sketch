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
canvas.addEventListener('mouseup', () => {paintingEnabled = false})

let paintingEnabled = false

function enablePainting() {
    paintingEnabled = true
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
    if (paintingEnabled === true) {
        pixel.style.backgroundColor = activeBrush;
    }
}

// brushes

let brushOne = 'black'
let brushTwo = 'white'
let brushThree = 'red'
let brushFour = 'blue'
let brushFive = 'green'
let brushSix = 'yellow'

let activeBrush = brushOne

// toggle border off

function toggleGrid() {
    pixels.forEach(pixel => {
        pixel.style.border = 'none'
    })
}