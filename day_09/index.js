const fs = require('fs')

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
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}

function partition(items, left, right) {
    var pivot   = items[right - 1], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
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
    const diff = numberToCheck - slice[ptr2];

    while (ptr1 !== ptr2) {
        if (slice[ptr1] + slice[ptr2] == numberToCheck) {
            return findInvalidNumber(arr, ++idx, preamble);
        }
        if (slice[ptr1] > diff) {
            --ptr2
        } else {
            ++ptr1;
        }
    }
    if (ptr1 == ptr2) {
        return numberToCheck
    }
}



fs.readFile("input.txt", "utf-8", function(err,data) {
    let items = data.split(/\r?\n/).map(str => parseInt(str));
    const preamble = 5;


    const invalidNumber = findInvalidNumber(items, 0, preamble);
    console.log('>first invalid number with a preamble of 5', invalidNumber);
})