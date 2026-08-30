const container = document.querySelector('#container');

const gridSizeSlider = document.querySelector('#grid-size');
const dispSelectedGridSize = document.querySelector('#selected-grid-size');

// Size system of whole grid
const CANVAS_SIZE = 500;
container.style.width = `${CANVAS_SIZE}px`;
container.style.height = `${CANVAS_SIZE}px`;

// First time creating canvas at time of page loading with 10 x 10 divs grid
let grid = 10;
displaySelectedGridSize(grid);
recreateGrid(grid);

// Attaching 'input' (continuous) type event listener, for display of selected grid size
gridSizeSlider.addEventListener('input', (e) => displaySelectedGridSize(e.target.value));

// Attaching 'change' (only on mouse release) type event listener, to re-create the grid
gridSizeSlider.addEventListener('change', (e) => recreateGrid(e.target.value));

// Simple displays the grid size on UI
function displaySelectedGridSize(gridSize) {
    dispSelectedGridSize.textContent = `${gridSize} x ${gridSize}`;
}


// Main function called every time when there is a change in grid size. It further
// calls removeExistingGrid() function to remove existing grid and also recalculates
// heightAndWidth values for ROW height and DIV width.
function recreateGrid(gridSize) {
    removeExistingGrid();

    // height and width are basically the same
    let heightAndWidth = Math.round((CANVAS_SIZE / gridSize), 3); 

    // First add rows
    for (let rows = gridSize; rows > 0; rows--) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        rowDiv.style.flexBasis = `${heightAndWidth}px` 
        // Individual div height is not set because this is 
        // flex system and flex-basis are need to be set instead.

        container.appendChild(rowDiv);

        // Now add individual divs inside each row
        for (let singleDivs = gridSize; singleDivs > 0; singleDivs--) {
            const singleDiv = document.createElement('div');
            singleDiv.classList.add('grid-div');
            singleDiv.style.width = `${heightAndWidth}px`;
            // Only DIV with needs to be set, height is set from flex-basis of ROW
            
            // Settings for 'color-change on-hover' effect
            let brownRGBA = '165, 42, 42';
            let opacity = 0.00;
            singleDiv.addEventListener('mouseenter', (e) => {
                opacity = opacity >= 1.00 ? 1.00 : opacity + 0.10; // Max opacity value 1.00
                bgColor = `rgba(${brownRGBA}, ${opacity})`;
                e.target.style.backgroundColor = bgColor;
            })
            
            // Append rowDiv along with its eventListener
            rowDiv.appendChild(singleDiv);
        }   
    }
}

// Before creating new grid, we have to remove existing grid
function removeExistingGrid() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
