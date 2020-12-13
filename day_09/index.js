const fs = require('fs');
const { compileFunction } = require('vm');

/**  Challenge  **/
// XMAS starts by transmitting a preamble of 25 numbers. 
// After that, each number you receive should be the sum of any two of the 25 immediately previous numbers. 
// The two numbers will have different values, and there might be more than one such pair.

// The first step of attacking the weakness in the XMAS data is to find the first number in the list 
// (after the preamble) which is not the sum of two of the 25 numbers before it. 
// What is the first number that does not have this property?

/*
Psuedocode
    Traverse the array check for invalid values
    Invalid values are when the previous x numbers do not add up to the target


    Begin checking for invalid values after the preamble.
    slice the array at x
    do a quick sort on the slice 
    initialize two poitners . ptr at first element, ptr2 at last index of the slice

        ptr1 = slice[0]
        ptr2 = slice[n-1]

    whille (ptr !== ptr2) {
        diff = target - ptr2
        if (ptr == ptr2) return invalid
        if (ptr1 + ptr == target) return valid
        if (ptr1 > diff)
            --ptr2
        if (ptr1 < diff) increment poiutner1
        
    }         
        
        
*/

function swap(items, leftIndex, rightIndex){
    const temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}

function partition(items, left, right) {
    const pivot   = items[right - 1]
    let i = left; //left pointer
    let j = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j); //swap two elements
            i++;
            j--;
        }
    }
    return i;
}
/*
* 1. pivot selection - pick last elemnt
* 2. partition - split an array into three subarrays (left is less than pivot, center is equal to pivot, right are elements greater than pivot)
* 3. recurse - apply the above with left and right
*/
function quickSort(items, left, right) {
    if (items.length < 1) return items;
    const index = partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(items, index, right);
        }
    return items;
}

 
function findInvalidNumber(arr = [], idx = 0, preamble) {
    if (arr.length <= 1) return;
    const slice = quickSort(arr.slice(idx, idx + preamble), 0, preamble - 1)
    let ptr1 = 0;
    let ptr2 = slice.length - 1;
    
    const numberToCheck = arr[idx + preamble];

    while (ptr1 !== ptr2) {
        const diff = numberToCheck - slice[ptr2];
        if (slice[ptr1] + slice[ptr2] == numberToCheck) {
            return findInvalidNumber(arr, ++idx, preamble);
        }
        if (slice[ptr1] > diff) {
            --ptr2
        } else if (slice[ptr1] < diff) {
            ++ptr1;
        }
    }
    if (ptr1 == ptr2) {
        return numberToCheck
    }
}

// sliding window brute force. 
// Expand the window while the sum of the subarray is less than the target
// Shrink the window while the sum of the subarray is greater than the target
// return if the tempsum equals to the target sum
function contiguousArray(arr = [], target) {
    for(let i = 0; i < arr.length; ++i) {
        let tempSum = 0;
        for(let j = 0; j < arr.length; ++j) {
            tempSum += arr[i + j]
            if (tempSum > target) {
                break;
            }
            if (tempSum == target) {
                return arr.slice(i - 1, i + j)
            }

        }
    }
}





fs.readFile("input.txt", "utf-8", function(err,data) {
    let items = data.split(/\r?\n/).map(str => parseInt(str));
    const preamble = 5;

    const invalidNumber = findInvalidNumber(items, 0, preamble);
    console.log('>first invalid number with a preamble of 5', invalidNumber);
})


fs.readFile("input2.txt", "utf-8", function(err,data) {
    let items = data.split(/\r?\n/).map(str => parseInt(str));
    const preamble = 25;

    const invalidNumber = findInvalidNumber(items, 0, preamble);
    const indexOfInvalid = items.indexOf(invalidNumber)
    console.log('>first invalid nubmer with a preamble of 25. 9.1:', invalidNumber)
    console.log('%cindexOfInvalid', 'color:pink', indexOfInvalid);
})

/**** Part2: Find the contiguous array that adds up to the value provided in part1. Return the sum of the smallest and largest value ******/
const lookForTarget = 10884537;
fs.readFile("input2.txt", "utf-8", function(err,data) {
    let items = data.split(/\r?\n/).map(str => parseInt(str));
    const res = contiguousArray(items, lookForTarget )
    console.log('contiguous arr:', quickSort(res, 0, res.length -1))
    console.log('sum:', res[0] + res[res.length -1])

})


