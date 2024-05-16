// TODO
// Test cases must still be created to thouroughly test this deliverable
// Error handling on user prompt must still be implemented
// Formatting for the price must still be implemented
// A switch statement must still be implemented 
// Real data about cost per square foot of paint must be researched
// Feature to choose paint color must be implemented
// Feature to explore cheapest option must be implemented

// NOTES
// dry - don't repeat yourself
// presentation:
// yourself
// what your hired for
// your solution and why it is the best
// have timer for presentation
// use jest to write test cases

const prompt = require('prompt-sync')();

// sums a given array
function sumArr(arr) {
    let sumArr = 0;
    for (i = 0; i < arr.length; i++) {
        sumArr += arr[i];
    }
    return sumArr;
}

// get wall shape (square / rectange / triangle)
function getShape() {
    const shape = prompt("Please provide us with the shape of your wall. Press (1) Square or (2) Rectangle or (3) Triangle: ");
    return shape;
}

// get wall length
function getLength() {
    const length = prompt("Length: ");
    return length;
}

// get wall height
function getHeight() {
    const height = prompt("Height: ");
    return height;
}

// get wall obscructions (door / window)
function getObstructions() {
    // get and store area of obscrutions
    const obscrtArr = [];
    let obscrt;
    do {
        obscrt = prompt("Please provide us any obscructions. Press (1) Door or (2) Window or (3) Sockets or (4) Exit: ")
        if (obscrt != 4) {
            let l = getLength();
            let h = getHeight();
            obscrtArr.push(l*h);
        }
    } while (obscrt != 4);
    // sum obscrution areas
    return sumArr(obscrtArr);
}

// rectangle: (l*w - obscrt) or triange: (0.5*l*w - obscrt)
function calcWallArea(shape, length, height, obscrtSum) {
    if (shape == 1 || shape == 2) return (length*height - obscrtSum);
    else return (0.5*length*height - obscrtSum);
}

function calcRoomArea(wallAreaArr) {
    return sumArr(wallAreaArr);
}

function calcTotalArea(roomAreaArr) {
    return sumArr(roomAreaArr);
}

function getPaintQual() {
    const paintQual = prompt("Press (1) for affordable paint option or (2) for premium paint option: ");
    return paintQual;
}

function getNumWalls() {
    const numWalls = prompt("How many walls are in your room? ");
    return numWalls;
}

function getNumRooms() {
    const numRooms = prompt("How many rooms will you be painting? ");
    return numRooms;
}


function calcPrice(paintQual, totalArea, paintPriceArr) {
    if (paintQual == 1) return totalArea*paintPriceArr[0];
    else return totalArea*paintPriceArr[1];
};

function main() {
    console.log("Greetings! Welcome to the Paint Calculator.");
    const paintQual = getPaintQual();
    const numRooms = getNumRooms();
    const roomAreaArr = [];
    for (i = 0; i < numRooms; i++) {
        const numWalls = getNumWalls();
        let wallAreaArr = [];
        for (j = 0; j < numWalls; j++) {
            let currShape = getShape();
            let currLength = getLength();
            let currHeight = getHeight();
            let currObscrt = getObstructions();
            wallAreaArr.push(calcWallArea(currShape, currLength, currHeight, currObscrt));
        }
        roomAreaArr.push(calcRoomArea(wallAreaArr));
    }
    const totalArea = calcTotalArea(roomAreaArr);
    const paintArr = [1.00, 2.00];
    const totalPrice = calcPrice(paintQual, totalArea, paintArr);

    console.log("Your estimated price: ", totalPrice);
}

main();