# The Odin Project | Etch-A-Sketch

![Pixel Painter Title](/images/pixel-painter-title.svg)

---

A simple in-browser painting tool. The user has a single canvas consisting of a square grid of cells, or pixels, on which to create their artwork. There are several tools and colours available, including the paintbrush, eraser, flood fill, colour picker and more. Artwork may be downloaded as a .png file.

---

## The Canvas

The canvas is made up of a grid of cells, with a minimum size of 4x4 cells and a maximum size of 64x64 cells. By default, the largest grid size is 32x32, higher sizes can be configured in the settings.

### Changing the canvas size

- The user may increment or decrement the size of the canvas by one pixel, by clicking on the plus and minus signs on either size of the canvas size.
- The user can also access a range slider to change the canvsa size by right-clicking on the canvas size tool.
- By default, the user is shown a warning dialogue when creating a new canvas, as this action cannot be undone. The user may turn this on and off in the settings, or check the box labelled "Don't say again" when prompted.

### Grid options

- Toggle grid ('): toggles the border of each cell.
- Grid mode light/dark (#): toggles between light and dark-coloured cell borders.

### Canvas tools
- Undo (Ctrl + z): this reverts the canvas to its captured state before the last action. The undo function is implemented using the memento pattern, therefore stored undo levels are limited to 20. This can be increased to a maximum of 50 in the settings.
- Clear canvas (Ctrl + r): removes all artwork from the canvas. This action can be undone.
- ~~Set default canvas colour (Ctrl + p)~~: this changed the default background colour of the canvas, retaining it even when generating a new canvas. This tool was removed due to its similarity in function to the flood fill tool.

---

## Toolbar

### Colour swatches
- The user has access to nine colour swatches. They can be selected by clicking on them or by using the number keys.
- The user may toggle the palette by right-clicking on a swatch; from there the user can change the colour to the swatch.
- A custom colour may be assigned from the palette by selecting the top-left palette swatch, which will bring up the HTML colour picker.

### Tools
- Paintbrush (b): paints the cells by clicking and dragging. Selected by default.
- Eraser (e): reverts painted cells to the default canvas colour.
- Increase brush size (]): increases the number of cells to be acted on at one time.
- Decrease brush size ([): decreases the number of cells to be acted on at one time.
- Lighten (+): gradually lightens cells by 5% per action.
- Darken (-): gradually darkens cells by 5% per action.
- Flood fill/erase (f): fills an area of cells that are the same colour, using a recursive function. This can be toggled between fill mode and erase mode by right-clicking on the flood icon, or by using the keybind (Ctrl + f).
- Colour picker (p): changes the colour of the active colour swatch to the colour of the first cell clicked on within the canvas.
- Download artwork (Ctrl + s): downloads the canvas to desktop as a .png file.

---

## Settings

The settings menu can be toggled by clicking the button in the top-right corner of the page, or by pressing (Esc) at any time.

- Toggle sound effects: toggles sound effects on/off.
- Show keyboard shortcuts: toggles the list of keyboard shortcuts on the right of the canvas. Keyboard shortcuts will still work, even without the shortcut list being displayed.
- Show warning before generating new canvas: toggles the warning dialogue shown to the user when they attempt to generate a new canvas.
- Maximum canvas size: sets the maximum canvas size the user can generate using the canvas size range slider. Large canvas sizes will take longer to generate.
- Maximum undo levels: sets the maximum number of undo levels. A higher maximum undo level can cause memory leaks, due to the implementation of the memento pattern.

---

## Known issues
Please note that some of these issues will not be resolved. Any issues that I can resolve at this present moment will be dealt with, however, if it is apparent that a solution is beyond my abilities, I intend to leave the issue in its current state to accurately reflect on my technical knowledge at this time.

Returning to this project later, with more experience and expertise, would erase this reflection, and also present an unrealistic goal to others looking at this project who are yet to start it.

- Moving the cursor outside of the canvas during a flood fill action will prevent the action from being stored, meaning it can't be undone.
- Flood fill actions are not stored if the canvas has been flood-filled and undone previously.
- Repeated use of the lighten and darken brushes increases the factor by which cells are lightened/darkened.
- Lightening/darkening cells with a brush size greater than a single cell increases the factor by which cells are lightened/darkened.
- Cells previewing the lighten/darken action are shaded by a factor of 10, rather than 5. This is because the shading is applied to the previewed colour, not to the base colour.
