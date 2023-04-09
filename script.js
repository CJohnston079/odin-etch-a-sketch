const canvas = document.querySelector('#canvas');
let cells = document.querySelectorAll('.cell');
let gridArea = 0;

const gridSlider = document.querySelector('#canvas-size-slider')

generateGrid(gridSlider.value)

gridSlider.addEventListener('change', () => {
    generateGrid(gridSlider.value)
})

function logGridSize(gridArea, gridSize) {
    console.log(`Grid area: ${gridArea} \nGrid size: ${gridSize}x${gridSize}`)
}

function generateGrid(gridSize) {
    if (gridSize < 4 || gridSize > 64) return
    resetGrid()
    let gridArea = gridSize*gridSize
    for (let i = gridArea; i > 0; i--) {
        setTimeout(generateCells, Math.floor(500/gridSize)*(i%gridSize))
    }
    logGridSize(gridArea, gridSize)
    canvas.style.gridTemplate = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;
    return gridArea;
}

function resetGrid() {
    cells.forEach(cell => {
        cell.remove();
      });
}

function generateCells() {
        let div = document.createElement('div');
        div.classList.add('cell');
        canvas.appendChild(div);
        cells = document.querySelectorAll('.cell');
        return cells
}

// paint functions

canvas.addEventListener('mousedown', enablePainting)
canvas.addEventListener('mouseup', () => {paintingEnabled = false})

let paintingEnabled = false

function enablePainting() {
    paintingEnabled = true
    cells.forEach(cell => {
        cell.addEventListener('mousemove', () => {
            paintCell(cell)
        })
        cell.addEventListener('mouseup', () => {
            paintCell(cell)
        })
    });
}

function paintCell(cell) {
    if (paintingEnabled === true) {
        cell.style.backgroundColor = activeBrush;
    }
}

// brushes

const brushOneElement = document.querySelector('#brush-one')
const brushTwoElement = document.querySelector('#brush-two')
const brushThreeElement = document.querySelector('#brush-three')
const brushFourElement = document.querySelector('#brush-four')
const brushFiveElement = document.querySelector('#brush-five')
const brushSixElement = document.querySelector('#brush-six')

const brushElements = [brushOneElement, brushTwoElement, brushThreeElement, brushFourElement, brushFiveElement, brushSixElement]

let brushOne = 'black'
let brushTwo = 'white'
let brushThree = 'red'
let brushFour = 'blue'
let brushFive = 'green'
let brushSix = 'yellow'

let activeBrush = brushOne

brushElements.forEach(brush => {
    brush.addEventListener('mousedown', () => {
        selectActiveBrush(brush)
    })
});

function selectActiveBrush(brush) {
    if (brush === brushOneElement) {
        activeBrush = brushOne;
    } else if (brush === brushTwoElement) {
        activeBrush = brushTwo;
    } else if (brush === brushThreeElement) {
        activeBrush = brushThree;
    } else if (brush === brushFourElement) {
        activeBrush = brushFour;
    } else if (brush === brushFiveElement) {
        activeBrush = brushFive;
    } else if (brush === brushSixElement) {
        activeBrush = brushSix;
    } 
    return activeBrush
}

// toggle border off

function toggleGrid() {
    cells.forEach(cell => {
        cell.style.border = 'none'
    })
}