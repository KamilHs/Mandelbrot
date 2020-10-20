const canvas = document.querySelector('#canvas');

let ctx = canvas.getContext('2d');

canvas.width = window.innerHeight
canvas.height = window.innerHeight


const inputs = document.querySelectorAll('input');

let min = inputs[0].getAttribute('value') / 1;
let max = inputs[1].getAttribute('value') / 1;

let maxIterations = 100;

let imageData = ctx.createImageData(canvas.width, canvas.height);

function draw(min, max) {
    for (let i = 0; i < imageData.data.length; i += 4) {
        let x = i / 4 % canvas.width;
        let y = (i / 4 - x) / canvas.height


        let count = 0;

        let a = map(x, 0, canvas.width, min, max);
        let b = map(y, 0, canvas.height, min, max);

        let ca = a;
        let cb = b;

        while (count < maxIterations) {
            let aa = a * a - b * b;
            let bb = 2 * a * b;

            a = aa + ca;
            b = bb + cb;
            if (Math.abs(a + b) > 4) {
                break;
            }

            count++;
        }

        imageData.data[i] = (count * 30 % 256);
        imageData.data[i + 1] = count % 256;
        imageData.data[i + 2] = count % 256;
        imageData.data[i + 3] = 255;

    }

    ctx.putImageData(imageData, 0, 0);
}

function map(initial, inMin, inMax, outMin, outMax) {
    return outMin + (initial - inMin) * (outMax - outMin) / (inMax - inMin);
}



document.querySelectorAll('input').forEach((element, index) => element.addEventListener('input', function (e) {
    if (index == 0) {
        min = e.target.value / 1;
    }
    else {
        max = e.target.value / 1;
    }

    draw(min, max);
}))

draw(min, max);