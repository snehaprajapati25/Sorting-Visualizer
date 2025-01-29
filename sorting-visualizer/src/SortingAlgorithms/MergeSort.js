export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxilaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxilaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(mainArray, startIdx, endIdx, auxilaryArray, animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
  
    mergeSortHelper(auxilaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxilaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxilaryArray, animations);
  }
  
  function doMerge(mainArray, startIdx, middleIdx, endIdx, auxilaryArray, animations) {
    let i = startIdx; // Left half pointer
    let j = middleIdx + 1; // Right half pointer
    let k = startIdx; // Main array pointer
  
    while (i <= middleIdx && j <= endIdx) {
      animations.push(["compare", i, j]); // Comparison
      animations.push(["compare", i, j]); // Revert color
  
      if (auxilaryArray[i] <= auxilaryArray[j]) {
        animations.push(["swap", k, auxilaryArray[i]]);
        mainArray[k++] = auxilaryArray[i++];
      } else {
        animations.push(["swap", k, auxilaryArray[j]]);
        mainArray[k++] = auxilaryArray[j++];
      }
    }
  
    while (i <= middleIdx) {
      animations.push(["compare", i, i]); // Comparison
      animations.push(["compare", i, i]); // Revert color
      animations.push(["swap", k, auxilaryArray[i]]);
      mainArray[k++] = auxilaryArray[i++];
    }
  
    while (j <= endIdx) {
      animations.push(["compare", j, j]); // Comparison
      animations.push(["compare", j, j]); // Revert color
      animations.push(["swap", k, auxilaryArray[j]]);
      mainArray[k++] = auxilaryArray[j++];
    }
  }

 