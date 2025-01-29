export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;

    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Push "compare" animation
            animations.push(["compare", j, j + 1]);
            
            if (array[j] > array[j + 1]) {
                // Push "swap" animation
                animations.push(["swap", j, j + 1]);
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
            // Push "uncompare" animation
            animations.push(["uncompare", j, j + 1]);
        }
    }
    return animations;
}
