export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
  }
  
  function quickSortHelper(array, startIdx, endIdx, animations) {
    if (startIdx >= endIdx) return;
  
    const pivotIdx = partition(array, startIdx, endIdx, animations);
    quickSortHelper(array, startIdx, pivotIdx - 1, animations);
    quickSortHelper(array, pivotIdx + 1, endIdx, animations);
  }
  
  function partition(array, startIdx, endIdx, animations) {
    const pivotValue = array[endIdx];
    let pivotIdx = startIdx;
  
    for (let i = startIdx; i < endIdx; i++) {
      animations.push(["compare", i, endIdx]);
      animations.push(["uncompare", i, endIdx]);
  
      if (array[i] < pivotValue) {
        animations.push(["swap", i, pivotIdx]);
        [array[i], array[pivotIdx]] = [array[pivotIdx], array[i]];
        pivotIdx++;
      }
    }
  
    animations.push(["swap", pivotIdx, endIdx]);
    [array[pivotIdx], array[endIdx]] = [array[endIdx], array[pivotIdx]];
  
    return pivotIdx;
  }
  