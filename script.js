const canvas = document.querySelector('#canvas');
let cells = document.querySelectorAll('.cell');
let gridArea = 0;
let gridEnabled = true;
let gridMode = 'light'; 
let canvasColour = 'white';
let previewBrush = true;
let currentCellColour = canvasColour;

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
        div.style.backgroundColor = canvasColour
        canvas.appendChild(div);
        cells = document.querySelectorAll('.cell');
        return cells;
}

// preview on hover

function previewCellColour() {
    cells.forEach(cell => {
        currentCellColour = cell.style.backgroundColor;
        cell.addEventListener('mouseenter', () => {
            if (previewBrush === false || isPainting === true) return
                currentCellColour = cell.style.backgroundColor;
                cell.style.backgroundColor = activeBrush;
        });
        cell.addEventListener('mouseup', () => {
            if (previewBrush === false) return
            currentCellColour = activeBrush;
        })
        cell.addEventListener('mouseout', () => {
            if (previewBrush === false || isPainting === true) return
                cell.style.backgroundColor = currentCellColour;
        });
    });
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
const setCanvasColourButton = document.querySelectorAll('.tool')[4]

gridToggleButton.addEventListener('mousedown', toggleGrid)
gridModeButton.addEventListener('mousedown', toggleGridMode)
resetCanvasButton.addEventListener('mousedown', resetCanvas)
setCanvasColourButton.addEventListener('mousedown', setCanvasColour)

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
    animateResetCanvasButton()
}

function animateResetCanvasButton () {
    resetCanvasButton.style.animation = 'rotate-360 500ms'
    resetCanvasButton.removeEventListener('mousedown', resetCanvas);
    setTimeout(() => {
        resetCanvasButton.addEventListener('mousedown', resetCanvas),
        resetCanvasButton.style.animation = ''
    }, 500)
}

function clearCells(cell) {
    cell.style.backgroundColor = canvasColour;
    cell.style.transition = 'background-colour, 1s';
    cell.classList.remove('painted');
    setTimeout(() => {
        cell.style.transition = ''; 
    }, 1000)
}

function setCanvasColour() {
    let gridSize = Math.sqrt(gridArea);
    activeBrush = activeBrushElement.style.backgroundColor
    canvasColour = activeBrush;
    for (let i = 0; i < gridArea; i++) {
        setTimeout(setDefaultCellColour, 50*Math.floor(i/gridSize), cells[i])
    }
}

function setDefaultCellColour(cell) {
    if (cell.classList.contains('painted')) return
    previewBrush = false
    currentCellColour = canvasColour;
    cell.style.backgroundColor = canvasColour;
    cell.style.transition = 'background-colour, 1s';
    setTimeout(() => {
        cell.style.transition = '';
    }, 1000)
    setTimeout(() => {
        previewBrush = true;
    }, 1500)
}

// tools

const paintbrushToolElement = document.querySelectorAll('.tool')[5]
const paintbrushSizeToolElement = document.querySelectorAll('.tool')[7]
const paintbrushShapeToolElement = document.querySelectorAll('.tool')[9]
const floodFillToolElement = document.querySelectorAll('.tool')[11]
const colourPickerToolElement = document.querySelectorAll('.tool')[13]
const brightenToolElement = document.querySelectorAll('.tool')[15]
const darkenToolElement = document.querySelectorAll('.tool')[17]
const eraserToolElement = document.querySelectorAll('.tool')[19]
const downloadToolElement = document.querySelectorAll('.tool')[21]

const toolElements = [paintbrushToolElement, floodFillToolElement, colourPickerToolElement, brightenToolElement, darkenToolElement, eraserToolElement, downloadToolElement];

let activeToolElement = paintbrushToolElement;

toolElements.forEach(tool => {
    tool.addEventListener('mousedown', () => {
        selectActiveTool(tool);
    })
});

function selectActiveTool(tool) {
    activeToolElement.classList.toggle('active-tool');
    activeToolElement = tool;
    activeToolElement.classList.toggle('active-tool');
}

paintbrushToolElement.addEventListener('mousedown', disableEraser)
eraserToolElement.addEventListener('mousedown', enableEraser)

function enableEraser() {
    if (activeToolElement !== eraserToolElement) return
    activeBrush = canvasColour
    eraserOn = true
    return eraserOn
}

function disableEraser() {
    activeBrush = activeBrushElement.style.backgroundColor
    eraserOn = false
    return eraserOn
}

// paint functions

canvas.addEventListener('mousedown', enablePainting);
canvas.addEventListener('mouseup', disablePainting);
canvas.addEventListener('mouseleave', disablePainting);

function disablePainting() {
    isPainting = false;
    return isPainting
}

let isPainting = false;
let colourPickerOn = false;
let eraserOn = false;

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
        if (eraserOn === false) {
            cell.classList.add('painted');
        } else if (eraserOn === true) {
            cell.classList.remove('painted'); 
        }
    }
}
