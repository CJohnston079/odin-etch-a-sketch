const canvas = document.querySelector('#canvas');
let cells = document.querySelectorAll('.cell');
let gridArea = 0;
let gridEnabled = true;
let gridMode = 'light'; 
let canvasColour = 'white';

const gridSlider = document.querySelector('#canvas-size-slider');
const decreaseGridSizeElement = document.querySelectorAll('.slider-operator')[0];
const increaseGridSizeElement = document.querySelectorAll('.slider-operator')[1];

generateGrid(gridSlider.value);

decreaseGridSizeElement.addEventListener('click', decreaseGridSize)
increaseGridSizeElement.addEventListener('click', increaseGridSize)

function decreaseGridSize(operator) {
        gridSlider.stepDown()
        generateGrid(gridSlider.value)
}

function increaseGridSize(operator) {
    gridSlider.stepUp()
    generateGrid(gridSlider.value)
}


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
    gridArea = gridSize*gridSize
    for (let i = gridArea; i > 0; i--) {
        setTimeout(generateCells, Math.floor(250/gridSize)*(i%gridSize));
    }
    logGridSize(gridArea, gridSize)
    canvas.style.gridTemplate = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;
    setTimeout(previewCellColour, 500)
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
            if (isPainting === false) {
                currentCellColour = cell.style.backgroundColor;
                cell.style.backgroundColor = activeBrush;
            }
        });
        cell.addEventListener('mouseup', () => {
            currentCellColour = activeBrush;
        })
        cell.addEventListener('mouseout', () => {
            if (isPainting === false) {
                cell.style.backgroundColor = currentCellColour;
            }
        });
    });
}

function previewCell(cell) {
    if (isPainting === false) {
        cell.style.backgroundColor = activeBrush;
    }
}

// paint functions

canvas.addEventListener('mousedown', enablePainting);
canvas.addEventListener('mouseup', () => {
    isPainting = false;
});

let isPainting = false;

function enablePainting() {
    isPainting = true;
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
    if (isPainting === true) {
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
const brushElement7 = document.querySelector('#brush-seven');
const brushElement8 = document.querySelector('#brush-eight');
const brushElement9 = document.querySelector('#brush-nine');

const brushElements = [brushOneElement, brushTwoElement, brushThreeElement, brushFourElement, brushFiveElement, brushSixElement, brushElement7, brushElement8, brushElement9];

let brush1 = 'black';
let brush2 = 'red';
let brush3 = 'orange';
let brush4 = 'yellow';
let brush5 = 'green';
let brush6 = 'cyan';
let brush7 = 'blue';
let brush8 = 'hotpink';
let brush9 = 'white';

let activeBrush = brush1;
let activeBrushElement = brushOneElement;

brushElements.forEach(brush => {
    brush.addEventListener('mousedown', () => {
        selectActiveBrush(brush);
    })
});

function selectActiveBrush(brush) {
    activeBrushElement.classList.toggle('active-tool');
    switch(brush) {
        case brushOneElement:
            activeBrush = brush1;
            break;
        case brushTwoElement:
            activeBrush = brush2;
            break;
        case brushThreeElement:
            activeBrush = brush3;
            break;
        case brushFourElement:
            activeBrush = brush4;
            break;
        case brushFiveElement:
            activeBrush = brush5;
            break;''
        case brushSixElement:
            activeBrush = brush6;
            break;''
            case brushElement7:
            activeBrush = brush7;
            break;''
        case brushElement8:
            activeBrush = brush8;
            break;''
        case brushElement9:
            activeBrush = brush9;
    }
    activeBrushElement = brush;
    activeBrushElement.classList.toggle('active-tool');
}

// canvas options

const gridToggleButton = document.querySelectorAll('.tool')[1]
const gridModeButton = document.querySelectorAll('.tool')[2]
const resetCanvasButton = document.querySelectorAll('.tool')[3]
const setCanvasColour = document.querySelectorAll('.tool')[4]

gridToggleButton.addEventListener('mousedown', toggleGrid)
gridModeButton.addEventListener('mousedown', toggleGridMode)
resetCanvasButton.addEventListener('mousedown', resetCanvas)

function toggleGrid() {
    gridEnabled === true ? gridEnabled = false :
    gridEnabled = true;
    cells.forEach(cell => {
        if (gridMode === 'light') {
            cell.classList.toggle('grid-light');
        } else if (gridMode === 'dark') {
            cell.classList.toggle('grid-dark');
        }
    })
    gridMode === 'dark' ? toggleCanvasBackground() : {}
    toggleGridButton()
    toggleGridModeButton()
    return gridEnabled;
}

function toggleGridButton() {
    gridEnabled === true ? gridToggleButton.src = 'icons/icon-grid-on.svg' :
    gridToggleButton.src = 'icons/icon-grid-off.svg';
}

function toggleGridMode() {
    gridMode === 'light' ? gridMode = 'dark' :
    gridMode = 'light';
    cells.forEach(cell => {
        if (gridMode === 'dark') {
            cell.classList.replace('grid-light', 'grid-dark');
        } else {
            cell.classList.replace('grid-dark', 'grid-light');
        }
    })
    toggleGridModeButton()
    gridEnabled === true ? toggleCanvasBackground() : {}
    return gridMode;
}

function toggleCanvasBackground() {
        canvas.style.backgroundColor === 'var(--dark-grey)' ? canvas.style.backgroundColor = 'var(--light-grey)' :
        canvas.style.backgroundColor = 'var(--dark-grey)';
}

function toggleGridModeButton() {
    gridMode === 'light' ? gridModeButton.src = 'icons/icon-grid-light.svg' :
    gridModeButton.src = 'icons/icon-grid-dark.svg';
}

function resetCanvas() {
    let gridSize = Math.sqrt(gridArea);
    for (let i = 0; i < gridArea; i++) {
        setTimeout(clearCells, 50*Math.floor(i/gridSize), cells[i])
    }
    resetCanvasButton.style.animation = 'rotate-360 500ms'
    resetCanvasButton.removeEventListener('mousedown', resetCanvas);
    setTimeout(() => {
        resetCanvasButton.addEventListener('mousedown', resetCanvas),
        resetCanvasButton.style.animation = ''
    }, 500)
}

function clearCells(cell) {
    cell.style.backgroundColor = 'white';
}