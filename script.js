const remSlider = document.getElementById("rem-slider");
const h1Slider = document.getElementById("h1-slider");
const h2Slider = document.getElementById("h2-slider");
const resetButton = document.querySelector(".reset-button");

// Random color generator
function getRandomColor() {
    return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
}

// Update REM size and change color dynamically
remSlider.addEventListener("input", function () {
    document.documentElement.style.setProperty("--rem-size", this.value + "rem");
    document.documentElement.style.setProperty("--rem-color", getRandomColor());
});

// Update H1 size and change color dynamically
h1Slider.addEventListener("input", function () {
    document.documentElement.style.setProperty("--h1-size", this.value + "px");
    document.documentElement.style.setProperty("--h1-color", getRandomColor());
});

// Update H2 size and change color dynamically
h2Slider.addEventListener("input", function () {
    document.documentElement.style.setProperty("--h2-size", this.value + "px");
    document.documentElement.style.setProperty("--h2-color", getRandomColor());
});

///// Reset Button Functionality///////
resetButton.addEventListener("click", function () {
    remSlider.value = "1";
    h1Slider.value = "16";
    h2Slider.value = "32";

    document.documentElement.style.setProperty("--rem-size", "1rem");
    document.documentElement.style.setProperty("--h1-size", "16px");
    document.documentElement.style.setProperty("--h2-size", "32px");

    document.documentElement.style.setProperty("--rem-color", "blue");
    document.documentElement.style.setProperty("--h1-color", "red");
    document.documentElement.style.setProperty("--h2-color", "green");
});

   // Function to update the slider background
   function updateSliderBackground(slider) {
    let value = slider.value; // Get slider value
    let min = slider.min;
    let max = slider.max;
    let percentage = ((value - min) / (max - min)) * 100;

    // 🎨 Left side = Blue (#34d3ff), Right side = Yellow (#fff04b)
    slider.style.background = `linear-gradient(to right, #34d3ff 0%, #34d3ff ${percentage}%, #fff04b ${percentage}%, #fff04b 100%)`;
}

// Get all sliders
const sliders = document.querySelectorAll("input[type='range']");

// Add event listener to each slider
sliders.forEach(slider => {
    slider.addEventListener("input", function () {
        updateSliderBackground(this);
    });

    // Initialize the background on page load
    updateSliderBackground(slider);
});

const lineHeightSlider = document.getElementById("line-height-slider");

// Update line-height dynamically
lineHeightSlider.addEventListener("input", function () {
    document.documentElement.style.setProperty("--line-height", this.value);
    document.querySelectorAll("p").forEach(p => {  
        p.style.lineHeight = this.value;
    });
});


// SVG FUNCTION!!
document.getElementById("save-svg-btn").addEventListener("click", saveAsSVG);

function saveAsSVG() {
let targetElement = document.querySelector("#blended-content"); // Update this ID to match your content
let width = targetElement.offsetWidth;
let height = targetElement.offsetHeight;

// Create a canvas
let canvas = document.createElement("canvas");
canvas.width = width;
canvas.height = height;
let ctx = canvas.getContext("2d");

// Use html2canvas to capture blended content
html2canvas(targetElement, {
backgroundColor: null,
useCORS: true
}).then(canvas => {
let imgData = canvas.toDataURL("image/png");

// Wrap image in SVG
let svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <image href="${imgData}" width="${width}" height="${height}" />
</svg>`;

let blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
let url = URL.createObjectURL(blob);

let a = document.createElement("a");
a.href = url;
a.download = "blended-output.svg";
a.click();
URL.revokeObjectURL(url);
});
}

///////////  SAVE PNG function /////////
document.getElementById("save-png-btn").addEventListener("click", saveAsPNG);

function saveAsPNG() {
let targetElement = document.querySelector(".container"); // Adjust selector if needed

html2canvas(targetElement, {
backgroundColor: null,
useCORS: true
}).then(canvas => {
let a = document.createElement("a");
a.href = canvas.toDataURL("image/png");
a.download = "blended-output.png";
a.click();
}).catch(error => {
console.error("Error capturing content:", error);
});
}



// -- /////////////////////////////////////////////////////////
// ----------------- [  ABOUT PAGE _ Pop-Up Window  ] -----------------
// //////////////////////////////////////////////////////////////////////////-->


document.getElementById("about").addEventListener("click", function () {
    let popup = document.getElementById("about-popup");

    if (!popup) {
        popup = document.createElement("div");
        popup.id = "about-popup";
        popup.style.position = "fixed";
        popup.style.width = "500px";
        popup.style.maxHeight = "400px"; // Set max height
        popup.style.overflow = "auto"; // Enable scroll bar when content is too long
        popup.style.height = "auto";
        popup.style.background = "#ff489a";
        popup.style.color = "black";
        popup.style.fontFamily = "authentic-sans-90"
        popup.style.lineHeight = "120%"
        popup.style.padding = "20px";
        popup.style.textAlign = "left";
        popup.style.top = "50%";
        popup.style.left = "50%";
        popup.style.outline = "5px solid #fff04b";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.zIndex = "1000";
        popup.innerHTML = `
<span id="close-popup" style="
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 100;">

  ✕
  
  </span>
  
<p style="margin-bottom: 20px;">ABOUT</p>
<p style="margin-bottom: 20px;"><span style="font-family: authentic-sans-130;">Illegible Text</span> is web pattern generator using illegible typography comprised of geometric elements.</p>
     <p style="text-indent: 40px; margin-bottom: 20px; "> Try typing in some letters to design your own pattern!</p>
        <p style=" margin-bottom: 20px; "> [this paragraph is placeholder text]Illegible Website is an experimental typography project exploring patterns generated by text using a custom variable font.Illegible Website is an experimental typography project exploring patterns generated by text using a custom variable font.Illegible Website is an experimental typography project exploring patterns generated by ts generated by text using a custom variable font tktkt ktktktk tktktktk tktktk tktktktk tktktktktktktk tktkt tktktktkt tktktkt tktktk tktk.</p>
           <p> This project is designed by Jo Zixuan in 2025 @RISD GD MFA</p>
`;
        document.body.appendChild(popup);

        document.getElementById("close-popup").addEventListener("click", function () {
            popup.remove();
        });
    } else {
        popup.remove();
    }
});

///////////////------- [  GLYPHS CHART _ Pop-Up Window  ] ---------------- //////////////////////////////////////////////////////////////////////////-->
document.getElementById("chart").addEventListener("click", function () {
    let popup = document.getElementById("about-popup");

    if (!popup) {
        popup = document.createElement("div");
        popup.id = "about-popup";
        popup.style.position = "fixed";
        popup.style.width = "600px";
        popup.style.maxHeight = "390px"; // Set max height
        popup.style.overflow = "auto"; // Enable scroll bar when content is too long
        popup.style.height = "auto";
        popup.style.background = "#3fbd48";
        popup.style.color = "black";
        popup.style.fontFamily = "authentic-sans-90"
        popup.style.fontSize = "13px"
        popup.style.letterSpacing = "111%"
        popup.style.color = "white"
        popup.style.lineHeight = "120%"
        popup.style.padding = "20px";
        popup.style.paddingRight = "30px";
       
        popup.style.textAlign = "left";
        popup.style.outline = "5px solid #fff04b";
        popup.style.bottom = "0%";
        popup.style.left = "0%";
        // popup.style.top = "50%";
        // popup.style.left = "50%";
        // popup.style.transform = "translate(-50%, -50%)";
        popup.style.zIndex = "1000";
        popup.innerHTML = `
<span id="close-popup" style="
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 100;">

  ✕
  
  </span>
  
<p style="margin-bottom: 5px;mix-blend-mode:normal;">Rectangular mode</p>
<img src="rectangular-chart.svg" alt='Chart explaining what the abstract shapes' correspoding keyboard input style=" width:600px;mix-blend-mode: normal;">
<p style="margin-top: 10px;margin-bottom: 5px;mix-blend-mode:normal">Circular mode</p>
<img src="circular-chart.svg" alt='Chart explaining what the abstract shapes' correspoding keyboard input style=" width:600px;mix-blend-mode: normal;">
`;
        document.body.appendChild(popup);

        document.getElementById("close-popup").addEventListener("click", function () {
            popup.remove();
        });
    } else {
        popup.remove();
    }
});


//  //////////////////////////////////////
// -------------------- [  Toggle between Shape and Meaning  ] ---------------- //////////////////////////////////////////////////////////////////////////-->


document.getElementById("meaning").addEventListener("click", function () {
let paragraphs = document.querySelectorAll("p");
paragraphs.forEach(p => {
let currentFont = window.getComputedStyle(p).fontFamily;
if (currentFont.includes("shape-font")) {
    p.style.fontFamily = "authentic-sans-130";
} else {
    p.style.fontFamily = "shape-font";
}
});
});



//  ///////////////////////////////////
// -------------------- [  Toggle between Multiply and Solid  ] ---------------- //////////////////////////////////////////////////////////////////////////-->

document.getElementById("color-mode").addEventListener("click", function () {
let paragraphs = document.querySelectorAll("p");
paragraphs.forEach(p => {
let currentBlendMode = window.getComputedStyle(p).mixBlendMode;
if (currentBlendMode === "multiply") {
    p.style.mixBlendMode = "normal";
} else {
    p.style.mixBlendMode = "multiply";
}
});
});


////////////////////////
//   --------     Function to play sound     --------  //////////////

function playSound(soundFile) {
    let audio = new Audio(soundFile);
    audio.play();
}

// Assign different sounds to buttons
document.getElementById("save-svg-btn").addEventListener("click", function () {
    playSound("audio/button1.wav");
});

document.getElementById("save-png-btn").addEventListener("click", function () {
    playSound("audio/button2.wav");
});

document.getElementById("chart").addEventListener("click", function () {
    playSound("audio/button3.wav");
});

document.getElementById("about").addEventListener("click", function () {
    playSound("audio/button4.wav");
});

document.getElementById("meaning").addEventListener("click", function () {
    playSound("audio/button5.wav");
});

document.getElementById("color-mode").addEventListener("click", function () {
    playSound("audio/button6.wav");
});

document.querySelector(".reset-button").addEventListener("click", function () {
    playSound("audio/button8.wav");
});

// Play sound effect when slider thumb is released
document.querySelectorAll("input[type='range']").forEach(slider => {
    slider.addEventListener("change", function () {
        playSound("audio/click3.wav");
    });
});


//////////// // <!-- SHAP Variable Axis changes when clicked -->////////////////////


//   <!-- toggle between shap 1 rectangular  & 4 circular -->
document.addEventListener("DOMContentLoaded", function () {
document.querySelectorAll("p").forEach(p => {
p.addEventListener("click", function () {
    this.classList.toggle("shap-4"); // Toggle the class
});
});
});






////_______________________<< Import Image as background  >>_________________________ _____________________________________________________________________




document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none"; // Keep it hidden, but accessible via button

    // Append file input to body
    document.body.appendChild(fileInput);

    // Get the import button
    const importButton = document.getElementById("import");

    // Click event to trigger file selection
    importButton.addEventListener("click", () => {
        fileInput.click();
    });

    // Handle file selection
    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.body.style.backgroundImage = `url('${e.target.result}')`;
                document.body.style.backgroundSize = "100vw auto";
                document.body.style.backgroundPosition = "top center";
                document.body.style.backgroundRepeat = "no-repeat";
            };
            reader.readAsDataURL(file);
        }
    });

    // Drag and Drop functionality
    document.body.addEventListener("dragover", (event) => {
        event.preventDefault();
        document.body.style.opacity = "0.8";
    });

    document.body.addEventListener("dragleave", () => {
        document.body.style.opacity = "1";
    });

    document.body.addEventListener("drop", (event) => {
        event.preventDefault();
        document.body.style.opacity = "1";

        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.body.style.backgroundImage = `url('${e.target.result}')`;
                document.body.style.backgroundSize = "100vw auto";
                document.body.style.backgroundPosition = "top center";
                document.body.style.backgroundRepeat = "no-repeat";
            };
            reader.readAsDataURL(file);
        }
    });
});

//________________________<< Greyscale Function button >>_________________________ _____________________________________________________________________

document.addEventListener("DOMContentLoaded", () => {
    const greyscaleButton = document.getElementById("greyscale");
    let isGreyscale = false;

    greyscaleButton.addEventListener("click", () => {
        isGreyscale = !isGreyscale;
        document.querySelectorAll("p").forEach(p => {
            if (isGreyscale) {
                p.style.filter = "grayscale(100%)"; // Apply greyscale
                p.style.opacity = "0.6"; // Reduce opacity slightly for effect
            } else {
                p.style.filter = "none"; // Remove greyscale
                p.style.opacity = "1"; // Restore full opacity
            }
        });
    });
});

//________________________<< Text Alignment Function button >>_________________________ _____________________________________________________________________

document.addEventListener("DOMContentLoaded", () => {
    const textAlignmentButton = document.getElementById("text-alighment");
    const alignments = ["left", "center", "right"];
    let currentAlignmentIndex = 0;

    textAlignmentButton.addEventListener("click", () => {
        currentAlignmentIndex = (currentAlignmentIndex + 1) % alignments.length;
        document.querySelectorAll("p").forEach(p => {
            p.style.textAlign = alignments[currentAlignmentIndex];
        });
    });
});


 ///////////////////////// 2nd Attempt to make draggable div 
 // ///////////////////////////////////

 document.addEventListener("DOMContentLoaded", () => {
    const draggable = document.querySelector(".draggable");

    let isDragging = false;
    let isResizing = false;
    let offsetX, offsetY;

    // Detect if the user is clicking on the resize area
    draggable.addEventListener("mousedown", (e) => {
        const styles = window.getComputedStyle(draggable);
        const width = parseInt(styles.width);
        const height = parseInt(styles.height);

        // Check if the click is in the bottom-right corner (resize area)
        if (e.offsetX > width - 20 && e.offsetY > height - 20) {
            isResizing = true;
            return; // Exit to avoid triggering dragging
        }

        // Otherwise, start dragging
        isDragging = true;
        offsetX = e.clientX - draggable.offsetLeft;
        offsetY = e.clientY - draggable.offsetTop;
        draggable.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            draggable.style.left = `${e.clientX - offsetX}px`;
            draggable.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        isResizing = false;
        draggable.style.cursor = "grab"; // Reset cursor
    });

    // Ensure the cursor changes properly
    draggable.addEventListener("mouseenter", () => {
        const styles = window.getComputedStyle(draggable);
        const width = parseInt(styles.width);
        const height = parseInt(styles.height);

        draggable.style.cursor = "grab"; // Default cursor

        // Change cursor to resize if hovering over bottom-right corner
        draggable.addEventListener("mousemove", (e) => {
            if (e.offsetX > width - 20 && e.offsetY > height - 20) {
                draggable.style.cursor = "nwse-resize";
            } else if (!isDragging) {
                draggable.style.cursor = "grab";
            }
        });
    });
});
