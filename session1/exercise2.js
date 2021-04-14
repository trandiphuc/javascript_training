//Ex1
function calFactorialNumber(number)
{
    if(number >= 1)
        return (number * calFactorialNumber(number - 1));
    else return 1;
}
//Ex2
function getRandomInt(min, max){
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
//Ex3
function getRandomElementInArray(array)
{
    return array[Math.floor(Math.random() * array.length)];
}
//Ex4
function findMissingElement(arr1, arr2)
{
    var result = [];
    arr1.forEach(element => {
        if(arr2.indexOf(element) === -1) result.push(element);
    });
    return result;
}
