const canvas = document.querySelector('#canvas');
let cells = document.querySelectorAll('.cell');
let gridWidth = 0;
let gridArea = 0;
let cellsMatrix = [];
let gridEnabled = true;
let gridMode = 'light'; 
let canvasColour = 'rgb(255, 255, 255)';
let previewBrush = true;
let floodMode = 'fill';
let currentCellColour = canvasColour;
let history = [];
let showCanvasWarning = true;
let maxGridSize = 32;
let maxUndoLevels = 20;
let showSettings = false;

const gridSlider = document.querySelector('#canvas-size-slider');
const gridSizeDisplay = document.querySelector('#canvas-size-display');
const decreaseGridSizeElement = document.querySelectorAll('.slider-operator')[0];
const increaseGridSizeElement = document.querySelectorAll('.slider-operator')[1];

const newCanvasSound = document.querySelector('#audio-new-canvas');
const gridSliderSound = document.querySelector('#audio-grid-slider');
const canvasResetSound = document.querySelector('#audio-clear-canvas');
const gridToggleSound = document.querySelector('#audio-grid-toggle');
const gridModeSound = document.querySelector('#audio-grid-mode');
const colourPickerSound = document.querySelector('#audio-colour-picker');
const floodFillSound = document.querySelector('#audio-flood-fill');
const clickSound = document.querySelector('#audio-click');
const brushSound = document.querySelector('#audio-brush');
const swapSound = document.querySelector('#audio-swap');
const errorSound = document.querySelector('#audio-error');
const saveSound = document.querySelector('#audio-save');
const menuSound = document.querySelector('#audio-menu');

const playGridSliderSound = () => {
    if (soundEffects === false) return
    gridSliderSound.currentTime = 0;
    gridSliderSound.play();
}

const playNewCanvasSound = () => {
    if (soundEffects === false) return
    newCanvasSound.currentTime = 0;
    newCanvasSound.play();
}

const playCanvasResetSound = () => {
    if (soundEffects === false) return
    canvasResetSound.currentTime = 0;
    canvasResetSound.play(); 
}

const playGridToggleSound = () => {
    if (soundEffects === false) return
    gridToggleSound.currentTime = 0;
    gridToggleSound.play(); 
}

const playGridModeSound = () => {
    if (soundEffects === false) return
    gridModeSound.currentTime = 0;
    gridModeSound.play(); 
}

const playColourPickerSound = () => {
    if (soundEffects === false) return
    colourPickerSound.currentTime = 0;
    colourPickerSound.play(); 
}

const playFloodFillSound = () => {
    if (soundEffects === false) return
    floodFillSound.currentTime = 0;
    floodFillSound.play(); 
}

const playClickSound = () => {
    if (soundEffects === false) return
    clickSound.currentTime = 0;
    clickSound.play(); 
}

const playBrushSound = () => {
    if (soundEffects === false) return
    brushSound.currentTime = 0;
    brushSound.play(); 
}

const playSwapSound = () => {
    if (soundEffects === false) return
    swapSound.currentTime = 0;
    swapSound.play(); 
}

const playErrorSound = () => {
    if (soundEffects === false) return
    errorSound.currentTime = 0;
    errorSound.play(); 
}

const playSaveSound = () => {
    if (soundEffects === false) return
    saveSound.currentTime = 0;
    saveSound.play(); 
}

const playMenuSound = () => {
    if (soundEffects === false) return
    menuSound.currentTime = 0;
    menuSound.play(); 
}

// settings

let soundEffects = true;
let keyboardShortcutsDisplay = document.querySelector('.help')

const settingSoundEffects = document.querySelectorAll('.switch-container')[0];
const settingDisplayShortcuts = document.querySelectorAll('.switch-container')[1];
const settingShowCanvasWarning = document.querySelectorAll('.switch-container')[2];
const settingShowCanvasWarningCheckbox = settingShowCanvasWarning.firstElementChild
const settingsToggles = document.querySelectorAll('.switch-container');

settingsToggles.forEach(toggle => {
    toggle.addEventListener('click', playGridModeSound);
});

settingSoundEffects.addEventListener('mousedown', toggleSoundEffects)
settingDisplayShortcuts.addEventListener('mousedown', toggleKeyboardShortcutsDisplay)
settingShowCanvasWarning.addEventListener('input', () => {
    toggleCanvasWarning(settingShowCanvasWarningCheckbox)
    toggleCanvasWarningSwitch(showCanvasWarningCheckbox)
})

function toggleSoundEffects() {
    soundEffects === true ? soundEffects = false :
    soundEffects = true;
}

function toggleKeyboardShortcutsDisplay() {
    keyboardShortcutsDisplay.style.display !== 'none' ? keyboardShortcutsDisplay.style.display = 'none' :
    keyboardShortcutsDisplay.style.display = 'block';
}

function toggleCanvasWarning(checkbox) {
    if (checkbox.checked === false) {
        showCanvasWarning = false
    } else if (checkbox.checked === true) {
        showCanvasWarning = true
    }
}

function toggleCanvasWarningSwitch(checkbox) {
    if (checkbox.checked === true) {
        checkbox.checked = false;
    } else if (checkbox.checked === false) {
        checkbox.checked = true;
    }
}

const settingMaxGridSizeInput = document.querySelectorAll('.range-value')[0]
const settingMaxGridSizeRange = document.querySelectorAll('.range-slider')[0]
const settingMaxUndoInput = document.querySelectorAll('.range-value')[1]
const settingMaxUndoRange = document.querySelectorAll('.range-slider')[1]

settingMaxGridSizeInput.addEventListener('change', () => {
    setMaxInput(settingMaxGridSizeInput, settingMaxGridSizeRange, 8, 64),
    updateMaxGridSize();
});
settingMaxGridSizeRange.addEventListener('input', () => {
    setMaxRange(settingMaxGridSizeInput, settingMaxGridSizeRange),
    updateMaxGridSize();
});
settingMaxGridSizeRange.addEventListener('change', playGridSliderSound)

settingMaxUndoInput.addEventListener('change', () => {
    setMaxInput(settingMaxUndoInput, settingMaxUndoRange, 1, 50);
});
settingMaxUndoRange.addEventListener('input', () => {
    setMaxRange(settingMaxUndoInput, settingMaxUndoRange);
});
settingMaxUndoRange.addEventListener('change', playGridSliderSound)

function setMaxInput(input, range, min, max) {
    if (input.value < min) {
        input.value = min;
    }
    if (input.value > max) {
        input.value = max;
    }
    if (input === settingMaxGridSizeInput) {
        maxGridSize = input.value;
        range.value = maxGridSize;
        return maxGridSize
    } else if (input === settingMaxUndoInput) {
        maxUndoLevels = input.value;
        range.value = maxUndoLevels;
        maxUndoLevels = Number(maxUndoLevels) + 1;
        return maxUndoLevels;
    }
}

function setMaxRange(input, range) {
    if (input === settingMaxGridSizeInput) {
        maxGridSize = range.value;
        input.value = maxGridSize;
        return maxGridSize
    } else if (input === settingMaxUndoInput) {
        maxUndoLevels = range.value;
        input.value = maxUndoLevels;
        maxUndoLevels = Number(maxUndoLevels) + 1;
        return maxUndoLevels;
    }
}

function updateMaxGridSize() {
    gridSlider.max = maxGridSize;
}

const header = document.querySelector('.header')
const settingsMenu = document.querySelector('#settings');
const settingsButton = document.querySelector('#settings-button');
const settingsArray = document.querySelectorAll('.setting');

settingsButton.addEventListener('mousedown', toggleSettingsMenu)

function toggleSettingsMenu() {
    playMenuSound();
    if (showSettings === false) {
        settingsMenu.style.display = 'flex';
        setTimeout(() => {
            settingsMenu.style.maxHeight = '30%';
        }, 100)
        header.style.height = '98vh';
        showSettingElements()
        showSettings = true;
    } else {
        setTimeout(() => {
            settingsMenu.style.display = 'none';
        }, 500)
        settingsMenu.style.maxHeight = '';
        header.style.height = '12vh';
        showSettings = false;
    }
    return showSettings;
}

function showSettingElements() {
    for (let i = 0; i < settingsArray.length; i++) {
        settingsArray[i].style.animation = '';
        settingsArray[i].style.opacity = 0;
        setTimeout(() => {
            settingsArray[i].style.animation = 'fade-up 400ms linear';
            settingsArray[i].style.opacity = 1;
        }, Math.floor(i%5)*100)
    }
}

// grid generation

decreaseGridSizeElement.addEventListener('mousedown', decreaseGridSize)
increaseGridSizeElement.addEventListener('mousedown', increaseGridSize)

function updateGridSizeDisplay() {
    gridSizeDisplay.textContent = gridSlider.value;
    playGridSliderSound()
}

function decreaseGridSize() {
    if (gridSlider.value === '4') return
    gridSlider.stepDown()
    updateGridSizeDisplay()
    if (showCanvasWarning === true) {
        showConfirmCanvasDialog()
    } else {
        timeoutChangeGridSize()
        generateGrid(gridSlider.value)
    }
}

function increaseGridSize() {
    if (gridSlider.value === maxGridSize) return
    gridSlider.stepUp()
    updateGridSizeDisplay()
    if (showCanvasWarning === true) {
        showConfirmCanvasDialog()
    } else {
        timeoutChangeGridSize()
        generateGrid(gridSlider.value)
    }
}

function timeoutChangeGridSize() {
    decreaseGridSizeElement.removeEventListener('mousedown', decreaseGridSize)
    increaseGridSizeElement.removeEventListener('mousedown', increaseGridSize)
    decreaseGridSizeElement.style.opacity = 0.5;
    increaseGridSizeElement.style.opacity = 0.5;
    decreaseGridSizeElement.style.cursor = 'wait';
    increaseGridSizeElement.style.cursor = 'wait';
    setTimeout(() => {
        decreaseGridSizeElement.addEventListener('mousedown', decreaseGridSize)
        increaseGridSizeElement.addEventListener('mousedown', increaseGridSize)
        decreaseGridSizeElement.style = '';
        increaseGridSizeElement.style = '';
    }, 1000)
}

gridSlider.addEventListener('input', updateGridSizeDisplay)
gridSlider.addEventListener('change', () => {
    if (showCanvasWarning === true) {
        showConfirmCanvasDialog()
    } else {
        generateGrid(gridSlider.value);
    }
})

function logGridSize(gridWidth, gridArea) {
    console.clear()
    console.log(`Grid size: ${gridWidth}\nGrid area: ${gridArea}`)
}

function generateGrid(gridSize) {
    if (gridSize < 4 || gridSize > maxGridSize) return
    resetGrid()
    selectActiveTool(paintbrushToolElement)
    gridArea = gridSize*gridSize
    for (let i = gridArea; i > 0; i--) {
        setTimeout(generateCells, Math.floor(250/gridSize)*(i%gridSize));
    }
    logGridSize(gridArea, gridSize)
    canvas.style.gridTemplate = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;
    playNewCanvasSound()
    history = [];
    setTimeout(storeCurrentCanvas, 500)
    setTimeout(previewCellColour, 500)
    setTimeout(enableActiveCell, 500)
    gridWidth = Number(gridSize);
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
        div.style.backgroundColor = canvasColour;
        canvas.appendChild(div);
        cells = document.querySelectorAll('.cell');
        createMatrix(cells)
        return cells;
}

function createMatrix(array) {
    cellsMatrix = [];
    let cellsArray = Array.from(array);
    for (let i = 0; i < cellsArray.length; i++) {
        cellsMatrix.push(cellsArray.splice(0,gridWidth))
    }
    return cellsMatrix
}

// canvas tools

const canvasSizeButton = document.querySelector('#canvas-size-tool')
const gridSliderContainer = document.querySelector('#canvas-slider-container')
const gridToggleButton = document.querySelectorAll('.tool')[1]
const gridModeButton = document.querySelectorAll('.tool')[2]
const undoButton = document.querySelectorAll('.tool')[3]
const resetCanvasButton = document.querySelectorAll('.tool')[4]

canvasSizeButton.addEventListener('contextmenu', e => {
    showGridSlider(e)}
)
canvasSizeButton.addEventListener('mouseleave', hideGridSlider)
gridToggleButton.addEventListener('mousedown', toggleGrid)
gridModeButton.addEventListener('mousedown', toggleGridMode)
undoButton.addEventListener('mousedown', undo)
resetCanvasButton.addEventListener('mousedown', resetCanvas)

function showGridSlider(e) {
    e.preventDefault();
    gridSliderContainer.style.display = 'flex';
    gridSliderContainer.style.animation = 'grow-from-left 400ms';
    gridSlider.style.display = 'block';
    gridSlider.style.animation = 'fade 300ms 100ms';
    setTimeout(() => {
        canvasSizeButton.addEventListener('mouseleave', hideGridSlider)
        canvas.addEventListener('mousemove', hideGridSlider)
        gridSliderContainer.style.animation = '';
        gridSlider.style.opacity = 1;
        gridSlider.style.animation = '';
    }, 400)
}

function hideGridSlider() {
    gridSliderContainer.style.animation = 'grow-from-left 300ms reverse';
    gridSlider.style.display = 'none';
    gridSlider.style.opacity = 0;
    setTimeout(() => {
        canvasSizeButton.removeEventListener('mouseleave', hideGridSlider)
        canvas.removeEventListener('mousemove', hideGridSlider)
        gridSliderContainer.style.animation = '';
        gridSliderContainer.style.display = 'none';
    }, 250)
}

const canvasOverlay = document.querySelector('#canvas-overlay');
const confirmNewCanvasButton = document.querySelector('#confirm-new-canvas-button');
const cancelNewCanvasButton = document.querySelector('#cancel-new-canvas-button');
const showCanvasWarningCheckbox = document.querySelector('#warning-toggle');

//

showCanvasWarningCheckbox.addEventListener('mousedown', () => {
    toggleCanvasWarning(showCanvasWarningCheckbox)
    toggleCanvasWarningSwitch(settingShowCanvasWarningCheckbox)
})

function showConfirmCanvasDialog() {
    canvasOverlay.style.display = 'flex';
}

function hideConfirmCanvasDialog() {
    gridSlider.value = gridWidth;
    gridSizeDisplay.textContent = gridWidth;
    canvasOverlay.style.animation = 'fade 300ms reverse'
    setTimeout(() => {
        canvasOverlay.style.animation = '';
        canvasOverlay.style.display = 'none';
    }, 250)
};

confirmNewCanvasButton.addEventListener('mousedown', () => {
    generateGrid(gridSlider.value),
    canvasOverlay.style.display = 'none';
    gridSlider.value = gridWidth;
    gridSizeDisplay.textContent = gridWidth;
    timeoutChangeGridSize()
});
cancelNewCanvasButton.addEventListener('mousedown', () => {
    hideConfirmCanvasDialog(),
    playGridModeSound();
});

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
    toggleGridButton();
    toggleGridModeButton();
    return gridEnabled;
}

function toggleGridButton() {
    playGridToggleSound();
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
    playGridModeSound();
    gridMode === 'light' ? gridModeButton.src = 'icons/icon-grid-light.svg' :
    gridModeButton.src = 'icons/icon-grid-dark.svg';
}

canvas.addEventListener('mouseup', storeCurrentCanvas)

function storeCurrentCanvas() {
    let currentCanvas = [];
    cells.forEach(cell => {
        currentCanvas.push(cell.style.backgroundColor)
    })
    history.push(currentCanvas)
    if (history.length > maxUndoLevels) {
        history.shift()
    }
}

function undo() {
    if (history.length < 2) {
        console.log('No actions to undo.');
        playErrorSound();
        return
    }
    let previousState = history[(history.length-2)];
    cells.forEach(cell => {
        cell.style.backgroundColor = previousState.shift();
    })
    history.pop()
    console.log('Previous action undone.');
    playClickSound()
}

function resetCanvas() {
    storeCurrentCanvas()
    for (let i = 0; i < gridArea; i++) {
        setTimeout(clearCells, 50*Math.floor(i/gridWidth), cells[i])
    }
    animateResetCanvasButton()
    playCanvasResetSound()
    selectActiveTool(paintbrushToolElement)
    console.log('Canvas was cleared.')
}

function clearCells(cell) {
    cell.style.backgroundColor = canvasColour;
    cell.style.transition = 'background-colour, 1s';
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

function timeoutCanvasFunctions(timeout) {
    undoButton.removeEventListener('mousedown', undo)
    undoButton.src = "icons/icon-undo-disabled.svg"
    undoButton.style.cursor = 'not-allowed';
    resetCanvasButton.removeEventListener('mousedown', resetCanvas)
    resetCanvasButton.src = "icons/icon-canvas-reset-disabled.svg"
    resetCanvasButton.style.cursor = 'not-allowed';
    setTimeout(() => {
        undoButton.addEventListener('mousedown', undo)
        undoButton.src = "icons/icon-undo.svg"
        undoButton.style.cursor = '';
        resetCanvasButton.addEventListener('mousedown', resetCanvas)
        resetCanvasButton.src = "icons/icon-canvas-reset.svg"
        resetCanvasButton.style.cursor = '';
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
    activeBrushElement;
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
    if (activeToolElement === floodFillToolElement) {
        enableFloodFill()
    }
    playBrushSound();
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

function showPalette() {
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
        playColourPickerSound()
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
const paintbrushIncreaseElement = document.querySelector('#brush-size-increase');
const paintbrushDecreaseElement = document.querySelector('#brush-size-decrease');
const floodFillToolElement = document.querySelector('#flood-fill');
const colourPickerToolElement = document.querySelector('#colour-picker');
const lightenToolElement = document.querySelector('#lighten');
const darkenToolElement = document.querySelector('#darken');
const eraserToolElement = document.querySelector('#eraser');
const downloadToolElement = document.querySelector('#download');

const toolElements = [paintbrushToolElement, floodFillToolElement, colourPickerToolElement, lightenToolElement, darkenToolElement, eraserToolElement];

let activeToolElement = paintbrushToolElement;

paintbrushToolElement.addEventListener('mousedown', () => {
    if (activeToolElement === paintbrushToolElement) return
    playClickSound()
});

toolElements.forEach(tool => {
    tool.addEventListener('mousedown', () => {
        selectActiveTool(tool);
    })
});

function selectActiveTool(tool) {
    if (activeToolElement === tool) return
    activeToolElement.classList.toggle('active-tool');
    activeToolElement = tool;
    activeToolElement.classList.toggle('active-tool');
    if (activeToolElement === lightenToolElement) {
        console.log('Lighten brush selected.')
    }
    if (activeToolElement === darkenToolElement) {
        console.log('Darken brush selected.')
    }
    if (activeToolElement === colourPickerToolElement) {
        console.log('Colour picker tool selected.')
    }
    if (activeToolElement !== paintbrushToolElement) {
        playClickSound()
    }
    updateCanvasCursor(activeToolElement);
    togglePreviewBrush(activeToolElement);
}

paintbrushToolElement.addEventListener('mousedown', enablePaintbrush);
paintbrushIncreaseElement.addEventListener('mousedown', increaseBrushSize)
paintbrushDecreaseElement.addEventListener('mousedown', decreaseBrushSize)
floodFillToolElement.addEventListener('mousedown', enableFloodFill);
floodFillToolElement.addEventListener('contextmenu', e => {
    e.preventDefault()
    toggleFloodMode()
    toggleFloodIcon()
    animateFloodIcon();
});
colourPickerToolElement.addEventListener('mousedown', enableColourPicker);
eraserToolElement.addEventListener('mousedown', enableEraser);
downloadToolElement.addEventListener('mousedown', createArtwork);

function toggleFloodMode() {
    selectActiveTool(floodFillToolElement)
    enableFloodFill()
    if (floodMode === 'fill') {
        floodMode = 'erase';
        activeBrush = canvasColour;
    } else {
        floodMode = 'fill';
        activeBrush = activeBrushElement.style.backgroundColor;
    }
    playSwapSound()
    console.log(`Flood mode set to ${floodMode}.`)
}

function toggleFloodIcon() {
    floodMode === 'fill' ? floodFillToolElement.src = 'icons/icon-flood-fill.svg' :
    floodFillToolElement.src = 'icons/icon-flood-erase.svg';
}

function animateFloodIcon() {
    floodFillToolElement.style.animation = 'swatch-swell 250ms';
    setTimeout(() => {
    floodFillToolElement.style = '';
    }, 250)
}

function enableFloodFill() {
    console.log('Flood tool selected.')
    cells.forEach(cell => {
        cell.addEventListener('mousedown', () => {
            if (activeToolElement !== floodFillToolElement) return
            if (floodMode === 'erase') activeBrush = canvasColour;
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
    console.log(`Flood filling from coordinates (${cellRow+1}, ${cellCol+1}).`)
    fill(cellsMatrix, cellRow, cellCol, cellColour, activeBrush)
    timeoutCanvasFunctions(1500)
    playFloodFillSound()
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
    activeBrush = activeBrushElement.style.backgroundColor;
    canvas.style.cursor = 'wait';
    setTimeout(() => {
        selectActiveTool(paintbrushToolElement)
        canvas.style.cursor = '';
    }, 500)
    console.log('Colour swatch updated.')
}

function animatePaletteSwatch() {
    activeBrushElement.style.animation = 'swatch-swell 250ms';
    activeBrushElement.style.transition = '250ms';
    setTimeout(() => {
        activeBrushElement.style.animation = ''; 
        activeBrushElement.style.transition = ''; 
    }, 250)
}

function enablePaintbrush() {
    activeBrush = activeBrushElement.style.backgroundColor;
    console.log('Paint brush selected.')
    eraserOn = false
    return eraserOn
}

function enableEraser() {
    if (activeToolElement !== eraserToolElement) return
    console.log('Eraser selected.')
    activeBrush = canvasColour;
    eraserOn = true
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

// brush size

let brushSize = 0

function increaseBrushSize() {
    if (brushSize === 7 || brushSize === Math.floor(gridWidth/2)) {
        playErrorSound();
        console.log('Maximum brush size for this canvas.')
        return
    }
    brushSize++
    console.log(`Brush size: ${brushSize+1}\nBrush diameter = ${brushSize*2+1} cells`)
    paintbrushIncreaseElement.classList.toggle('active-tool')
    setTimeout(() => {
        paintbrushIncreaseElement.classList.toggle('active-tool')
    }, 500)
    playClickSound()
    return brushSize;
}

function decreaseBrushSize() {
    if (brushSize === 0) {
        console.log('Brush cannot be made any smaller!')
        playErrorSound();
        return
    }
    brushSize--
    console.log(`Brush size: ${brushSize+1}\nBrush diameter = ${brushSize*2+1} cells`)
    paintbrushIncreaseElement.classList.toggle('active-tool')
    setTimeout(() => {
        paintbrushIncreaseElement.classList.toggle('active-tool')
    }, 500)
    playClickSound()
    return brushSize;
}

// painting

canvas.addEventListener('mousedown', enablePainting);
canvas.addEventListener('mouseup', disablePainting);
canvas.addEventListener('mouseleave', disablePainting);

function disablePainting() {
    setTimeout(() => {
        canvas.removeEventListener('mouseleave', storeCurrentCanvas)
    }, 100)
    isPainting = false;
    return isPainting
}

let isPainting = false;
let eraserOn = false;

function enablePainting() {
    canvas.addEventListener('mouseleave', storeCurrentCanvas)
    isPainting = true;
    cells.forEach(cell => {
        cell.addEventListener('mouseenter', () => {
            updateCell(cell);
        })
    });
}

function updateCell(cell) {
    if (activeToolElement === colourPickerToolElement ||
        activeToolElement === floodFillToolElement)
        return
    if (isPainting === true) {
        paint(cell, activeBrush)
    }
}

let neighbourCellColours = [];

function storeCellColours(cell) {
    neighbourCellColours = []
    let cellCoordinates = getCellCoordinates(cellsMatrix, cell);
    let x = cellCoordinates[0];
    let y = cellCoordinates[1];
    neighbourCellColours.push(cellsMatrix[x][y].style.backgroundColor);
    for (let i = Math.max(0, x - brushSize); i <= Math.min(x + brushSize, gridWidth - 1); i++) {
        for (let j = Math.max(0, y - brushSize); j <= Math.min(y + brushSize, gridWidth - 1); j++) {
            neighbourCellColours.push(cellsMatrix[i][j].style.backgroundColor);
        }
    }
}

function restoreCellColours(cell) {
    let cellCoordinates = getCellCoordinates(cellsMatrix, cell);
    let x = cellCoordinates[0];
    let y = cellCoordinates[1];
    cellsMatrix[x][y].style.backgroundColor = neighbourCellColours.shift();
    for (let i = Math.max(0, x - brushSize); i <= Math.min(x + brushSize, gridWidth - 1); i++) {
        for (let j = Math.max(0, y - brushSize); j <= Math.min(y + brushSize, gridWidth - 1); j++) {
            cellsMatrix[i][j].style.backgroundColor = neighbourCellColours.shift();
        }
    }
}

function previewCellColour() {
    cells.forEach(cell => {
        storeCellColours(cell)
        cell.addEventListener('mouseenter', () => {
            if (previewBrush === false || isPainting === true) return
                storeCellColours(cell)
                paint(cell, activeBrush)
        });
        cell.addEventListener('mouseup', () => {
            if (previewBrush === false) return
                neighbourCellColours = [];
                paint(cell, activeBrush);
        })
        cell.addEventListener('mouseout', () => {
            if (previewBrush === false || isPainting === true) return
                restoreCellColours(cell)
        });
    });
}

function paint(cell, colour) {
    let cellCoordinates = getCellCoordinates(cellsMatrix, cell);
    let x = cellCoordinates[0];
    let y = cellCoordinates[1];
    for (let i = Math.max(0, x - brushSize); i <= Math.min(x + brushSize, gridWidth - 1); i++) {
        for (let j = Math.max(0, y - brushSize); j <= Math.min(y + brushSize, gridWidth - 1); j++) {
            if (activeToolElement === lightenToolElement || activeToolElement === darkenToolElement) {
                shadeCell(cellsMatrix[i][j])
            } else {
                cellsMatrix[i][j].style.backgroundColor = colour;
            }
        }
    }
}

// lighten/darken brush functions

function shadeCell(cell) {
    let rgbValues = getRgbValues(cell.style.backgroundColor);
    // console.log('RGB values before shading applied:')
    // logRgbValues(rgbValues)
    shadeColour(rgbValues)
    // console.log('RGB values to apply:')
    // logRgbValues(rgbValues)
    applyShadedColour(cell, rgbValues[0], rgbValues[1], rgbValues[2])
}

function getRgbValues(string) {
    let rgbValues = [];
    rgbValues = string.slice(4,-1).split(', ').map(Number);
    return rgbValues;
}

function shadeColour(rgbValues) {
    if (activeToolElement === lightenToolElement) {
        rgbValues[0] = Math.max(0, Math.min(255, rgbValues[0] + 15));
        rgbValues[1] = Math.max(0, Math.min(255, rgbValues[1] + 15));
        rgbValues[2] = Math.max(0, Math.min(255, rgbValues[2] + 15));
    }
    if (activeToolElement === darkenToolElement) {
        rgbValues[0] = Math.max(0, Math.min(255, rgbValues[0] - 15));
        rgbValues[1] = Math.max(0, Math.min(255, rgbValues[1] - 15));
        rgbValues[2] = Math.max(0, Math.min(255, rgbValues[2] - 15));
    }
    return rgbValues;
}

function applyShadedColour(cell, r, g, b) {
    cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function logRgbValues(rgbValues) {
    console.log(`r = ${rgbValues[0] }, g = ${rgbValues[1] }, b = ${rgbValues[2] }`)
}

generateGrid(gridSlider.value)
console.log('Paint brush selected.')

// download artwork

function createArtwork() {
    let artwork = document.createElement("canvas");
    let context = artwork.getContext("2d");
    let cellSize = 1200/gridWidth;
    canvas.appendChild(artwork);
    artwork.height = cellSize * Math.ceil(cells.length / gridWidth);
    artwork.width = cellSize * gridWidth;
    cells.forEach((cell, i) => {
        let row = Math.floor(i/gridWidth);
        let col = i % gridWidth;
        context.fillStyle = cell.style.backgroundColor;
        context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    });
    downloadArtwork(artwork.toDataURL(), "pixel-painter-artwork");
    artwork.remove();
    playSaveSound();
}

function downloadArtwork (href, name) {
    let link = document.createElement('a');
    link.download = name;
    link.style.opacity = "0";
    document.body.appendChild(link);
    link.href = href;
    link.click();
    link.remove();
    console.log('Artwork donwloaded.')
}

// keyboard shortcuts

document.addEventListener('keydown', activateKeyboardShortcut)

function enableActiveCell() {
    cells.forEach(cell => {
        cell.addEventListener('mouseenter', () => {
            cell.setAttribute('id', 'active');
        })
        cell.addEventListener('mouseleave', () => {
            cell.removeAttribute('id');
        })
    })
}

function activateKeyboardShortcut(e) {
    if (showSettings === true) return
    let activeCell = document.querySelector('#active');
    if (activeCell !== null) {
        restoreCellColours(activeCell);
    }
    switch (e.key) {
        case "1":
            if (activeBrushElement === brushElement1) return
            selectActiveBrush(brushElement1)
        break
        case "2":
            if (activeBrushElement === brushElement2) return
            selectActiveBrush(brushElement2)
        break
        case "3":
            if (activeBrushElement === brushElement3) return
            selectActiveBrush(brushElement3)
        break
        case "4":
            if (activeBrushElement === brushElement4) return
            selectActiveBrush(brushElement4)
        break
        case "5":
            if (activeBrushElement === brushElement5) return
            selectActiveBrush(brushElement5)
        break
        case "6":
            if (activeBrushElement === brushElement6) return
            selectActiveBrush(brushElement6)
        break
        case "7":
            if (activeBrushElement === brushElement7) return
            selectActiveBrush(brushElement7)
        break
        case "8":
            if (activeBrushElement === brushElement8) return
            selectActiveBrush(brushElement8)
        break
        case "9":
            if (activeBrushElement === brushElement9) return
            selectActiveBrush(brushElement9)
        break
        case "b":
            if (activeToolElement === paintbrushToolElement) return
            selectActiveTool(paintbrushToolElement)
            enablePaintbrush()
            playClickSound()
        break
        case "e":
            if (activeToolElement === eraserToolElement) return
            selectActiveTool(eraserToolElement)
            enableEraser()
        break
        case "f":
            if (e.ctrlKey !== true) {
                if (activeToolElement === floodFillToolElement) return
                selectActiveTool(floodFillToolElement)
                enableFloodFill()
            } else if (e.ctrlKey === true) {
                e.preventDefault();
                toggleFloodMode()
                toggleFloodIcon()
                animateFloodIcon();
            }
        break
        case "p":
            if (activeToolElement === colourPickerToolElement) return
            selectActiveTool(colourPickerToolElement)
            enableColourPicker()
        break
        case "[":
            decreaseBrushSize()
        break
        case "=":
            if (activeToolElement === lightenToolElement) return
            selectActiveTool(lightenToolElement)
        break
        case "-":
            if (activeToolElement === darkenToolElement) return
            selectActiveTool(darkenToolElement)
        break
        case "]":
            increaseBrushSize()
        break
        case "'":
            toggleGrid()
        break
        case "#":
            toggleGridMode()
        break
        case "r":
            if (e.ctrlKey !== true) return
            e.preventDefault();
            resetCanvas()
        break
        case "z":
            if (e.ctrlKey === true); {
                e.preventDefault();
                undo()
            }
        break
        case "s":
            if (e.ctrlKey === true); {
                e.preventDefault();
                createArtwork()
            }
        break
        default:
        return
    }
    if (activeCell === null ||
        activeToolElement === floodFillToolElement ||
        activeToolElement === colourPickerToolElement ||
        activeToolElement === downloadToolElement)
        return
    storeCellColours(activeCell)
    paint(activeCell, activeBrush)
    activeCell.addEventListener('mouseout', () => {
    restoreCellColours(activeCell)
    })
}