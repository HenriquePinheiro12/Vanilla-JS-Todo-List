const removeDuplicate = arr =>{
    arr.forEach((val, index) => {
        arr.splice(index, 1)
        // removes the item and, if there is still any equals, removes it; if not gives back the item
        if(arr.includes(val))   
            removeItems(arr, val)
        else
            arr.splice(index, 0, val)
    })    
    return arr
}

const removeItems = (array, value) => {
    const index = array.indexOf(value)
    array.splice(index, 1)
    if(array.includes(value))
        removeItems(array, value)
}

const array1 = [5, 12, 6, 6, 5]
const array2 = ['Henrique', false, 'henrique', 6, false]
const array3 = [5, 'Ana', 6, 'She', 'Hello']



console.log(removeDuplicate(array1))
console.log(removeDuplicate(array2))
console.log(removeDuplicate(array3))