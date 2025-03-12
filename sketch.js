
// let myFont;
// function preload() {
//     myFont = loadFont('shape-variable-font.otf'); // Replace with your actual font path
// }




let canvasWidth = 800; // Set a default size
let canvasHeight = 600;

function setup() {
    let container = document.querySelector(".container");

    if (container) {
        canvasWidth = container.offsetWidth || 800;
        canvasHeight = container.offsetHeight || 600;
    }

    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.position(container ? container.offsetLeft : 0, container ? container.offsetTop : 0);
    console.log("Canvas Size:", canvasWidth, canvasHeight);
}

html2canvas(document.querySelector('.container')).then(img => {
    let containerImage = img.getContext('2d');
    image(containerImage, 0, 0, width, height); // Draw HTML onto p5.js canvas
});

    function setup() {
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1'); // Push canvas behind other elements


    // Create a button for saving the image
    let saveButton = createButton('Save Pattern');
    saveButton.position(10, 10);
    saveButton.style('z-index', '10'); // Bring button to the front
    saveButton.mousePressed(() => saveCanvas('pattern', 'png'));
}
  
        