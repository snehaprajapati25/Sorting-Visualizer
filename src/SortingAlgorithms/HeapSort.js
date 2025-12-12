export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    heapSortHelper(array, animations);
    return animations;
  }  

  function heapify(array, n, i, animations) {
    let largest = i; // Initialize largest as root
    const left = 2 * i + 1; // Left child index
    const right = 2 * i + 2; // Right child index

    // Compare root with left child
    if (left < n) {
        animations.push(["compare", i, left]); // Push comparison animation
        if (array[left] > array[largest]) {
            largest = left;
        }
    }

    // Compare largest so far with right child
    if (right < n) {
        animations.push(["compare", largest, right]); // Push comparison animation
        if (array[right] > array[largest]) {
            largest = right;
        }
    }

    // If largest is not root, swap and recursively heapify
    if (largest !== i) {
        animations.push(["swap", i, largest]); // Push swap animation
        [array[i], array[largest]] = [array[largest], array[i]];
        heapify(array, n, largest, animations); // Recursively heapify
    }
}


  function heapSortHelper(array, animations) {
    const n = array.length;
  
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(array, n, i, animations);
    }
  
    // Extract elements one by one from the heap
    for (let i = n - 1; i > 0; i--) {
      // Swap the root(max) element with the last element
      animations.push(["swap", 0, i]);
      [array[0], array[i]] = [array[i], array[0]];
  
      // Heapify the root element again
      heapify(array, i, 0, animations);
    }
  }
  