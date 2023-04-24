const canvas = document.querySelector('#canvas');
let cells = document.querySelectorAll('.cell');
let gridArea = 0;
let cellsMatrix = [];
let gridEnabled = true;
let gridMode = 'light'; 
let canvasColour = 'white';
let previewBrush = true;
let currentCellColour = canvasColour;

const gridSlider = document.querySelector('#canvas-size-slider');
const gridSizeDisplay = document.querySelector('#canvas-size-display');
const decreaseGridSizeElement = document.querySelectorAll('.slider-operator')[0];
const increaseGridSizeElement = document.querySelectorAll('.slider-operator')[1];

const newCanvasSound = document.querySelector('#audio-new-canvas');
const gridSliderSound = document.querySelector('#audio-grid-slider');
const canvasResetSound = document.querySelector('#audio-clear-canvas');
const paintCanvasSound = document.querySelector('#audio-paint-canvas');
const colourPickerSound = document.querySelector('#audio-colour-picker');
const floodFillSound = document.querySelector('#audio-flood-fill');

const playGridSliderSound = () => {
    gridSliderSound.currentTime = 0;
    gridSliderSound.play();
}

const playNewCanvasSound = () => {
    newCanvasSound.currentTime = 0;
    newCanvasSound.play();
}

const playCanvasResetSound = () => {
    canvasResetSound.currentTime = 0;
    canvasResetSound.play(); 
}

const playPaintCanvasSound = () => {
    paintCanvasSound.currentTime = 0;
    paintCanvasSound.play(); 
}

const playColourPickerSound = () => {
    colourPickerSound.currentTime = 0;
    colourPickerSound.play(); 
}

const playFloodFillSound = () => {
    floodFillSound.currentTime = 0;
    floodFillSound.play(); 
}

decreaseGridSizeElement.addEventListener('mousedown', decreaseGridSize)
increaseGridSizeElement.addEventListener('mousedown', increaseGridSize)

function updateGridSizeDisplay() {
    gridSizeDisplay.textContent = gridSlider.value;
    playGridSliderSound()
}

function decreaseGridSize() {
    if (gridSlider.value === '4') return
    gridSlider.stepDown()
    timeoutChangeGridSize()
    updateGridSizeDisplay()
    generateGrid(gridSlider.value)
}

function increaseGridSize() {
    if (gridSlider.value === '32') return
    gridSlider.stepUp()
    timeoutChangeGridSize()
    updateGridSizeDisplay()
    generateGrid(gridSlider.value)
}

function timeoutChangeGridSize() {
    decreaseGridSizeElement.removeEventListener('mousedown', decreaseGridSize)
    increaseGridSizeElement.removeEventListener('mousedown', increaseGridSize)
    setTimeout(() => {
        decreaseGridSizeElement.addEventListener('mousedown', decreaseGridSize)
        increaseGridSizeElement.addEventListener('mousedown', increaseGridSize)
    }, 1000)
}

gridSlider.addEventListener('input', updateGridSizeDisplay)
gridSlider.addEventListener('change', () => {
    generateGrid(gridSlider.value);
})

function logGridSize(gridArea, gridSize) {
    console.clear()
    console.log(`Grid size: ${gridSize}x${gridSize}\nGrid area: ${gridArea}`)
}

function generateGrid(gridSize) {
    if (gridSize < 4 || gridSize > 64) return
    resetGrid()
    selectActiveTool(paintbrushToolElement)
    gridArea = gridSize*gridSize
    for (let i = gridArea; i > 0; i--) {
        setTimeout(generateCells, Math.floor(250/gridSize)*(i%gridSize));
    }
    logGridSize(gridArea, gridSize)
    canvas.style.gridTemplate = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;
    playNewCanvasSound()
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
        createMatrix(cells)
        return cells;
}

function createMatrix(array) {
    cellsMatrix = [];
    let gridSize = Math.sqrt(gridArea);
    let cellsArray = Array.from(array);
    for (let i = 0; i < cellsArray.length; i++) {
        cellsMatrix.push(cellsArray.splice(0,gridSize))
    }
    return cellsMatrix
}

// canvas tools

const canvasSizeButton = document.querySelector('#canvas-size-tool')
const gridSliderContainer = document.querySelector('.canvas-size-slider-container')
const gridToggleButton = document.querySelectorAll('.tool')[1]
const gridModeButton = document.querySelectorAll('.tool')[2]
const resetCanvasButton = document.querySelectorAll('.tool')[3]
const setCanvasColourButton = document.querySelectorAll('.tool')[4]

canvasSizeButton.addEventListener('mouseenter', showGridSlider)
gridToggleButton.addEventListener('mousedown', toggleGrid)
gridModeButton.addEventListener('mousedown', toggleGridMode)
resetCanvasButton.addEventListener('mousedown', resetCanvas)
setCanvasColourButton.addEventListener('mousedown', setCanvasColour)

function showGridSlider() {
    gridSliderContainer.style.display = 'flex';
    gridSliderContainer.style.animation = 'grow-from-left 800ms';
    gridSlider.style.display = 'block';
    gridSlider.style.animation = 'fade 400ms 400ms';
    setTimeout(() => {
        canvasSizeButton.removeEventListener('mouseenter', showGridSlider)
        canvasSizeButton.addEventListener('mouseleave', hideGridSlider)
        canvas.addEventListener('mousemove', hideGridSlider)
        gridSliderContainer.style.animation = '';
        gridSlider.style.opacity = 1;
        gridSlider.style.animation = '';
    }, 800)
}

function hideGridSlider() {
    gridSliderContainer.style.animation = 'shrink-to-left 300ms';
    gridSlider.style.display = 'none';
    gridSlider.style.opacity = 0;
    setTimeout(() => {
        canvasSizeButton.removeEventListener('mouseleave', hideGridSlider)
        canvas.removeEventListener('mousemove', hideGridSlider)
        canvasSizeButton.addEventListener('mouseenter', showGridSlider)
        gridSliderContainer.style.animation = '';
        gridSliderContainer.style.display = 'none';
    }, 250)
}

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
    playCanvasResetSound()
    console.log('Canvas was cleared')
}

function clearCells(cell) {
    cell.style.backgroundColor = canvasColour;
    cell.style.transition = 'background-colour, 1s';
    cell.classList.remove('painted');
    setTimeout(() => {
        cell.style.transition = ''; 
    }, 1000)
}

function animateResetCanvasButton () {
    resetCanvasButton.style.animation = 'rotate-360 500ms'
    resetCanvasButton.removeEventListener('mousedown', resetCanvas);
    setTimeout(() => {
        resetCanvasButton.addEventListener('mousedown', resetCanvas),
        resetCanvasButton.style.animation = ''
    }, 500)
}

function setCanvasColour() {
    let gridSize = Math.sqrt(gridArea);
    activeBrush = activeBrushElement.style.backgroundColor
    canvasColour = activeBrush;
    playPaintCanvasSound()
    timeoutCanvasFunctions(1000);
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

function timeoutCanvasFunctions(timeout) {
    resetCanvasButton.removeEventListener('mousedown', resetCanvas)
    resetCanvasButton.src = "icons/icon-canvas-reset-disabled.svg"
    resetCanvasButton.style.cursor = 'not-allowed';
    setCanvasColourButton.removeEventListener('mousedown', setCanvasColour)
    setCanvasColourButton.src = "icons/icon-canvas-colour-disabled.svg"
    setCanvasColourButton.style.cursor = 'not-allowed';
    setTimeout(() => {
        resetCanvasButton.addEventListener('mousedown', resetCanvas)
        resetCanvasButton.src = "icons/icon-canvas-reset.svg"
        resetCanvasButton.style.cursor = '';
        setCanvasColourButton.addEventListener('mousedown', setCanvasColour)
        setCanvasColourButton.src = "icons/icon-canvas-colour.svg"
        setCanvasColourButton.style.cursor = '';
    }, timeout)
}

// brushes

const brushElement1 = document.querySelector('#brush-one');
const brushElement2 = document.querySelector('#brush-two');
const brushElement3 = document.querySelector('#brush-three');
const brushElement4 = document.querySelector('#brush-four');
const brushElement5 = document.querySelector('#brush-five');
const brushElement6 = document.querySelector('#brush-six');
const brushElement7 = document.querySelector('#brush-seven');
const brushElement8 = document.querySelector('#brush-eight');
const brushElement9 = document.querySelector('#brush-nine');

const brushElements = [brushElement1, brushElement2, brushElement3, brushElement4, brushElement5, brushElement6, brushElement7, brushElement8, brushElement9];

const palette = document.querySelector('#palette')
const paletteWrapper = document.querySelector('#palette-wrapper')

let brush1 = brushElement1.style.backgroundColor;
let brush2 = brushElement2.style.backgroundColor;
let brush3 = brushElement3.style.backgroundColor;
let brush4 = brushElement4.style.backgroundColor;
let brush5 = brushElement5.style.backgroundColor;
let brush6 = brushElement6.style.backgroundColor;
let brush7 = brushElement7.style.backgroundColor;
let brush8 = brushElement8.style.backgroundColor;
let brush9 = brushElement9.style.backgroundColor;

function updateBrushColours() {
    brush1 = brushElement1.style.backgroundColor;
    brush2 = brushElement2.style.backgroundColor;
    brush3 = brushElement3.style.backgroundColor;
    brush4 = brushElement4.style.backgroundColor;
    brush5 = brushElement5.style.backgroundColor;
    brush6 = brushElement6.style.backgroundColor;
    brush7 = brushElement7.style.backgroundColor;
    brush8 = brushElement8.style.backgroundColor;
    brush9 = brushElement9.style.backgroundColor;
}

let activeBrush = brush1;
let activeBrushElement = brushElement1;

brushElements.forEach(brush => {
    brush.addEventListener('mousedown', () => {
        selectActiveBrush(brush);
    })
});

function selectActiveBrush(brush) {
    activeBrushElement.classList.toggle('active-tool');
    switch(brush) {
        case brushElement1:
            activeBrush = brush1;
            break;
        case brushElement2:
            activeBrush = brush2;
            break;
        case brushElement3:
            activeBrush = brush3;
            break;
        case brushElement4:
            activeBrush = brush4;
            break;
        case brushElement5:
            activeBrush = brush5;
            break;''
        case brushElement6:
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

// palette

brushElements.forEach(brushElement => {
    brushElement.addEventListener('contextmenu', () => {
        appendPalette(brushElement),
        positionPalette(brushElement),
        showPalette(brushElement);
    })
    brushElement.addEventListener('mouseleave', hidePalette)
});

paletteWrapper.addEventListener('mouseleave', hidePalette)

function appendPalette(brushElement) {
    brushElement.appendChild(paletteWrapper);
}

function positionPalette(brushElement) {
    switch(brushElement) {
        case brushElement1:
            palette.style.marginTop = '-0.1rem';
            break;
        case brushElement2:
            palette.style.marginTop = '-2.9rem';
            break;
        case brushElement8:
            palette.style.marginTop = '-6.0rem';
            break;
        case brushElement9:
            palette.style.marginTop = '-8.9rem';
            break;
        default:
            palette.style.marginTop = '-4.7rem';
    }
}

function showPalette(brushElement) {
    palette.style.display = 'grid';
    palette.style.animation = 'slide-in 200ms ease-in';
    paletteVisible = true;
    setTimeout(() => {
        palette.style.animation = '';
    }, 200)
}

function hidePalette() {
    palette.style.animation = '';
    palette.style.animation = 'slide-in 200ms ease-in reverse';
    setTimeout(() => {
        palette.style.display = 'none';
    }, 190)
}

const paletteSwatches = document.querySelectorAll('.palette-swatch')
const customColourInput = document.querySelector('#custom-colour-input');

paletteSwatches.forEach(swatch => {
    swatch.addEventListener('mousedown', () => {
        updateParentSwatch(swatch);
    })
})

function updateParentSwatch(swatch) {
    activeBrushElement.style.backgroundColor = swatch.style.backgroundColor;
    updateBrushColours()
}

customColourInput.addEventListener('input', () => {
    setCustomColour(activeBrushElement);
})

function setCustomColour(brush) {
    activeBrushElement.style.backgroundColor = customColourInput.value;
    updateBrushColours()
    selectActiveBrush(brush)
}

// tools

const paintbrushToolElement = document.querySelector('#paintbrush');
const paintbrushSizeToolElement = document.querySelector('#brush-size');
const paintbrushShapeToolElement = document.querySelector('#brush-shape');
const floodFillToolElement = document.querySelector('#flood-fill');
const colourPickerToolElement = document.querySelector('#colour-picker');
const brightenToolElement = document.querySelector('#lighten');
const darkenToolElement = document.querySelector('#darken');
const eraserToolElement = document.querySelector('#eraser');
const downloadToolElement = document.querySelector('#download');

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
    updateCanvasCursor(activeToolElement);
    togglePreviewBrush(activeToolElement);
}

paintbrushToolElement.addEventListener('mousedown', enablePaintbrush)
floodFillToolElement.addEventListener('mousedown', enableFloodFill)
colourPickerToolElement.addEventListener('mousedown', enableColourPicker)
eraserToolElement.addEventListener('mousedown', enableEraser)

function enableFloodFill() {
    cells.forEach(cell => {
        cell.addEventListener('mousedown', () => {
            if (activeToolElement !== floodFillToolElement) return
            floodFill(cell);
        })
    });
}

function getCellCoordinates(matrix, cell) {
    for (let rowNum = 0; rowNum < matrix.length; rowNum++) {
      let columnNum = matrix[rowNum].indexOf(cell);
      if (columnNum > -1) {
        return [rowNum, columnNum];
        }
    }
}

function fill(matrix, x, y, oldColour, newColour) {
    if (oldColour === newColour) return
    if (x < 0 || x >= matrix.length || y < 0 || y >= matrix[x].length) return;
    if (matrix[x][y].style.backgroundColor !== oldColour) return;
    matrix[x][y].style.backgroundColor = newColour;
    matrix[x][y].classList.add('painted');
    matrix[x][y].style.transition = 'background-colour, 500ms';
    setTimeout(() => {
        matrix[x][y].style.transition = '';
    }, 500)
    setTimeout(() => {
        fill(matrix, x + 1, y, oldColour, newColour);
        fill(matrix, x - 1, y, oldColour, newColour);
        fill(matrix, x, y + 1, oldColour, newColour);
        fill(matrix, x, y - 1, oldColour, newColour);
    }, 10)
}

function floodFill(cell) {
    let cellColour = cell.style.backgroundColor;
    if (cellColour === activeBrush) return
    let cellCoordinates = getCellCoordinates(cellsMatrix, cell);
    let cellRow = cellCoordinates[0];
    let cellCol = cellCoordinates[1];
    fill(cellsMatrix, cellRow, cellCol, cellColour, activeBrush)
    timeoutCanvasFunctions(1500)
    playFloodFillSound()
    // console.log(`Flood filling from coordinates: \nRow: ${cellRow}\nCol: ${cellCol}.`)
}

function enableColourPicker() {
    cells.forEach(cell => {
        cell.addEventListener('mousedown', () => {
            if (activeToolElement !== colourPickerToolElement) return
            pickColour(cell, activeBrushElement);
        })
    });
}

function pickColour(cell, brush) {
    if (activeBrushElement.style.backgroundColor === cell.style.backgroundColor) return
    activeBrushElement.style.backgroundColor = cell.style.backgroundColor;
    animatePaletteSwatch()
    playColourPickerSound()
    selectActiveBrush(brush)
    updateBrushColours()
}

function animatePaletteSwatch() {
    activeBrushElement.style.animation = 'swatch-swell 250ms';
    activeBrushElement.style.transition = '250ms';
    setTimeout(() => {
        activeBrushElement.style.animation = ''; 
        activeBrushElement.style.transition = ''; 
    }, 250)
}

function enableEraser() {
    if (activeToolElement !== eraserToolElement) return
    activeBrush = canvasColour
    eraserOn = true
    return eraserOn
}

function enablePaintbrush() {
    activeBrush = activeBrushElement.style.backgroundColor;
    eraserOn = false
    return eraserOn
}

function updateCanvasCursor(activeToolElement) {
    switch(activeToolElement) {
        case colourPickerToolElement:
            canvas.style.cursor = 'crosshair';
            break;
        default:
            canvas.style.cursor = 'cell';
    }
}

function togglePreviewBrush(activeToolElement) {
    switch(activeToolElement) {
        case colourPickerToolElement:
            previewBrush = false;
            break;
        case floodFillToolElement:
            previewBrush = false
            break;
        default:
            previewBrush = true;
    }
}

// paint - preview on hover

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

// painting

canvas.addEventListener('mousedown', enablePainting);
canvas.addEventListener('mouseup', disablePainting);
canvas.addEventListener('mouseleave', disablePainting);

function disablePainting() {
    isPainting = false;
    return isPainting
}

let isPainting = false;
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
    if (activeToolElement === colourPickerToolElement ||
        activeToolElement === floodFillToolElement)
        return
    if (isPainting === true) {
        cell.style.backgroundColor = activeBrush;
        if (eraserOn === false) {
            cell.classList.add('painted');
        } else if (eraserOn === true) {
            cell.classList.remove('painted'); 
        }
    }
}

generateGrid(gridSlider.value);