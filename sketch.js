let startX, startY, isSelecting = false, resizing = false;
let selections = [];
let currentSelection = null;

// Dummy text options
const dummyTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Creativity is intelligence having fun.",
    "Do what you can, with what you have, where you are."
];

// Create UI for text styling controls
const controlPanel = document.createElement("div");
controlPanel.id = "control-panel";
controlPanel.innerHTML = `
    <label>Font Size:</label> <input type="range" id="font-size-slider" min="10" max="50" step="1" value="16">
    <label>Text Color:</label> <input type="color" id="color-picker" value="#000000">
    <label>Line Height:</label> <input type="range" id="line-height-slider" min="1" max="3" step="0.1" value="1.5">
    <label>Letter Spacing:</label> <input type="range" id="letter-spacing-slider" min="0" max="5" step="0.1" value="0">
`;
document.body.appendChild(controlPanel);

// Prevent selection creation on single click
document.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return; // Ignore right-clicks or middle-clicks

    let clickedElement = document.elementFromPoint(e.clientX, e.clientY);
    if (clickedElement.classList.contains("selection")) {
        currentSelection = clickedElement;
        updateSliders(currentSelection);
        return; // Do not create a new selection if clicking inside an existing one
    }

    startX = e.clientX;
    startY = e.clientY;
    isSelecting = true;

    document.addEventListener("mousemove", detectDrag);
    document.addEventListener("mouseup", cancelIfNotDragged);
});

function detectDrag(e) {
    if (!isSelecting) return;

    let dx = Math.abs(e.clientX - startX);
    let dy = Math.abs(e.clientY - startY);

    if (dx > 5 || dy > 5) {
        createSelection(startX, startY);
        document.removeEventListener("mousemove", detectDrag);
        document.removeEventListener("mouseup", cancelIfNotDragged);
    }
}

function cancelIfNotDragged() {
    isSelecting = false;
    document.removeEventListener("mousemove", detectDrag);
    document.removeEventListener("mouseup", cancelIfNotDragged);
}

function createSelection(x, y) {
    let selection = document.createElement("div");
    selection.classList.add("selection");
    selection.style.left = `${x}px`;
    selection.style.top = `${y}px`;
    selection.style.position = "absolute";
    selection.style.border = "1px solid black";
    selection.style.backgroundColor = "rgba(255,255,255,0)"; // Transparent background
    selection.style.mixBlendMode = "multiply";
    selection.contentEditable = "true"; // Makes text editable
    selection.style.padding = "10px";

    document.body.appendChild(selection);
    selections.push(selection);
    currentSelection = selection;

    document.addEventListener("mousemove", resizeSelection);
    document.addEventListener("mouseup", finalizeSelection);
}

function resizeSelection(e) {
    if (!isSelecting) return;
    let selection = currentSelection;

    let endX = e.clientX;
    let endY = e.clientY;

    selection.style.width = `${Math.abs(endX - startX)}px`;
    selection.style.height = `${Math.abs(endY - startY)}px`;
    selection.style.left = `${Math.min(startX, endX)}px`;
    selection.style.top = `${Math.min(startY, endY)}px`;
}

function finalizeSelection() {
    isSelecting = false;
    let selection = currentSelection;

    if (!selection || selection.offsetWidth < 5 || selection.offsetHeight < 5) {
        selection.remove();
        selections.pop();
        return;
    }

    let randomText = dummyTexts[Math.floor(Math.random() * dummyTexts.length)];
    selection.innerText = randomText;
    selection.style.fontSize = "16px";
    selection.style.display = "flex";
    selection.style.alignItems = "center";
    selection.style.justifyContent = "center";
    selection.style.textAlign = "center";
    selection.style.overflow = "hidden";
    selection.style.padding = "5px";
    selection.style.wordWrap = "break-word";

    document.removeEventListener("mousemove", resizeSelection);
    document.removeEventListener("mouseup", finalizeSelection);
}

// Event Listeners for Style Controls
document.getElementById("font-size-slider").addEventListener("input", function () {
    if (currentSelection) {
        currentSelection.style.fontSize = this.value + "px";
    }
});

document.getElementById("color-picker").addEventListener("input", function () {
    if (currentSelection) {
        currentSelection.style.color = this.value;
    }
});

document.getElementById("line-height-slider").addEventListener("input", function () {
    if (currentSelection) {
        currentSelection.style.lineHeight = this.value;
    }
});

document.getElementById("letter-spacing-slider").addEventListener("input", function () {
    if (currentSelection) {
        currentSelection.style.letterSpacing = this.value + "px";
    }
});

// Update Sliders to Match Current Selection
function updateSliders(selection) {
    document.getElementById("font-size-slider").value = parseInt(window.getComputedStyle(selection).fontSize);
    document.getElementById("color-picker").value = rgbToHex(window.getComputedStyle(selection).color);
    document.getElementById("line-height-slider").value = parseFloat(window.getComputedStyle(selection).lineHeight);
    document.getElementById("letter-spacing-slider").value = parseFloat(window.getComputedStyle(selection).letterSpacing);
}

// Helper Function to Convert RGB to Hex
function rgbToHex(rgb) {
    let values = rgb.match(/\d+/g).map(Number);
    return `#${values.map(v => v.toString(16).padStart(2, '0')).join('')}`;
}