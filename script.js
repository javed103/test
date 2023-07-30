 // Default grid size
 let gridSize = 8;

 // Default color
 let selectedColor = "#000000";

 // Create the grid
 function createGrid(size) {
   let gridContainer = document.getElementById("grid-container");
   gridContainer.innerHTML = "";
   // Adjust grid container alignment to center the grid
   gridContainer.style.gridTemplateColumns = `repeat(${size}, 30px)`;
   gridContainer.style.marginLeft = `${(8 - size) * 15}px`;

   gridContainer.style.gridTemplateColumns = `repeat(${size}, 30px)`;

   for (let i = 0; i < size * size; i++) {
     let pixel = document.createElement("div");
     pixel.classList.add("pixel");
     pixel.addEventListener("click", function() {
       this.style.backgroundColor = selectedColor;
     });
     gridContainer.appendChild(pixel);
   }
 }

 // Change the grid size
 function changeGridSize(size) {
   gridSize = size;
   createGrid(size);
 }

 // Select color from the palette
 let colors = document.getElementsByClassName("color");
 for (let i = 0; i < colors.length; i++) {
   colors[i].addEventListener("click", function() {
     selectedColor = this.style.backgroundColor;
   });
 }

 // Save the grid as an image (You can implement this part using PHP on the server-side)
  function saveImage() {
   // Create a canvas element for the grid
  // let pixels = document.getElementsByClassName("pixel");
  const canvas = document.createElement("canvas");
 canvas.width = gridSize * 30; // Each cell is 30px wide
 canvas.height = gridSize * 30; // Each cell is 30px high

 const ctx = canvas.getContext("2d");

 // Draw the grid lines
 ctx.beginPath();
 for (let i = 1; i < gridSize; i++) {
   const x = i * 30;
   ctx.moveTo(x, 0);
   ctx.lineTo(x, canvas.height);
   ctx.moveTo(0, x);
   ctx.lineTo(canvas.width, x);
 }
 ctx.strokeStyle = "#000000"; // Grid line color
 ctx.stroke();

 // Loop through each pixel and draw the colored cells on the canvas
 const pixels = document.querySelectorAll(".pixel");
 for (let i = 0; i < pixels.length; i++) {
   const x = (i % gridSize) * 30;
   const y = Math.floor(i / gridSize) * 30;
   const color = pixels[i].style.backgroundColor;
   if (color !== "rgba(0, 0, 0, 0)") {
     // Check if the cell is colored (not transparent)
     ctx.fillStyle = color;
     ctx.fillRect(x, y, 30, 30);
   }
 }

 // Convert the canvas to a data URL and create a link for download
 const dataURL = canvas.toDataURL();
 const downloadLink = document.createElement("a");
 downloadLink.href = dataURL;

 // Set the filename for the downloaded image
 const timestamp = new Date().getTime();
 const filename = `pixel_art_${gridSize}x${gridSize}_${timestamp}.png`;
 downloadLink.download = filename;

 // Append the link to the document and initiate the download
 document.body.appendChild(downloadLink);
 downloadLink.click();

 // Remove the link from the document (cleanup)
 document.body.removeChild(downloadLink);
}


 // Initialize the grid with default size
 createGrid(gridSize);