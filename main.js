const container = document.getElementById('grid-container');

// Initialize the grid
function initGrid() {
  document.getElementById('dimensions').value = 16;
  createGrid(16);
}


// Create a grid. Use this function every time the grid is initialised or its dimensions change
function createGrid(dim, color='black') {
  
  const gridStyle = `grid-template-columns: repeat(${dim}, 1fr); grid-template-rows: repeat(${dim}, 1fr);`;
  container.setAttribute('style', gridStyle);
  
  const range_dim = Array(dim**2).fill(1);
  
  for (i of range_dim) {
    
    // Create tile
    const tile = document.createElement('div');
    
    // Add to the tile the class "grid-child"
    tile.classList.add('grid-child');

    // Add to the tile the class corresponding to its color
    tile.classList.add(color);

    // Add to the tile the event: every time the mouse goes over the tile, its color will change (in this case, to black)
    tile.addEventListener('mouseenter', addPaintingProp);

    // Append the tile to the grid
    container.appendChild(tile);
  }
}


// Clear the grid, keeping its dimensions intact
function clearGrid() {
  Array.from(container.children).forEach(childNode => {
    childNode.style.removeProperty('background');
    childNode.style.setProperty('opacity', '20%');
    childNode.style.setProperty('border', '#7a3413 dashed 1px');
  })
}


// Reset the grid to a new number of tiles n**2 (being n the desired number of rows or columns)
function resetGrid() {
  const children = Array.from(container.children);
  const sqrtChildren = children.length ** (1/2);
  if (sqrtChildren == document.getElementById('dimensions').value) {
    alert(`Your grid already has ${sqrtChildren} rows and ${sqrtChildren} columns!`);
    return;
  }

  // Delete all the tiles
  container.innerHTML = '';

  // Create new n**2 tiles
  const n = document.getElementById('dimensions').value;
  createGrid(n);
}


// This function changes the style of the tile
function addPaintingProp() {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  const classList = [...this.classList];

  // Define the background color of the tile
  this.style.background = classList.includes('rainbow') ? `#${randomColor}` 
  : classList.includes('black') ? 'black'
  : alert("Error! No color has been given as input!");
  this.style.border = 0;

  // Define the opacity of the tile: for black tiles, the opacity will grow in 0.1 each time the cursor hovers over it
  if (classList.includes('rainbow')) this.style.opacity = '100%'
  else if (classList.includes('black')) {
    if (!this.style.opacity) this.style.opacity = 0.1;
    else if (this.style.opacity < 1) this.style.opacity = parseFloat(this.style.opacity) + 0.1;
  }
  
  ;
}


// Link the buttons to the corresponding functions
function setButtons() {
  // Color switches
  const colorButtons = document.getElementsByClassName('color-pick');
  for (button of colorButtons) {
    button.addEventListener('click', switchColor);
  }

  // Clear and reset grid
  document.getElementById('clearGrid').addEventListener('click', clearGrid);
  document.getElementById('resetGrid').addEventListener('click', resetGrid);
}


// This function switches the color with which you paint the sketch
function switchColor() {
  const children = Array.from(container.children);

  for (child of children) {
    if ([...child.classList].includes(this.id)) break;
    child.removeEventListener('mouseenter', addPaintingProp);
    
    if (this.id === 'black') {
      child.classList.remove('rainbow');
      child.classList.add('black');
    }
    else {
      child.classList.remove('black');
      child.classList.add('rainbow');
    }

    child.addEventListener('mouseenter', addPaintingProp);
  }
}

setButtons();
initGrid();
