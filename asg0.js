// DrawRectangle.js
let canvas, ctx;

function main() {
    // Retrieve <canvas> element <- (1)
    canvas = document.getElementById('example');
    if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return;
    }

    // Get the rendering context for 2DCG <- (2)
    ctx = canvas.getContext('2d');
    // Instantiate canvas
    clearCanvas();

    // Instantiate Vector3 objects with z=0
    const v1 = new Vector3([0, 5, 0]);
    const v2 = new Vector3([5, 0, 0]);

    // Draw vectors
    drawVector(v1, 'red');
    drawVector(v2, 'blue');

    // Button event listener
    document.getElementById('vDraw').addEventListener('click', handleVecEvent);
    document.getElementById('oDraw').addEventListener('click', handleOpEvent);
}

function clearCanvas() {
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a black color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color
}

function drawVector(v, color) {
    // Scale vector values by 20
    const xScale = v.elements[0] * 20;
    const yScale = v.elements[1] * 20;

    // Center coords
    const xCenter = canvas.width / 2;
    const yCenter = canvas.height / 2;

    // Draw the vector
    ctx.beginPath();
    ctx.moveTo(xCenter, yCenter);
    ctx.lineTo(xCenter + xScale, yCenter - yScale);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
}

function handleVecEvent() {
    // Clear canvas
    clearCanvas();

    // Read input values
    const x1 = parseFloat(document.getElementById('X1').value);
    const y1 = parseFloat(document.getElementById('Y1').value);

    const x2 = parseFloat(document.getElementById('X2').value);
    const y2 = parseFloat(document.getElementById('Y2').value);

    // Create and draw vectors
    const v1 = new Vector3([x1, y1, 0]);
    const v2 = new Vector3([x2, y2, 0]);
    drawVector(v1, 'red');
    drawVector(v2, 'blue');
    return [v1, v2];
}

function handleOpEvent() {
    // Reinstantiate canvas and base vectors
    const vecs = handleVecEvent();

    // Instantiate v3 and v4 as v1 and v2
    var v3 = new Vector3(vecs[0].elements);
    var v4 = new Vector3(vecs[1].elements);

    // Get operation and scalar
    const operate = document.getElementById('operate').value;
    const scale = document.getElementById('scale').value;

    // Perform operation
    switch(operate) {
        case 'add':
            v3 = v3.add(v4);
            drawVector(v3, 'green');
            break;

        case 'sub':
            v3 = v3.sub(v4);
            drawVector(v3, 'green');
            break;
        
        case 'mul':
            v3 = v3.mul(scale);
            v4 = v4.mul(scale);
            drawVector(v3, 'green');
            drawVector(v4, 'green');
            break;

        case 'div':
            if (scale !== 0) {
                v3 = v3.div(scale);
                v4 = v4.div(scale);
                drawVector(v3, 'green');
                drawVector(v4, 'green');
            }
            break;

        case 'mag':
            console.log("Magnitude of v1:", v3.magnitude());
            console.log("Magnitude of v2:", v4.magnitude());
            break;

        case 'norm':
            v3.normalize();
            v4.normalize();
            drawVector(v3, 'green');
            drawVector(v4, 'green');
            break;
        
        case 'ang':
            const angle = angleBetween(v3, v4);
            console.log(`Angle: ${angle} degrees`);
            break;

        case 'area':
            const area = areaTriangle(v3, v4);
            console.log('Area:', area);
    }
}

function angleBetween(v1, v2) {
    const dotProd = Vector3.dot(v1, v2);
    const mag1 = v1.magnitude();
    const mag2 = v2.magnitude();

    // No angle if magnitude = 0
    if (mag1 === 0 || mag2 === 0) {
        return 0;
    }

    // cos(alpha) = (v1 * v2() / (||v1|| * ||v2||)
    const cosAlpha = dotProd / (mag1 * mag2);

    // convert alpha to degrees
    const angRad = Math.acos(cosAlpha);
    const angDeg = angRad * 180 / Math.PI;

    return angDeg;
}

function areaTriangle(v1, v2) {
    const crossProd = Vector3.cross(v1, v2);

    // ||v1 x v2|| area of parallelogram, / 2 area of triangle
    const areaPara = crossProd.magnitude();
    const areaTri = areaPara / 2;

    return areaTri;
}