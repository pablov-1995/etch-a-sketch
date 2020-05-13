const container = document.getElementById('grid-container');

// Initialise the grid
function initGrid() {
  document.getElementById('dimensions').value = 16;
  createGrid(16);
}


// Create a grid. Use this function every time the grid is initialised or its dimensions change
function createGrid(dim, color='black') {
  
  gridStyle = `grid-template-columns: repeat(${dim}, 1fr); grid-template-rows: repeat(${dim}, 1fr);`
  container.setAttribute('style', gridStyle);
  range_dim = Array(dim**2).fill(1);
  
  for (i of range_dim) {
    
    // Create square
    let sqr = document.createElement('div');
    
    // Add to the square the class "grid-child"
    sqr.classList.add('grid-child');

    // Add to the square the class corresponding to its color
    sqr.classList.add(color);

    // Add to the square the event: every time the mouse goes over the square, its color will change (in this case, to black)
    sqr.addEventListener('mouseenter', addPaintingProp);

    // Append the square to the grid
    container.appendChild(sqr);
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


// Reset the grid to a new number of squares n**2 (being n the desired number of rows or columns)
function resetGrid() {
  children = Array.from(container.children);
  numberChildren = children.length ** (1/2);
  if (numberChildren == document.getElementById('dimensions').value) return ;
  
  // Delete all the squares
  container.innerHTML = '';

  // Create new n**2 squares
  n = document.getElementById('dimensions').value;
  createGrid(n);
}


// This function changes the style of the square
function addPaintingProp() {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  classList= [...this.classList];

  this.style.background = classList.includes('rainbow') ? `#${randomColor}` 
  : classList.includes('black') ? 'black'
  : alert("Error! No color has been given as input!");
  
  this.style.opacity = '100%';
  this.style.border = 0;
}


// Link the buttons to the corresponding functions
function setButtons() {
  // Color switches
  colorButtons = document.getElementsByClassName('color-pick');
  for (button of colorButtons) {
    button.addEventListener('click', switchColor);
  }

  // Clear and reset grid
  document.getElementById('clearGrid').addEventListener('click', clearGrid);
  document.getElementById('resetGrid').addEventListener('click', resetGrid)
}


// This functions switches the color with which you paint the sketch
function switchColor() {
  children = Array.from(container.children);

  for (child of children) {
    if ([...child.classList].includes(this.id)) break;
    child.removeEventListener('mouseenter', addPaintingProp);
    
    if (this.id === 'black') {
      child.classList.remove('rainbow')
      child.classList.add('black');
    }
    else {
      child.classList.remove('black')
      child.classList.add('rainbow');
    }

    child.addEventListener('mouseenter', addPaintingProp);
  }
}

setButtons();
initGrid();
