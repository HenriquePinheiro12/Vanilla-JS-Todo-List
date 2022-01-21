// Find most frequent item in an array
const mostFrequent = arr => {
    const obj = arr.reduce((acc, val) => {
        if(val in acc)
            acc[val]++
        else   
            acc[val] = 1
        return acc
    }, {})
    let higher = -Infinity;
    const targetKey = 
    Object.keys(obj).reduce((acc, val) => {
        if(obj[val] > higher){
            higher = obj[val]
            return val
        } else return acc
        
    }, 0);
    return `${targetKey} (${obj[targetKey]} times)`
}

const array1 = [54, 56, 56]
const array2 = ['a', 12, true, 'hello', false, 'hello']
const array3 = [true, true, [54], 'MyLove', 'MyLove', 'Ana', 'MyLove']

console.log(mostFrequent(array1))
console.log(mostFrequent(array2))
console.log(mostFrequent(array3))