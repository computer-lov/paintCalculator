// paint calculator 

const prompt = require('prompt-sync')();
const math = require('mathjs');

// values inspired by prices found on benjaminmoore.com
const paints = {
    white1: '56.99',
    white2: '81.99',
    black1: '54.99',
    black2: '79.99',
    red1: '59.99',
    red2: '84.99',
    yellow1: '50.99',
    yellow2: '75.99',
    orange1: '49.99',
    orange2:'74.99',
    green1: '52.99',
    green2: '77.99',
    blue1: '51.99',
    blue2: '77.99',
    violet1: '54.99',
    violet2: '79.99'
};

 // formats price to $*,***.** format using Intl.NumberFormat object
 function formatPrice(price) {
    return Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price);
}

// sums a given array
function sumArr(arr) {
    let sumArr = 0;
    for (let i = 0; i < arr.length; i++) {
        sumArr += arr[i];
    }
    return sumArr;
}

// prints invalid message
function invalidMessage() {
    console.log("Invalid input. Please try again.\n");
}

// get wall shape (square / rectange / triangle)
function getShape() {
    let shape;
    let isValid = false;
    while (!isValid) {
        shape = parseInt(prompt("Please provide us with the shape of your wall. Press (1) Rectangle (2) Triangle (3) Circle: "));
        if (shape == 1 || shape == 2 || shape == 3) isValid = true;
        else invalidMessage();
    }
    return shape;
}

// get wall measurement
function getMeasurement(promptText) {
    let measurement;
    let isValid = false;
    while (!isValid) {
        measurement = parseInt(prompt(promptText));
        if (isNaN(measurement)) invalidMessage();
        else isValid = true;
    }
    return measurement;
}

// get wall obscructions (door / window / sockets)
function getObstructions() {
    // get and store area of obscrutions
    let obscrtArr = [];
    let obscrt;
    let isValid = false;
    while (!isValid) {
        obscrt = parseInt(prompt("Please provide us any obscructions. Press (1) Door (2) Window (3) Sockets (4) Exit: "));
        if (obscrt >= 1 && obscrt <= 3) {
            let l = getMeasurement("Length (ft): ");
            let h = getMeasurement("Height (ft): ");
            obscrtArr.push(l*h);
        } else if (obscrt == 4) {
            isValid = true;
        } else {
            invalidMessage();
        }
    }
    // sum obscrution areas
    return sumArr(obscrtArr);
}

// rectangle: (l*w - obscrt) or triange or (0.5*l*w - obscrt) or circle (pi * r^2)
function calcWallArea(shape, length, height, radius, obscrtSum) {
    let wallArea = 0;
    switch(shape) {
        case 1: // rectangle
            wallArea = math.multiply(length, height) - obscrtSum;
            break;
        case 2: // triangle
            wallArea = math.multiply(0.5, length, height) - obscrtSum;
            break;
        case 3: // circle
            wallArea = math.multiply(math.pi, math.square(radius)) - obscrtSum;
            break;
        default:
            console.log("Error. Invalid shape. ")
            break;
    }
    return wallArea;
}

// calculates total area for a given room
function calcRoomArea(wallAreaArr) {
    return sumArr(wallAreaArr);
}

// gets paint color from user
function getPaintColor() {
    let paintNumber;
    let paintColor;
    let isValid = false;
    while (!isValid) {
        paintNumber = parseInt(prompt("Press (1) white paint (2) black paint (3) red paint (4) yellow paint (5) orange paint (6) green paint (7) blue paint (8) violet paint: "));

        switch (paintNumber) {
            case 1:
                paintColor = 'white';
                isValid = true;
                break;
            case 2:
                paintColor = 'black';
                isValid = true;
                break;
            case 3:
                paintColor = 'red';
                isValid = true;
                break;
            case 4:
                paintColor = 'yellow';
                isValid = true;
                break;
            case 5:
                paintColor = 'orange';
                isValid = true;
                break;
            case 6:
                paintColor = 'green';
                isValid = true;
                break;
            case 7:
                paintColor = 'blue';
                isValid = true;
                break;
            case 8: 
                paintColor = 'violet';
                isValid = true;
                break;
            default:
                invalidMessage();
                isValid = false;
                break;
        }
    }
    return paintColor
}

// gets the paint quality from the user
function getPaintQual() {
    let paintQual;
    let isValid = false;
    while (!isValid) {
        paintQual = parseInt(prompt("Press (1) for affordable paint option or (2) for premium paint option: "));
        if (paintQual == 1 || paintQual == 2) isValid = true;
        else invalidMessage();
    }
    return paintQual;
}

// gets the number of wall for each room from the user
function getNumWalls() {
    let numWalls;
    let isValid = false;
    while (!isValid) {
        numWalls = parseInt(prompt("How many walls are you painting in your room (1-6)? "));
        if (numWalls >= 1 && numWalls <= 6) isValid = true;
        else invalidMessage();
    }
    return numWalls;
}

// gets the number of rooms from the user
function getNumRooms() {
    let numRooms;
    let isValid = false;
    while (!isValid) {
        numRooms = parseInt(prompt("How many rooms will you be painting (1-10)? "));
        if (numRooms >= 1 && numRooms <= 10) isValid = true;
        else invalidMessage();
    }
    return numRooms;
}

// calculates price of current room being entered by user
function calcRoomPrice(paintQual, paintColor, roomArea) {
    let paintKey = paintColor + paintQual.toString();
    let paintPrice = parseFloat(paints[paintKey]);
    if (isNaN(paintPrice)) {
        console.log("Error: Invalid paint price for key " + paintKey);
        return 0;
    }
    return paintPrice*roomArea/400;
}

function main() {
    // main program
    console.log("Greetings! Welcome to the Paint Calculator.");
    let numRooms = getNumRooms();
    let roomPriceArr = [];
    let roomAreaArr = [];
    for (let i = 0; i < numRooms; i++) {
        console.log("Room " + (i+1).toString());
        let paintQual = getPaintQual();
        let paintColor = getPaintColor();
        let numWalls = getNumWalls();
        let wallAreaArr = [];
        for (let j = 0; j < numWalls; j++) {
            console.log("Wall " + (j+1).toString());
            let currShape = getShape();
            let currLength = 0;
            let currHeight = 0;
            let currRadius = 0;
            if (currShape == 3) { // circle
                currRadius = getMeasurement("Radius (ft): ");
            }
            else { // rectangle or triangle
                currLength = getMeasurement("Length (ft): ");
                currHeight = getMeasurement("Height (ft): ");
            }
            let currObscrt = getObstructions();
            wallAreaArr.push(calcWallArea(currShape, currLength, currHeight, currRadius, currObscrt));
        }
        let roomArea = calcRoomArea(wallAreaArr)
        roomAreaArr.push(roomArea);
        let roomPrice = calcRoomPrice(paintQual, paintColor, roomArea);
        roomPriceArr.push(roomPrice);
    }
    let totalPrice = sumArr(roomPriceArr);
    let totalArea = sumArr(roomAreaArr);
    
    // display price
    console.log("Total Area: " + totalArea.toFixed(2) + " sq ft");
    console.log("Your estimated price: ", formatPrice(totalPrice));
}

main();