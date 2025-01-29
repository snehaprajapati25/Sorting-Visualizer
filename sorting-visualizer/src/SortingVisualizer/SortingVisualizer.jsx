import React from "react";
import { getMergeSortAnimations } from "../SortingAlgorithms/MergeSort.js";
import { getQuickSortAnimations } from "../SortingAlgorithms/QuickSort.js";
import { getHeapSortAnimations } from "../SortingAlgorithms/HeapSort.js";
import { getBubbleSortAnimations } from "../SortingAlgorithms/BubbleSort.js";
import "./SortingVisualizer.css";

const ANIMATION_SPEED_MS = 10; // Speed of the animation in milliseconds
const PRIMARY_COLOR = "pink"; // Default bar color
const SECONDARY_COLOR = "red"; // Color during comparisons

export class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            animationSpeed: 50,
            isSorting: false,
            activeSortingFunction: null, // Tracks the active sorting function
        };
    }


    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 300; i++) {
            array.push(randomIntFromInterval(5, 730));
        }
        this.setState({ array, isSorting:false });
        // After resetting the array, change all bar colors to pink
        const arrayBars = document.getElementsByClassName("array-bar");
        if (arrayBars.length > 0) {
            for (let i = 0; i < arrayBars.length; i++) {
                arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
            }
        }
    }

    runSortingAlgorithm(algorithmName, sortingFunction) {
        if (!this.validateArray()) return;
        this.setState({ isSorting: true, activeSortingFunction: algorithmName }, () => {
            sortingFunction();
        });
    }

    handleSpeedChange = (event) => {
        const newSpeed = parseInt(event.target.value, 10);
        this.setState({ animationSpeed: newSpeed });
    };




    mergeSort() {
        this.runSortingAlgorithm("mergeSort", () => {
            const animations = getMergeSortAnimations(this.state.array);
            const arrayBars = document.getElementsByClassName("array-bar");
    
            let animationIndex = 0;
    
            const animateStep = () => {
                if (animationIndex >= animations.length) {
                    this.highlightSortedBars();
                    this.setState({ isSorting: false, activeSortingFunction: null });
                    return;
                }
    
                const [type, barOneIdx, barTwoIdxOrHeight] = animations[animationIndex];
    
                if (type === "compare") {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdxOrHeight].style;
                    const color = animationIndex % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                } else if (type === "swap") {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${barTwoIdxOrHeight}px`;
                }
    
                animationIndex++;
                
                // Use setTimeout to dynamically adjust to speed changes
                setTimeout(animateStep, this.state.animationSpeed);
            };
    
            animateStep();
        });
    }
    
    

    quickSort() {
        this.runSortingAlgorithm("quickSort", () => {
            const animations = getQuickSortAnimations(this.state.array);
            const arrayBars = document.getElementsByClassName("array-bar");

            let animationIndex = 0;

            const animateStep = () => {
                if (animationIndex >= animations.length) {
                    this.highlightSortedBars();
                    this.setState({ isSorting: false, activeSortingFunction: null });
                    return;
                }

                const [type, barOneIdx, barTwoIdxOrHeight] = animations[animationIndex];

                if (type === "compare" || type === "uncompare") {
                    const color = type === "compare" ? SECONDARY_COLOR : PRIMARY_COLOR;
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdxOrHeight].style;
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                } else if (type === "swap") {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdxOrHeight].style;
                    const tempHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = tempHeight;
                }

                animationIndex++;
                setTimeout(animateStep, this.state.animationSpeed);
            };

            animateStep();
        });
    }

    heapSort() {
        this.runSortingAlgorithm("heapSort", () => {
            const animations = getHeapSortAnimations(this.state.array);
            const arrayBars = document.getElementsByClassName("array-bar");

            let animationIndex = 0;

            const animateStep = () => {
                if (animationIndex >= animations.length) {
                    this.highlightSortedBars();
                    this.setState({ isSorting: false, activeSortingFunction: null });
                    return;
                }

                const [type, barOneIdx, barTwoIdxOrHeight] = animations[animationIndex];

                if (type === "compare") {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdxOrHeight].style;
                    const color = animationIndex % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                } else if (type === "swap") {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdxOrHeight].style;
                    const tempHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = tempHeight;
                }

                animationIndex++;
                setTimeout(animateStep, this.state.animationSpeed);
            };

            animateStep();
        });
    }
    

    bubbleSort() {
        this.runSortingAlgorithm("bubbleSort", () => {
            const animations = getBubbleSortAnimations(this.state.array);
            const arrayBars = document.getElementsByClassName("array-bar");

            let animationIndex = 0;

            const animateStep = () => {
                if (animationIndex >= animations.length) {
                    this.highlightSortedBars();
                    this.setState({ isSorting: false, activeSortingFunction: null });
                    return;
                }

                const [type, barOneIdx, barTwoIdx] = animations[animationIndex];

                if (type === "compare" || type === "uncompare") {
                    const color = type === "compare" ? SECONDARY_COLOR : PRIMARY_COLOR;
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                } else if (type === "swap") {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const tempHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = tempHeight;
                }

                animationIndex++;
                setTimeout(animateStep, this.state.animationSpeed);
            };

            animateStep();
        });
    }
    

    updateArraySize(size) {
        const array = [];
        for (let i = 0; i < size; i++) {
            array.push(randomIntFromInterval(5, 730));
        }
        this.setState({ array, isSorting: false });
    }

    highlightSortedBars() {
        const arrayBars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < arrayBars.length; i++) {
            setTimeout(() => {
                arrayBars[i].style.backgroundColor = "purple";
            }, i * 5);
        }
    }

    validateArray() {
        const { array } = this.state;
        if (!array || array.length === 0) {
            alert("The array is empty! Please generate a new array before sorting.");
            return false;
        }
        return true;
    }



    render() {
        const { array, activeSortingFunction, isSorting } = this.state;
        const barWidth = Math.floor(800 / array.length);

        return (
            <div className="controls-container">
                <div className="elements">
                    <button onClick={() => this.resetArray()}  disabled={this.state.isSorting}>Generate New Array</button>
                    <button onClick={() => this.mergeSort()} disabled={this.state.isSorting && activeSortingFunction !== "mergeSort"}>Merge Sort</button>
                    <button onClick={() => this.quickSort()} disabled={this.state.isSorting && activeSortingFunction !== "quickSort"}>Quick Sort</button>
                    <button onClick={() => this.heapSort()} disabled={this.state.isSorting && activeSortingFunction !== "heapSort"}>Heap Sort</button>
                    <button onClick={() => this.bubbleSort()} disabled={this.state.isSorting && activeSortingFunction !== "bubbleSort"}>Bubble Sort</button>

                    <label>
                        Array Size
                        <input
                            type="range"
                            min="10"
                            max="300"
                            value={this.state.array.length}
                            onChange={(e) => this.updateArraySize(e.target.value)}
                            disabled={isSorting} // Disable during sorting
                            className="size-slider"
                        />
                    </label>

                    <label>
                        Speed
                        <input
                            type="range"
                            min="10"
                            max="200"
                            value={this.state.animationSpeed}
                            onChange={this.handleSpeedChange}
                            disabled={this.state.isSorting} // Disable during sorting
                            className="speed-slider"
                        />
                    </label>
                    {/* <span>{this.state.animationSpeed} </span> */}

                </div>

                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{
                                backgroundColor: PRIMARY_COLOR,
                                height: `${value}px`,
                                // Dynamically set the width
                                width:`${barWidth}px`,
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}