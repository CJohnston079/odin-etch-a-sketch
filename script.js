const canvas = document.querySelector('#canvas');
let cells = document.querySelectorAll('.cell');
let gridArea = 0;
let gridEnabled = true;
let gridMode = 'light';

const gridSlider = document.querySelector('#canvas-size-slider');

generateGrid(gridSlider.value);

gridSlider.addEventListener('change', () => {
    generateGrid(gridSlider.value)
})

function logGridSize(gridArea, gridSize) {
    console.clear()
    console.log(`Grid size: ${gridSize}x${gridSize}\nGrid area: ${gridArea} `)
}

function generateGrid(gridSize) {
    if (gridSize < 4 || gridSize > 64) return
    resetGrid();
    let gridArea = gridSize*gridSize
    for (let i = gridArea; i > 0; i--) {
        setTimeout(generateCells, Math.floor(250/gridSize)*(i%gridSize));
    }
    logGridSize(gridArea, gridSize)
    canvas.style.gridTemplate = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;
    setTimeout(previewCellColour, 200)
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
        if (gridEnabled === true) {
            gridMode === 'light' ? div.classList.add('grid-light') :
            div.classList.add('grid-dark');
        }
        canvas.appendChild(div);
        cells = document.querySelectorAll('.cell');
        return cells;
}

// hover preview

function previewCellColour() {
    cells.forEach(cell => {
        let currentCellColour = cell.style.backgroundColor;
        cell.addEventListener('mouseenter', () => {
            if (paintingEnabled === false) {
                currentCellColour = cell.style.backgroundColor;
                cell.style.backgroundColor = activeBrush;
            }
        });
        cell.addEventListener('mouseup', () => {
            currentCellColour = activeBrush;
        })
        cell.addEventListener('mouseout', () => {
            if (paintingEnabled === false) {
                cell.style.backgroundColor = currentCellColour;
            }
        });
    });
}

function previewCell(cell) {
    if (paintingEnabled === false) {
        cell.style.backgroundColor = activeBrush;
    }
}

// paint functions

canvas.addEventListener('mousedown', enablePainting);
canvas.addEventListener('mouseup', () => {paintingEnabled = false});

let paintingEnabled = false;

function enablePainting() {
    paintingEnabled = true;
    cells.forEach(cell => {
        cell.addEventListener('mousemove', () => {
            paintCell(cell);
        })
        cell.addEventListener('mouseup', () => {
            paintCell(cell);
        })
    });
}

function paintCell(cell) {
    if (paintingEnabled === true) {
        cell.style.backgroundColor = activeBrush;
    }
}

// brushes

const brushOneElement = document.querySelector('#brush-one');
const brushTwoElement = document.querySelector('#brush-two');
const brushThreeElement = document.querySelector('#brush-three');
const brushFourElement = document.querySelector('#brush-four');
const brushFiveElement = document.querySelector('#brush-five');
const brushSixElement = document.querySelector('#brush-six');

const brushElements = [brushOneElement, brushTwoElement, brushThreeElement, brushFourElement, brushFiveElement, brushSixElement];

let brushOne = 'black';
let brushTwo = 'white';
let brushThree = 'red';
let brushFour = 'blue';
let brushFive = 'green';
let brushSix = 'yellow';

let activeBrush = brushOne;
let activeBrushElement = brushOneElement;

brushElements.forEach(brush => {
    brush.addEventListener('mousedown', () => {
        selectActiveBrush(brush);
    })
});

function selectActiveBrush(brush) {
    activeBrushElement.classList.toggle('primary-brush');
    switch(brush) {
        case brushOneElement:
            activeBrush = brushOne;
            break;
        case brushTwoElement:
            activeBrush = brushTwo;
            break;
        case brushThreeElement:
            activeBrush = brushThree;
            break;
        case brushFourElement:
            activeBrush = brushFour;
            break;
        case brushFiveElement:
            activeBrush = brushFive;
            break;''
        case brushSixElement:
            activeBrush = brushSix;
    }
    activeBrushElement = brush;
    activeBrushElement.classList.toggle('primary-brush');
}

// toggle border off

function toggleGrid() {
    cells.forEach(cell => {
        if (gridMode === 'light') {
            cell.classList.toggle('grid-light');
        } else if (gridMode === 'dark') {
            cell.classList.toggle('grid-dark');
        }
    })
    if (gridEnabled === true & gridMode === 'dark') {
        canvas.style.backgroundColor = 'var(--light-grey)';
    } else if (gridEnabled === false & gridMode === 'dark') {
        canvas.style.backgroundColor = 'var(--dark-grey)';
    }
    gridEnabled === true ? gridEnabled = false :
    gridEnabled = true;
    return gridEnabled;
}

function toggleGridMode() {
    cells.forEach(cell => {
        if (cell.classList.contains('grid-light')) {
            cell.classList.replace('grid-light', 'grid-dark');
            gridMode = 'dark';
        } else if (cell.classList.contains('grid-dark')) {
            cell.classList.replace('grid-dark', 'grid-light');
            gridMode = 'light';
        }
    })
    gridMode === 'light' ? canvas.style.backgroundColor = '#e5e5e5' :
    canvas.style.backgroundColor = 'var(--dark-grey)';
    return gridMode;
}