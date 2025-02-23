// script.js
document.addEventListener('DOMContentLoaded', () => {
    const shapeContainer = document.getElementById('shape-container');
    const loading = document.getElementById('loading');
    const colors = ['yellow', 'red', 'blue', 'orange', 'green', 'black', 'white'];
    const shapes = ['triangle', 'rectangle', 'square', 'circle', 'line', 'prismatic', 'sector'];

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function createShape() {
        const shapeType = shapes[getRandomInt(0, shapes.length - 1)];
        const color = colors[getRandomInt(0, colors.length - 1)];
        const size = getRandomInt(30, 300);

        const shape = document.createElement('div');
        shape.classList.add('shape', shapeType);
        shape.style.backgroundColor = color;
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;

        // Additional styling based on shape type
        switch (shapeType) {
            case 'triangle':
                shape.style.width = '0';
                shape.style.height = '0';
                shape.style.borderLeft = `${size / 2}px solid transparent`;
                shape.style.borderRight = `${size / 2}px solid transparent`;
                shape.style.borderBottom = `${size}px solid ${color}`;
                shape.style.backgroundColor = 'transparent';
                break;
            case 'circle':
                shape.style.borderRadius = '50%';
                break;
            case 'line':
                shape.style.height = '5px';
                break;
            // Add cases for 'prismatic' and 'sector' as needed
        }

        shapeContainer.appendChild(shape);
    }

    function loadShapes() {
        loading.style.display = 'block';
        setTimeout(() => {
            for (let i = 0; i < 10; i++) {
                createShape();
            }
            loading.style.display = 'none';
        }, 500);
    }

    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            loadShapes();
        }
    });

    // Initial load
    loadShapes();
});