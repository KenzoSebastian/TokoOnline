const { randomNumber } = require("./randomNumber");

const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = randomNumber(0, i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

const arrayModifier = (arr, length) => {
    const arrAcak = shuffleArray(arr);
    const sliceArray = arrAcak.slice(0, length);
    const filterProducts = sliceArray.filter(product => typeof product !== "undefined");
    return filterProducts;
};

module.exports = { shuffleArray, arrayModifier };