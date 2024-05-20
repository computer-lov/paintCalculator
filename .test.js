const { calcWallArea, sumArr, calcRoomArea, formatPrice } = require('./paintCalculator');
const math = require('mathjs');


// test cases for calcWallArea function
test('calcWallArea for rectangle', () => {
    expect(calcWallArea(1, 10, 20, 0, 0)).toBe(200);
    expect(calcWallArea(1, 10, 20, 0, 50)).toBe(150);
});

test('calcWallArea for triangle', () => {
    expect(calcWallArea(2, 10, 20, 0, 0)).toBe(100);
    expect(calcWallArea(2, 10, 20, 0, 50)).toBe(50);
});

test('calcWallArea for circle', () => {
    expect(calcWallArea(3, 0, 0, 10, 0)).toBeCloseTo(math.pi * 100);
    expect(calcWallArea(3, 0, 0, 10, 50)).toBeCloseTo(math.pi * 100 - 50);
});

// test cases for sumArr function
test('testing sumArr function', () => {
    expect(sumArr([100.45, 23, 6.65, 4])).toBe(134.10);
});

// test cases for calcRoomArea function
test('calcRoomArea for multiple wall areas', () => {
    expect(calcRoomArea([100, 200, 300])).toBe(600);
    expect(calcRoomArea([50, 50, 50, 50])).toBe(200);
});

// test cases for formatPrice function
test('testing formatPrice function', () => {
    expect(formatPrice(19.99)).toBe('$19.99');
    expect(formatPrice(456.789)).toBe('$456.79');
});